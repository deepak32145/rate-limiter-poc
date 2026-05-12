import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export type ApiData = Record<string, number | string>;

// Simulates backend response: flat key-value where key = label, value = data
const MOCK_DB: Record<string, ApiData> = {
  // ── Primary Borrower ──────────────────────────────────────
  BUS001: {
    metric_1: 0.629, metric_2: 0.1774, metric_3: 1.50, metric_4: 310000,
    status_1: 'OVER LIMIT', status_2: 'PASSES', status_3: 'BELOW COVERAGE',
    // Section 1 – Total Debt to Sales
    'Business Total Debt': 140000,
    'New Debt Requested': 55000,
    'Total Business Debt': 195000,
    'Stated Revenue': 310000,
    'Company Sales': 310000,
    'Total Debt to Sales': 0.629,
    'Maximum Allowed': 0.60,
    'Loan Allowable': 52247,
    'LOC Allowable': 52247,
    'Unsatisfied Tax Liens': 0,
    'Unsatisfied Judgments': 0,
    // Section 2 – Revolving Credit as % of Sales
    'Existing Citizens CC Limit': 0,
    'Existing Citizens LOC Limit': 0,
    'New Credit Card Request': 10000,
    'New Line of Credit Request': 45000,
    'Business Revolving Debt': 55000,
    'Revolving Credit / Sales': 0.1774,
    'Max Revolving Allowed': 0.25,
    'Allowable Amount': 77500,
    // Section 3 – Balance to Payment Ratio
    'Avg Bank Balance (3-mo DDA)': 5692.33,
    'Term Loan Payment (Mo)': 2232.88,
    'Line of Credit Payment (Mo)': 959.20,
    'Credit Card Payment (Mo)': 600.00,
    'Total Requested Payments': 3792.07,
    'Balance to Payment Ratio': 1.50,
    'Required Coverage': 4.00,
    'Loan - BTPR Allowable': 63733.16,
    'LOC - BTPR Allowable': 66762.96,
  },

  // ── Guarantor – Devon Yamashita ───────────────────────────
  CUS001: {
    metric_1: 8208.33, metric_2: 7400, metric_3: 2610, metric_4: 0.4541,
    status_1: 'PASSES', status_2: 'PASSES', status_3: 'DECLINE',
    // Section 1 – Stated DTI (Unsecured)
    'Stated Annual Income': 98500,
    'Stated Monthly Income': 8208.33,
    'Monthly Debt Service': 2610,
    'Requested CC (Mo)': 375,
    'Requested LOC (Mo)': 742.88,
    'Total Monthly Debt': 3727.88,
    'Unsecured DTI': 0.4541,
    'Max Allowed DTI': 0.50,
    // Section 2 – Modeled DTI (Bureau-Based)
    'Bureau Monthly Income': 7400,
    'Bureau Monthly Debt Service': 2610,
    'Bureau Requested LOC (Mo)': 742.88,
    'Bureau Requested CC (Mo)': 188,
    'Bureau Total Monthly Debt': 3540.88,
    'Bureau DTI': 0.4785,
    'Bureau Max Allowed DTI': 0.50,
    // Section 3 – Stated DTI (Secured)
    'Secured Annual Income': 98500,
    'Secured Monthly Income': 8208.33,
    'Secured Monthly Debt Service': 2610,
    'Term Loan (Mo)': 1455.67,
    'Line of Credit (Mo)': 742.88,
    'Credit Card (Mo)': 375,
    'Total Requested Pmts': 2573.55,
    'Secured DTI': 0.6314,
    'Secured Max Allowed DTI': 0.50,
  },

  // ── Guarantor – Alex Johnson ──────────────────────────────
  CUS002: {
    metric_1: 6500.00, metric_2: 6200, metric_3: 1800, metric_4: 0.3385,
    status_1: 'PASSES', status_2: 'PASSES', status_3: 'PASSES',
    'Stated Annual Income': 78000,
    'Stated Monthly Income': 6500.00,
    'Monthly Debt Service': 1800,
    'Requested CC (Mo)': 250,
    'Requested LOC (Mo)': 150.00,
    'Total Monthly Debt': 2200.00,
    'Unsecured DTI': 0.3385,
    'Max Allowed DTI': 0.50,
    'Bureau Monthly Income': 6200,
    'Bureau Monthly Debt Service': 1800,
    'Bureau Requested LOC (Mo)': 150.00,
    'Bureau Requested CC (Mo)': 125,
    'Bureau Total Monthly Debt': 2075.00,
    'Bureau DTI': 0.3347,
    'Bureau Max Allowed DTI': 0.50,
    'Secured Annual Income': 78000,
    'Secured Monthly Income': 6500.00,
    'Secured Monthly Debt Service': 1800,
    'Term Loan (Mo)': 950.00,
    'Line of Credit (Mo)': 150.00,
    'Credit Card (Mo)': 250,
    'Total Requested Pmts': 3150.00,
    'Secured DTI': 0.4846,
    'Secured Max Allowed DTI': 0.50,
  },

  // ── Guarantor – Maria Garcia ──────────────────────────────
  CUS003: {
    metric_1: 9100.00, metric_2: 8800, metric_3: 3200, metric_4: 0.4176,
    status_1: 'PASSES', status_2: 'PASSES', status_3: 'DECLINE',
    'Stated Annual Income': 109200,
    'Stated Monthly Income': 9100.00,
    'Monthly Debt Service': 3200,
    'Requested CC (Mo)': 400,
    'Requested LOC (Mo)': 200.00,
    'Total Monthly Debt': 3800.00,
    'Unsecured DTI': 0.4176,
    'Max Allowed DTI': 0.50,
    'Bureau Monthly Income': 8800,
    'Bureau Monthly Debt Service': 3200,
    'Bureau Requested LOC (Mo)': 200.00,
    'Bureau Requested CC (Mo)': 200,
    'Bureau Total Monthly Debt': 3600.00,
    'Bureau DTI': 0.4091,
    'Bureau Max Allowed DTI': 0.50,
    'Secured Annual Income': 109200,
    'Secured Monthly Income': 9100.00,
    'Secured Monthly Debt Service': 3200,
    'Term Loan (Mo)': 1800.00,
    'Line of Credit (Mo)': 200.00,
    'Credit Card (Mo)': 400,
    'Total Requested Pmts': 5600.00,
    'Secured DTI': 0.6154,
    'Secured Max Allowed DTI': 0.50,
  },
};

@Injectable({ providedIn: 'root' })
export class LimitCalculatorService {
  getCalculatorData(applicationId: string, customerId: string): Observable<ApiData> {
    return of({ ...(MOCK_DB[customerId] ?? {}) }).pipe(delay(400));
  }
}
