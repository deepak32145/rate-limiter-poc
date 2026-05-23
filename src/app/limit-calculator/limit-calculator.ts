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

// ── Section configs ───────────────────────────────────────────
const PRIMARY_SECTIONS: any[] = [
  {
    heading: 'Total Debt to Sales',
    code: 1,
    resultLineId: 'LIN_C14',
    lineIds: ['LIN_C4', 'LIN_C5', 'LIN_C6', 'LIN_C7', 'LIN_C8', 'LIN_C9', 'LIN_C11', 'LIN_C12', 'LIN_C13', 'LIN_C14'],
  },
  {
    heading: 'Revolving Credit as % of Sales',
    code: 2,
    resultLineId: 'LIN_C24',
    lineIds: ['LIN_C17', 'LIN_C18', 'LIN_C19', 'LIN_C20', 'LIN_C21', 'LIN_C22', 'LIN_C23', 'LIN_C24'],
  },
  {
    heading: 'Balance to Payment Ratio',
    code: 3,
    resultLineId: 'LIN_C35',
    lineIds: ['LIN_C27', 'LIN_C28', 'LIN_C29', 'LIN_C30', 'LIN_C31', 'LIN_C32', 'LIN_C33', 'LIN_C34', 'LIN_C35'],
  },
];

const OWNER_SECTIONS: any[] = [
  {
    heading: 'Stated DTI (Unsecured)',
    code: 4,
    resultLineId: 'LIN_J11',
    lineIds: ['LIN_J4', 'LIN_J5', 'LIN_J6', 'LIN_J7', 'LIN_J8', 'LIN_J9', 'LIN_J10', 'LIN_J11'],
  },
  {
    heading: 'Bureau DTI (Modeled)',
    code: 5,
    resultLineId: 'LIN_J20',
    lineIds: ['LIN_J14', 'LIN_J15', 'LIN_J16', 'LIN_J17', 'LIN_J18', 'LIN_J19', 'LIN_J20'],
  },
  {
    heading: 'Stated DTI (Secured)',
    code: 6,
    resultLineId: 'LIN_J31',
    lineIds: ['LIN_J23', 'LIN_J24', 'LIN_J25', 'LIN_J26', 'LIN_J27', 'LIN_J28', 'LIN_J29', 'LIN_J30', 'LIN_J31'],
  },
];

// ── Fallback mock data (used when API call errors) ───────────
const PRIMARY_FALLBACK: any[] = PRIMARY_SECTIONS
  .flatMap((s: any) => s.lineIds.map((id: any) => ({
    applicationId: 'APP001', customerId: 'BUS001', applicationScreenTabId: 'CLC', lineDetails: id, calculatedAmt: '—',
  })));

const OWNER_FALLBACK: any[] = OWNER_SECTIONS
  .flatMap((s: any) => s.lineIds.map((id: any) => ({
    applicationId: 'APP001', customerId: 'CUS001', applicationScreenTabId: 'CLC', lineDetails: id, calculatedAmt: '—',
  })));

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
      const resultRaw = results.find((r: any) => r.lineDetails === s.resultLineId) ?? null;
      const result = resultRaw
        ? { label: LINE_ID_LABELS[resultRaw.lineDetails] ?? resultRaw.lineDetails, calculatedAmt: this.formatValue(resultRaw.calculatedAmt) }
        : null;
      const rows = s.lineIds
        .filter((id: any) => id !== s.resultLineId)
        .map((id: any) => results.find((r: any) => r.lineDetails === id))
        .filter(Boolean)
        .map((r: any) => ({ label: LINE_ID_LABELS[r.lineDetails] ?? r.lineDetails, calculatedAmt: this.formatValue(r.calculatedAmt) }));
      return { heading: s.heading, result, rows };
    });
  }

  private loadPrimaryData(appId: any, customerId: any): void {
    this.svc.getCalculatorData(appId, customerId).subscribe({
      next: (data: any) => {
        this.primaryResults    = data.length ? data : PRIMARY_FALLBACK;
        this.primarySectionRows = this.buildSectionRows(this.primaryResults, PRIMARY_SECTIONS);
      },
      error: () => {
        this.primaryResults    = PRIMARY_FALLBACK;
        this.primarySectionRows = this.buildSectionRows(PRIMARY_FALLBACK, PRIMARY_SECTIONS);
      },
    });
  }

  private loadOwnerData(appId: any, customerId: any): void {
    this.svc.getCalculatorData(appId, customerId).subscribe({
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
