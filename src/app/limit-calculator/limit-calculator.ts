import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LimitCalculatorService, ApiData } from './limit-calculator.service';

export interface PersonEntry {
  id: string;
  name: string;
  initials: string;
  customerId: string;
  applicationId: string;
}

type FmtType = 'number_0' | 'number_2' | 'number_4' | 'percent_1' | 'times_2' | 'currency_0';

interface RowConfig {
  label: string;
  key: string;
  highlight?: boolean;
  format: FmtType;
}

export interface SectionConfig {
  title: string;
  statusKey: string;
  hasResult?: boolean;
  rows: RowConfig[];
}

interface MetricConfig {
  label: string;
  key: string;
  colorClass: string;
  format: FmtType;
}

const SESSION_KEY = 'lc_entities';

// Seeded into sessionStorage when empty – simulates what the host app puts there
const SEED_SESSION: [PersonEntry[], PersonEntry[]] = [
  [
    { id: 'G1', name: 'Devon Yamashita', initials: 'DY', customerId: 'CUS001', applicationId: 'APP001' },
    { id: 'G2', name: 'Alex Johnson',    initials: 'AJ', customerId: 'CUS002', applicationId: 'APP001' },
    { id: 'G3', name: 'Maria Garcia',    initials: 'MG', customerId: 'CUS003', applicationId: 'APP001' },
  ],
  [
    { id: 'O1', name: 'BillionBrain Garage Ventures', initials: 'BG', customerId: 'BUS001', applicationId: 'APP001' },
  ],
];

@Component({
  selector: 'app-limit-calculator',
  imports: [CommonModule, FormsModule],
  templateUrl: './limit-calculator.html',
  styleUrl: './limit-calculator.scss',
})
export class LimitCalculator implements OnInit {
  private svc = inject(LimitCalculatorService);

  activeTab    = signal<'primary' | 'guarantors'>('primary');
  guarantors   = signal<PersonEntry[]>([]);
  owners       = signal<PersonEntry[]>([]);
  selectedGuarantor = signal<PersonEntry | null>(null);
  primaryData       = signal<ApiData>({});
  guarantorData     = signal<ApiData>({});
  primaryLoading    = signal(true);
  guarantorLoading  = signal(true);

  // ── Primary Borrower tab config ───────────────────────────
  readonly PRIMARY_METRICS: MetricConfig[] = [
    { label: 'TOTAL DEBT TO SALES', key: 'metric_1', colorClass: 'metric-red',   format: 'percent_1' },
    { label: 'REVOLVING / SALES',   key: 'metric_2', colorClass: 'metric-green', format: 'percent_1' },
    { label: 'BALANCE / PAYMENT',   key: 'metric_3', colorClass: 'metric-amber', format: 'times_2'   },
    { label: 'COMPANY SALES',       key: 'metric_4', colorClass: 'metric-blue',  format: 'currency_0' },
  ];

