import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LimitCalculatorService } from './limit-calculator.service';

const SESSION_KEY = 'lc_users';

const SEED_SESSION: any[] = [
  { appId: 'APP001', customerId: 'BUS001', customerName: 'BillionBrain Garage Ventures' },
  { appId: 'APP001', customerId: 'CUS001', customerName: 'Devon Yamashita' },
  { appId: 'APP001', customerId: 'CUS002', customerName: 'Alex Johnson' },
  { appId: 'APP001', customerId: 'CUS003', customerName: 'Maria Garcia' },
];

// ── lineId code → human label ──────────────────────────────
const LINE_ID_LABELS: any = {
  // Primary sections
  BIZ_TOTAL_DEBT:   'Business Total Debt',
  NEW_DEBT_REQ:     'New Debt Requested',
  TOTAL_BIZ_DEBT:   'Total Business Debt',
  STATED_REVENUE:   'Stated Revenue',
  CO_SALES:         'Company Sales',
  DEBT_SALES_RATIO: 'Total Debt to Sales',
  MAX_ALLOWED:      'Maximum Allowed',
  LOAN_ALLOWABLE:   'Loan Allowable',
  LOC_ALLOWABLE:    'LOC Allowable',
  TAX_LIENS:        'Unsatisfied Tax Liens',
  JUDGMENTS:        'Unsatisfied Judgments',
  CC_LIMIT:         'Existing Citizens CC Limit',
  LOC_LIMIT:        'Existing Citizens LOC Limit',
  NEW_CC_REQ:       'New Credit Card Request',
  NEW_LOC_REQ:      'New Line of Credit Request',
  BIZ_REVOLVING:    'Business Revolving Debt',
  REVOLVING_PCT:    'Revolving Credit / Sales',
  MAX_REVOLVING:    'Maximum Revolving Allowed',
  ALLOWABLE_AMT:    'Allowable Amount',
  AVG_BANK_BAL:     'Avg Bank Balance (3-mo DDA)',
  TERM_LOAN_PMT:    'Term Loan Payment (Mo)',
  LOC_PMT:          'Line of Credit Payment (Mo)',
  CC_PMT:           'Credit Card Payment (Mo)',
  TOTAL_REQ_PMTS:   'Total Requested Payments',
  BAL_PMT_RATIO:    'Balance to Payment Ratio',
  REQ_COVERAGE:     'Required Coverage',
  LOAN_BTPR:        'Loan – BTPR Allowable',
  LOC_BTPR:         'LOC – BTPR Allowable',
  // Owner sections
  STATED_ANN_INC:   'Stated Annual Income',
  STATED_MO_INC:    'Stated Monthly Income',
  MO_DEBT_SVC:      'Monthly Debt Service',
  REQ_CC_MO:        'Requested CC (Mo)',
  REQ_LOC_MO:       'Requested LOC (Mo)',
  TOTAL_MO_DEBT:    'Total Monthly Debt',
  UNSEC_DTI:        'Unsecured DTI',
  MAX_DTI:          'Max Allowed DTI',
  BUR_MO_INC:       'Bureau Monthly Income',
  BUR_DEBT_SVC:     'Bureau Monthly Debt Service',
  BUR_LOC_MO:       'Bureau Requested LOC (Mo)',
  BUR_CC_MO:        'Bureau Requested CC (Mo)',
  BUR_TOTAL_DEBT:   'Bureau Total Monthly Debt',
  BUR_DTI:          'Bureau DTI',
  BUR_MAX_DTI:      'Bureau Max Allowed DTI',
  SEC_ANN_INC:      'Stated Annual Income (Secured)',
  SEC_MO_INC:       'Stated Monthly Income (Secured)',
  SEC_DEBT_SVC:     'Monthly Debt Service (Secured)',
  TERM_LOAN_MO:     'Term Loan (Mo)',
  LOC_MO:           'Line of Credit (Mo)',
  CC_MO:            'Credit Card (Mo)',
  SEC_DTI:          'Secured DTI',
  SEC_MAX_DTI:      'Max Allowed DTI (Secured)',
};

