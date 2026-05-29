import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LimitCalculatorService } from './limit-calculator.service';
import lineIdLabelsJson from './line-id-labels.json';
const LINE_ID_LABELS: Record<string, string> = lineIdLabelsJson;

const SESSION_KEY = 'lc_users';

const SEED_SESSION: any[] = [
  { applicationId: 'APP001', customerId: 'BUS001', customerName: 'BillionBrain Garage Ventures' },
  { applicationId: 'APP001', customerId: 'CUS001', customerName: 'Devon Yamashita' },
  { applicationId: 'APP001', customerId: 'CUS002', customerName: 'Alex Johnson' },
  { applicationId: 'APP001', customerId: 'CUS003', customerName: 'Maria Garcia' },
];

// ── Section configs — tabId matches applicationScreenTabId from API ──
const PRIMARY_SECTIONS: any[] = [
  { heading: 'Total Debt to Sales',            tabId: 'TDS', resultLineId: 'TDSC14' },
  { heading: 'Revolving Credit as % of Sales', tabId: 'RCS', resultLineId: 'RCSC24' },
  { heading: 'Balance to Payment Ratio',       tabId: 'BTP', resultLineId: 'BTPC35' },
];

const OWNER_SECTIONS: any[] = [
  { heading: 'Stated DTI (Unsecured)', tabId: 'SDU', resultLineId: 'DRSJ11' },
  { heading: 'Bureau DTI (Modeled)',   tabId: 'MBD', resultLineId: 'DRSJ20' },
  { heading: 'Stated DTI (Secured)',   tabId: 'SDI', resultLineId: 'DRSJ31' },
];

const PRIMARY_FALLBACK: any[] = [];
const OWNER_FALLBACK:   any[] = [];

@Component({
  selector: 'app-limit-calculator',
  imports: [CommonModule, FormsModule],
  templateUrl: './limit-calculator.html',
  styleUrl: './limit-calculator.scss',
})
export class LimitCalculator implements OnInit {
  private svc = inject(LimitCalculatorService);

  activeTab: any = 'primary';

  primaryUser: any = null;
  owners: any[] = [];
  selectedOwner: any = null;

  primarySectionRows: { heading: string; result: { label: string; calculatedAmt: any } | null; rows: { label: string; calculatedAmt: any }[] }[] = [];
  ownerSectionRows:   { heading: string; result: { label: string; calculatedAmt: any } | null; rows: { label: string; calculatedAmt: any }[] }[] = [];
  hasOwnerData = false;

  private primaryResults: any[] = [];
  private ownerResults:   any[] = [];

  ngOnInit(): void {
    let users: any[] = SEED_SESSION;
    try {
      const stored = sessionStorage.getItem(SESSION_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // re-seed if stored data is not the expected flat array with customerId field
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].customerId) {
          users = parsed;
        } else {
          sessionStorage.setItem(SESSION_KEY, JSON.stringify(SEED_SESSION));
        }
      } else {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(SEED_SESSION));
      }
    } catch (e) {
      // sessionStorage unavailable — use SEED_SESSION already assigned above
    }

    this.primaryUser   = users[0];
    this.owners        = users.slice(1);
    this.selectedOwner = this.owners[0] ?? null;

    this.loadPrimaryData(this.primaryUser.applicationId, this.primaryUser.customerId);
  }

  onOwnerChange(customerId: any): void {
    const owner = this.owners.find((o: any) => o.customerId === customerId) ?? null;
    this.selectedOwner = owner;
    if (owner) this.loadOwnerData(owner.applicationId, owner.customerId);
  }

  setTab(tab: any): void {
    this.activeTab = tab;
    if (tab === 'owners' && !this.hasOwnerData && this.selectedOwner) {
      this.loadOwnerData(this.selectedOwner.applicationId, this.selectedOwner.customerId);
    }
  }

  private formatValue(raw: any): string {
    const n = Number(raw);
    return (!isNaN(n) && raw !== '' && raw !== null) ? n.toFixed(2) : String(raw);
  }

  private buildSectionRows(
    results: any[],
    sections: any[],
  ): { heading: string; result: { label: string; calculatedAmt: any } | null; rows: { label: string; calculatedAmt: any }[] }[] {
    return sections.map((s: any) => {
      const sectionData = results.filter((r: any) => r.applicationScreenTabId === s.tabId);
      const resultRaw   = sectionData.find((r: any) => r.lineDetails === s.resultLineId) ?? null;
      const result = resultRaw
        ? { label: LINE_ID_LABELS[resultRaw.lineDetails] ?? resultRaw.lineDetails, calculatedAmt: this.formatValue(resultRaw.calculatedAmt) }
        : null;
      const rows = sectionData
        .filter((r: any) => r.lineDetails !== s.resultLineId)
        .map((r: any) => ({ label: LINE_ID_LABELS[r.lineDetails] ?? r.lineDetails, calculatedAmt: this.formatValue(r.calculatedAmt) }));
      return { heading: s.heading, result, rows };
    });
  }

  private loadPrimaryData(applicationId: any, customerId: any): void {
    this.svc.getCalculatorData(applicationId, customerId).subscribe({
      next: (data: any) => {
        this.primaryResults     = data.length ? data : PRIMARY_FALLBACK;
        this.primarySectionRows = this.buildSectionRows(this.primaryResults, PRIMARY_SECTIONS);
      },
      error: () => {
        this.primaryResults     = PRIMARY_FALLBACK;
        this.primarySectionRows = this.buildSectionRows(PRIMARY_FALLBACK, PRIMARY_SECTIONS);
      },
    });
  }

  private loadOwnerData(applicationId: any, customerId: any): void {
    this.svc.getCalculatorData(applicationId, customerId).subscribe({
      next: (data: any) => {
        this.ownerResults     = data.length ? data : OWNER_FALLBACK;
        this.ownerSectionRows = this.buildSectionRows(this.ownerResults, OWNER_SECTIONS);
        this.hasOwnerData     = true;
      },
      error: () => {
        this.ownerResults     = OWNER_FALLBACK;
        this.ownerSectionRows = this.buildSectionRows(OWNER_FALLBACK, OWNER_SECTIONS);
        this.hasOwnerData     = true;
      },
    });
  }
}