  readonly PRIMARY_SECTIONS: SectionConfig[] = [
    {
      title: 'Total Debt to Sales',
      statusKey: 'status_1',
      rows: [
        { label: 'Business Total Debt',    key: 'Business Total Debt',    format: 'number_0' },
        { label: 'New Debt Requested',     key: 'New Debt Requested',     format: 'number_0' },
        { label: 'Total Business Debt',    key: 'Total Business Debt',    format: 'number_0' },
        { label: 'Stated Revenue',         key: 'Stated Revenue',         format: 'number_0' },
        { label: 'Company Sales',          key: 'Company Sales',          format: 'number_0' },
        { label: 'Total Debt to Sales',    key: 'Total Debt to Sales',    format: 'number_4', highlight: true },
        { label: 'Maximum Allowed',        key: 'Maximum Allowed',        format: 'number_2' },
        { label: 'Loan Allowable',         key: 'Loan Allowable',         format: 'number_2' },
        { label: 'LOC Allowable',          key: 'LOC Allowable',          format: 'number_2' },
        { label: 'Unsatisfied Tax Liens',  key: 'Unsatisfied Tax Liens',  format: 'number_0' },
        { label: 'Unsatisfied Judgments',  key: 'Unsatisfied Judgments',  format: 'number_0' },
      ],
    },
    {
      title: 'Revolving Credit as % of Sales',
      statusKey: 'status_2',
      rows: [
        { label: 'Existing Citizens CC Limit',  key: 'Existing Citizens CC Limit',  format: 'number_0' },
        { label: 'Existing Citizens LOC Limit', key: 'Existing Citizens LOC Limit', format: 'number_0' },
        { label: 'New Credit Card Request',     key: 'New Credit Card Request',     format: 'number_0' },
        { label: 'New Line of Credit Request',  key: 'New Line of Credit Request',  format: 'number_0' },
        { label: 'Business Revolving Debt',     key: 'Business Revolving Debt',     format: 'number_0' },
        { label: 'Company Sales',               key: 'Company Sales',               format: 'number_0' },
        { label: 'Revolving Credit / Sales',    key: 'Revolving Credit / Sales',    format: 'number_4', highlight: true },
        { label: 'Maximum Allowed',             key: 'Max Revolving Allowed',       format: 'number_2' },
        { label: 'Allowable Amount',            key: 'Allowable Amount',            format: 'number_0' },
      ],
    },
    {
      title: 'Balance to Payment Ratio (4x required)',
      statusKey: 'status_3',
      rows: [
        { label: 'Avg Bank Balance (3-mo DDA)',   key: 'Avg Bank Balance (3-mo DDA)',  format: 'number_2' },
        { label: 'Term Loan Payment (Mo)',         key: 'Term Loan Payment (Mo)',        format: 'number_2' },
        { label: 'Line of Credit Payment (Mo)',    key: 'Line of Credit Payment (Mo)',   format: 'number_2' },
        { label: 'Credit Card Payment (Mo)',       key: 'Credit Card Payment (Mo)',      format: 'number_2' },
        { label: 'Total Requested Payments',       key: 'Total Requested Payments',      format: 'number_2' },
        { label: 'Balance to Payment Ratio',       key: 'Balance to Payment Ratio',      format: 'times_2', highlight: true },
        { label: 'Required Coverage',              key: 'Required Coverage',             format: 'times_2' },
        { label: 'Loan – BTPR Allowable',    key: 'Loan - BTPR Allowable',         format: 'number_2' },
        { label: 'LOC – BTPR Allowable',     key: 'LOC - BTPR Allowable',          format: 'number_2' },
      ],
    },
  ];

  // ── Guarantors tab config ─────────────────────────────────
  readonly GUARANTOR_METRICS: MetricConfig[] = [
    { label: 'STATED MONTHLY INCOME', key: 'metric_1', colorClass: 'metric-red',   format: 'number_2' },
    { label: 'BUREAU MONTHLY INCOME', key: 'metric_2', colorClass: 'metric-green', format: 'number_0' },
    { label: 'MONTHLY DEBT SERVICE',  key: 'metric_3', colorClass: 'metric-amber', format: 'number_0' },
    { label: 'UNSECURED DTI',         key: 'metric_4', colorClass: 'metric-blue',  format: 'number_4' },
  ];

  readonly GUARANTOR_SECTIONS: SectionConfig[] = [
    {
      title: 'Stated DTI (Unsecured) – TCL ≤ $50K',
      statusKey: 'status_1',
      rows: [
        { label: 'Stated Annual Income',  key: 'Stated Annual Income',  format: 'number_0' },
        { label: 'Stated Monthly Income', key: 'Stated Monthly Income', format: 'number_2' },
        { label: 'Monthly Debt Service',  key: 'Monthly Debt Service',  format: 'number_0' },
        { label: 'Requested CC (Mo)',     key: 'Requested CC (Mo)',     format: 'number_0' },
        { label: 'Requested LOC (Mo)',    key: 'Requested LOC (Mo)',    format: 'number_4' },
        { label: 'Total Monthly Debt',    key: 'Total Monthly Debt',    format: 'number_4' },
        { label: 'Unsecured DTI',         key: 'Unsecured DTI',         format: 'number_4', highlight: true },
        { label: 'Max Allowed DTI',       key: 'Max Allowed DTI',       format: 'number_2' },
      ],
    },
    {
      title: 'Modeled DTI (Bureau-Based) – TCL ≤ $50K',
      statusKey: 'status_2',
      rows: [
        { label: 'Bureau Monthly Income',  key: 'Bureau Monthly Income',       format: 'number_0' },
        { label: 'Monthly Debt Service',   key: 'Bureau Monthly Debt Service', format: 'number_0' },
        { label: 'Requested LOC (Mo)',     key: 'Bureau Requested LOC (Mo)',   format: 'number_4' },
        { label: 'Requested CC (Mo)',      key: 'Bureau Requested CC (Mo)',    format: 'number_0' },
        { label: 'Total Monthly Debt',     key: 'Bureau Total Monthly Debt',   format: 'number_4' },
        { label: 'Bureau DTI',             key: 'Bureau DTI',                  format: 'number_4', highlight: true },
        { label: 'Max Allowed DTI',        key: 'Bureau Max Allowed DTI',      format: 'number_2' },
      ],
    },
    {
      title: 'Stated DTI (Secured) – TCL > $50K',
      statusKey: 'status_3',
      rows: [
        { label: 'Stated Annual Income',  key: 'Secured Annual Income',         format: 'number_0' },
        { label: 'Stated Monthly Income', key: 'Secured Monthly Income',        format: 'number_2' },
        { label: 'Monthly Debt Service',  key: 'Secured Monthly Debt Service',  format: 'number_0' },
        { label: 'Term Loan (Mo)',        key: 'Term Loan (Mo)',                 format: 'number_4' },
        { label: 'Line of Credit (Mo)',   key: 'Line of Credit (Mo)',            format: 'number_2' },
        { label: 'Credit Card (Mo)',      key: 'Credit Card (Mo)',               format: 'number_0' },
        { label: 'Total Requested Pmts', key: 'Total Requested Pmts',           format: 'number_4' },
        { label: 'Secured DTI',           key: 'Secured DTI',                   format: 'number_4', highlight: true },
        { label: 'Max Allowed DTI',       key: 'Secured Max Allowed DTI',       format: 'number_2' },
      ],
    },
  ];