// ── Section configs: which lineIds belong under each heading ──
const PRIMARY_SECTIONS: any[] = [
  {
    heading: 'Total Debt to Sales',
    lineIds: [
      'BIZ_TOTAL_DEBT', 'NEW_DEBT_REQ', 'TOTAL_BIZ_DEBT', 'STATED_REVENUE',
      'CO_SALES', 'DEBT_SALES_RATIO', 'MAX_ALLOWED', 'LOAN_ALLOWABLE',
      'LOC_ALLOWABLE', 'TAX_LIENS', 'JUDGMENTS',
    ],
  },
  {
    heading: 'Revolving Credit as % of Sales',
    lineIds: [
      'CC_LIMIT', 'LOC_LIMIT', 'NEW_CC_REQ', 'NEW_LOC_REQ',
      'BIZ_REVOLVING', 'REVOLVING_PCT', 'MAX_REVOLVING', 'ALLOWABLE_AMT',
    ],
  },
  {
    heading: 'Balance to Payment Ratio',
    lineIds: [
      'AVG_BANK_BAL', 'TERM_LOAN_PMT', 'LOC_PMT', 'CC_PMT',
      'TOTAL_REQ_PMTS', 'BAL_PMT_RATIO', 'REQ_COVERAGE', 'LOAN_BTPR', 'LOC_BTPR',
    ],
  },
];

const OWNER_SECTIONS: any[] = [
  {
    heading: 'Stated DTI (Unsecured)',
    lineIds: [
      'STATED_ANN_INC', 'STATED_MO_INC', 'MO_DEBT_SVC',
      'REQ_CC_MO', 'REQ_LOC_MO', 'TOTAL_MO_DEBT', 'UNSEC_DTI', 'MAX_DTI',
    ],
  },
  {
    heading: 'Bureau DTI (Modeled)',
    lineIds: [
      'BUR_MO_INC', 'BUR_DEBT_SVC', 'BUR_LOC_MO',
      'BUR_CC_MO', 'BUR_TOTAL_DEBT', 'BUR_DTI', 'BUR_MAX_DTI',
    ],
  },
  {
    heading: 'Stated DTI (Secured)',
    lineIds: [
      'SEC_ANN_INC', 'SEC_MO_INC', 'SEC_DEBT_SVC',
      'TERM_LOAN_MO', 'LOC_MO', 'CC_MO', 'TOTAL_REQ_PMTS', 'SEC_DTI', 'SEC_MAX_DTI',
    ],
  },
];

// ── Fallback mock data (used when API call errors) ───────────
const PRIMARY_FALLBACK: any[] = PRIMARY_SECTIONS
  .flatMap((s: any) => s.lineIds.map((id: any) => ({
    appId: 'APP001', customerId: 'BUS001', lineId: id, lineIdValue: '—',
  })));

const OWNER_FALLBACK: any[] = OWNER_SECTIONS
  .flatMap((s: any) => s.lineIds.map((id: any) => ({
    appId: 'APP001', customerId: 'CUS001', lineId: id, lineIdValue: '—',
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

  primaryResults: any[] = [];
  ownerResults: any[] = [];

  readonly lineIdLabels: any = LINE_ID_LABELS;
  readonly primarySections: any[] = PRIMARY_SECTIONS;
  readonly ownerSections: any[] = OWNER_SECTIONS;

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

    this.loadPrimaryData(this.primaryUser.appId, this.primaryUser.customerId);
  }

  onOwnerChange(customerId: any): void {
    const owner = this.owners.find((o: any) => o.customerId === customerId) ?? null;
    this.selectedOwner = owner;
    if (owner) this.loadOwnerData(owner.appId, owner.customerId);
  }

  setTab(tab: any): void {
    this.activeTab = tab;
    if (tab === 'owners' && this.ownerResults.length === 0 && this.selectedOwner) {
      this.loadOwnerData(this.selectedOwner.appId, this.selectedOwner.customerId);
    }
  }

  getSection(results: any[], lineIds: any[]): any[] {
    return lineIds
      .map((id: any) => results.find((r: any) => r.lineId === id))
      .filter(Boolean);
  }

  getLabel(lineId: any): any {
    return this.lineIdLabels[lineId] ?? lineId;
  }

  private loadPrimaryData(appId: any, customerId: any): void {
    this.svc.getCalculatorData(appId, customerId).subscribe({
      next: (data: any) => { this.primaryResults = data.length ? data : PRIMARY_FALLBACK; },
      error: () => { this.primaryResults = PRIMARY_FALLBACK; },
    });
  }

  private loadOwnerData(appId: any, customerId: any): void {
    this.svc.getCalculatorData(appId, customerId).subscribe({
      next: (data: any) => { this.ownerResults = data.length ? data : OWNER_FALLBACK; },
      error: () => { this.ownerResults = OWNER_FALLBACK; },
    });
  }
}