  // ── Lifecycle ─────────────────────────────────────────────
  ngOnInit(): void {
    if (!sessionStorage.getItem(SESSION_KEY)) {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(SEED_SESSION));
    }

    const parsed: [PersonEntry[], PersonEntry[]] = JSON.parse(sessionStorage.getItem(SESSION_KEY)!);
    const guarantorList = parsed[0] ?? [];
    const ownerList     = parsed[1] ?? [];

    this.guarantors.set(guarantorList);
    this.owners.set(ownerList);

    // Load primary borrower (owners[0])
    const owner = ownerList[0];
    if (owner) {
      this.loadPrimaryData(owner.applicationId, owner.customerId);
    }

    // Auto-select first guarantor and load their data
    const firstG = guarantorList[0] ?? null;
    this.selectedGuarantor.set(firstG);
    if (firstG) {
      this.loadGuarantorData(firstG.applicationId, firstG.customerId);
    }
  }

  // ── Guarantor select change ───────────────────────────────
  onGuarantorChange(customerId: string): void {
    const g = this.guarantors().find(x => x.customerId === customerId) ?? null;
    this.selectedGuarantor.set(g);
    if (g) this.loadGuarantorData(g.applicationId, g.customerId);
  }

  // ── API calls ─────────────────────────────────────────────
  private loadPrimaryData(applicationId: string, customerId: string): void {
    this.primaryLoading.set(true);
    this.svc.getCalculatorData(applicationId, customerId).subscribe(data => {
      this.primaryData.set(data);
      this.primaryLoading.set(false);
    });
  }

  private loadGuarantorData(applicationId: string, customerId: string): void {
    this.guarantorLoading.set(true);
    this.svc.getCalculatorData(applicationId, customerId).subscribe(data => {
      this.guarantorData.set(data);
      this.guarantorLoading.set(false);
    });
  }

  // ── Helpers ───────────────────────────────────────────────
  setTab(tab: 'primary' | 'guarantors'): void { this.activeTab.set(tab); }

  getStatus(data: ApiData, statusKey: string): string {
    return String(data[statusKey] ?? '');
  }

  statusClass(status: string): string {
    if (status === 'PASSES')       return 'badge-passes';
    if (status === 'DECLINE')      return 'badge-decline';
    return 'badge-overlimit';
  }

  resultText(status: string): string {
    if (status === 'PASSES')  return 'Passes Rule';
    if (status === 'DECLINE') return 'Decline / Counter Offer';
    return 'Fails – ' + status;
  }

  resultClass(status: string): string {
    return status === 'PASSES' ? 'text-success' : 'text-danger';
  }

  fmtVal(value: ApiData[string] | undefined, fmt: FmtType): string {
    if (value == null) return '—';
    const n = Number(value);
    if (isNaN(n)) return String(value);
    switch (fmt) {
      case 'number_0':   return n.toLocaleString('en-US', { maximumFractionDigits: 0 });
      case 'number_2':   return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      case 'number_4':   return n.toFixed(4);
      case 'percent_1':  return (n * 100).toFixed(1) + '%';
      case 'times_2':    return n.toFixed(2) + 'x';
      case 'currency_0': return '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 });
    }
  }
}
