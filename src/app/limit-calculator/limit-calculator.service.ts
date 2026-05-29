import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

const MOCK_DB: any = {
  BUS001: {
    1: [
      { applicationId: 'APP001', customerId: 'BUS001', applicationScreenTabId: 'CLC', lineDetails: 'LIN_C4',  calculatedAmt: '140000.0000000000' },
      { applicationId: 'APP001', customerId: 'BUS001', applicationScreenTabId: 'CLC', lineDetails: 'LIN_C5',  calculatedAmt: '55000.0000000000' },
      { applicationId: 'APP001', customerId: 'BUS001', applicationScreenTabId: 'CLC', lineDetails: 'LIN_C6',  calculatedAmt: '195000.0000000000' },
      { applicationId: 'APP001', customerId: 'BUS001', applicationScreenTabId: 'CLC', lineDetails: 'LIN_C7',  calculatedAmt: '310000.0000000000' },
      { applicationId: 'APP001', customerId: 'BUS001', applicationScreenTabId: 'CLC', lineDetails: 'LIN_C8',  calculatedAmt: '310000.0000000000' },
      { applicationId: 'APP001', customerId: 'BUS001', applicationScreenTabId: 'CLC', lineDetails: 'LIN_C9',  calculatedAmt: '0.6000000000' },
      { applicationId: 'APP001', customerId: 'BUS001', applicationScreenTabId: 'CLC', lineDetails: 'LIN_C11', calculatedAmt: '52247.0000000000' },
      { applicationId: 'APP001', customerId: 'BUS001', applicationScreenTabId: 'CLC', lineDetails: 'LIN_C12', calculatedAmt: '52247.0000000000' },
      { applicationId: 'APP001', customerId: 'BUS001', applicationScreenTabId: 'CLC', lineDetails: 'LIN_C13', calculatedAmt: '0.0000000000' },
      { applicationId: 'APP001', customerId: 'BUS001', applicationScreenTabId: 'CLC', lineDetails: 'LIN_C14', calculatedAmt: 'Fail Rule' },
    ],
    2: [
      { applicationId: 'APP001', customerId: 'BUS001', applicationScreenTabId: 'CLC', lineDetails: 'LIN_C17', calculatedAmt: '0.0000000000' },
      { applicationId: 'APP001', customerId: 'BUS001', applicationScreenTabId: 'CLC', lineDetails: 'LIN_C18', calculatedAmt: '0.0000000000' },
      { applicationId: 'APP001', customerId: 'BUS001', applicationScreenTabId: 'CLC', lineDetails: 'LIN_C19', calculatedAmt: '10000.0000000000' },
      { applicationId: 'APP001', customerId: 'BUS001', applicationScreenTabId: 'CLC', lineDetails: 'LIN_C20', calculatedAmt: '45000.0000000000' },
      { applicationId: 'APP001', customerId: 'BUS001', applicationScreenTabId: 'CLC', lineDetails: 'LIN_C21', calculatedAmt: '55000.0000000000' },
      { applicationId: 'APP001', customerId: 'BUS001', applicationScreenTabId: 'CLC', lineDetails: 'LIN_C22', calculatedAmt: '0.2500000000' },
      { applicationId: 'APP001', customerId: 'BUS001', applicationScreenTabId: 'CLC', lineDetails: 'LIN_C23', calculatedAmt: '77500.0000000000' },
      { applicationId: 'APP001', customerId: 'BUS001', applicationScreenTabId: 'CLC', lineDetails: 'LIN_C24', calculatedAmt: 'Pass Rule' },
    ],
    3: [
      { applicationId: 'APP001', customerId: 'BUS001', applicationScreenTabId: 'CLC', lineDetails: 'LIN_C27', calculatedAmt: '5692.3300000000' },
      { applicationId: 'APP001', customerId: 'BUS001', applicationScreenTabId: 'CLC', lineDetails: 'LIN_C28', calculatedAmt: '2232.8800000000' },
      { applicationId: 'APP001', customerId: 'BUS001', applicationScreenTabId: 'CLC', lineDetails: 'LIN_C29', calculatedAmt: '959.2000000000' },
      { applicationId: 'APP001', customerId: 'BUS001', applicationScreenTabId: 'CLC', lineDetails: 'LIN_C30', calculatedAmt: '600.0000000000' },
      { applicationId: 'APP001', customerId: 'BUS001', applicationScreenTabId: 'CLC', lineDetails: 'LIN_C31', calculatedAmt: '3792.0700000000' },
      { applicationId: 'APP001', customerId: 'BUS001', applicationScreenTabId: 'CLC', lineDetails: 'LIN_C32', calculatedAmt: '4.0000000000' },
      { applicationId: 'APP001', customerId: 'BUS001', applicationScreenTabId: 'CLC', lineDetails: 'LIN_C33', calculatedAmt: '63733.1600000000' },
      { applicationId: 'APP001', customerId: 'BUS001', applicationScreenTabId: 'CLC', lineDetails: 'LIN_C34', calculatedAmt: '66762.9600000000' },
      { applicationId: 'APP001', customerId: 'BUS001', applicationScreenTabId: 'CLC', lineDetails: 'LIN_C35', calculatedAmt: 'Fail Rule' },
    ],
  },

  CUS001: {
    4: [
      { applicationId: 'APP001', customerId: 'CUS001', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J4',  calculatedAmt: '98500.0000000000' },
      { applicationId: 'APP001', customerId: 'CUS001', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J5',  calculatedAmt: '8208.3300000000' },
      { applicationId: 'APP001', customerId: 'CUS001', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J6',  calculatedAmt: '2610.0000000000' },
      { applicationId: 'APP001', customerId: 'CUS001', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J7',  calculatedAmt: '375.0000000000' },
      { applicationId: 'APP001', customerId: 'CUS001', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J8',  calculatedAmt: '742.8800000000' },
      { applicationId: 'APP001', customerId: 'CUS001', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J9',  calculatedAmt: '3727.8800000000' },
      { applicationId: 'APP001', customerId: 'CUS001', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J10', calculatedAmt: '0.5000000000' },
      { applicationId: 'APP001', customerId: 'CUS001', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J11', calculatedAmt: 'Pass Rule' },
    ],
    5: [
      { applicationId: 'APP001', customerId: 'CUS001', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J14', calculatedAmt: '7400.0000000000' },
      { applicationId: 'APP001', customerId: 'CUS001', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J15', calculatedAmt: '2610.0000000000' },
      { applicationId: 'APP001', customerId: 'CUS001', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J16', calculatedAmt: '742.8800000000' },
      { applicationId: 'APP001', customerId: 'CUS001', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J17', calculatedAmt: '188.0000000000' },
      { applicationId: 'APP001', customerId: 'CUS001', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J18', calculatedAmt: '3540.8800000000' },
      { applicationId: 'APP001', customerId: 'CUS001', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J19', calculatedAmt: '0.5000000000' },
      { applicationId: 'APP001', customerId: 'CUS001', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J20', calculatedAmt: 'Pass Rule' },
    ],
    6: [
      { applicationId: 'APP001', customerId: 'CUS001', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J23', calculatedAmt: '98500.0000000000' },
      { applicationId: 'APP001', customerId: 'CUS001', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J24', calculatedAmt: '8208.3300000000' },
      { applicationId: 'APP001', customerId: 'CUS001', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J25', calculatedAmt: '2610.0000000000' },
      { applicationId: 'APP001', customerId: 'CUS001', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J26', calculatedAmt: '1455.6700000000' },
      { applicationId: 'APP001', customerId: 'CUS001', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J27', calculatedAmt: '742.8800000000' },
      { applicationId: 'APP001', customerId: 'CUS001', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J28', calculatedAmt: '375.0000000000' },
      { applicationId: 'APP001', customerId: 'CUS001', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J29', calculatedAmt: '2573.5500000000' },
      { applicationId: 'APP001', customerId: 'CUS001', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J30', calculatedAmt: '0.5000000000' },
      { applicationId: 'APP001', customerId: 'CUS001', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J31', calculatedAmt: 'Fail Rule' },
    ],
  },

  CUS002: {
    4: [
      { applicationId: 'APP001', customerId: 'CUS002', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J4',  calculatedAmt: '78000.0000000000' },
      { applicationId: 'APP001', customerId: 'CUS002', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J5',  calculatedAmt: '6500.0000000000' },
      { applicationId: 'APP001', customerId: 'CUS002', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J6',  calculatedAmt: '1800.0000000000' },
      { applicationId: 'APP001', customerId: 'CUS002', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J7',  calculatedAmt: '250.0000000000' },
      { applicationId: 'APP001', customerId: 'CUS002', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J8',  calculatedAmt: '150.0000000000' },
      { applicationId: 'APP001', customerId: 'CUS002', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J9',  calculatedAmt: '2200.0000000000' },
      { applicationId: 'APP001', customerId: 'CUS002', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J10', calculatedAmt: '0.5000000000' },
      { applicationId: 'APP001', customerId: 'CUS002', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J11', calculatedAmt: 'Pass Rule' },
    ],
    5: [
      { applicationId: 'APP001', customerId: 'CUS002', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J14', calculatedAmt: '6200.0000000000' },
      { applicationId: 'APP001', customerId: 'CUS002', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J15', calculatedAmt: '1800.0000000000' },
      { applicationId: 'APP001', customerId: 'CUS002', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J16', calculatedAmt: '150.0000000000' },
      { applicationId: 'APP001', customerId: 'CUS002', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J17', calculatedAmt: '125.0000000000' },
      { applicationId: 'APP001', customerId: 'CUS002', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J18', calculatedAmt: '2075.0000000000' },
      { applicationId: 'APP001', customerId: 'CUS002', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J19', calculatedAmt: '0.5000000000' },
      { applicationId: 'APP001', customerId: 'CUS002', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J20', calculatedAmt: 'Pass Rule' },
    ],
    6: [
      { applicationId: 'APP001', customerId: 'CUS002', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J23', calculatedAmt: '78000.0000000000' },
      { applicationId: 'APP001', customerId: 'CUS002', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J24', calculatedAmt: '6500.0000000000' },
      { applicationId: 'APP001', customerId: 'CUS002', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J25', calculatedAmt: '1800.0000000000' },
      { applicationId: 'APP001', customerId: 'CUS002', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J26', calculatedAmt: '950.0000000000' },
      { applicationId: 'APP001', customerId: 'CUS002', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J27', calculatedAmt: '150.0000000000' },
      { applicationId: 'APP001', customerId: 'CUS002', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J28', calculatedAmt: '250.0000000000' },
      { applicationId: 'APP001', customerId: 'CUS002', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J29', calculatedAmt: '3150.0000000000' },
      { applicationId: 'APP001', customerId: 'CUS002', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J30', calculatedAmt: '0.5000000000' },
      { applicationId: 'APP001', customerId: 'CUS002', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J31', calculatedAmt: 'Pass Rule' },
    ],
  },

  CUS003: {
    4: [
      { applicationId: 'APP001', customerId: 'CUS003', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J4',  calculatedAmt: '109200.0000000000' },
      { applicationId: 'APP001', customerId: 'CUS003', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J5',  calculatedAmt: '9100.0000000000' },
      { applicationId: 'APP001', customerId: 'CUS003', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J6',  calculatedAmt: '3200.0000000000' },
      { applicationId: 'APP001', customerId: 'CUS003', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J7',  calculatedAmt: '400.0000000000' },
      { applicationId: 'APP001', customerId: 'CUS003', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J8',  calculatedAmt: '200.0000000000' },
      { applicationId: 'APP001', customerId: 'CUS003', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J9',  calculatedAmt: '3800.0000000000' },
      { applicationId: 'APP001', customerId: 'CUS003', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J10', calculatedAmt: '0.5000000000' },
      { applicationId: 'APP001', customerId: 'CUS003', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J11', calculatedAmt: 'Pass Rule' },
    ],
    5: [
      { applicationId: 'APP001', customerId: 'CUS003', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J14', calculatedAmt: '8800.0000000000' },
      { applicationId: 'APP001', customerId: 'CUS003', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J15', calculatedAmt: '3200.0000000000' },
      { applicationId: 'APP001', customerId: 'CUS003', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J16', calculatedAmt: '200.0000000000' },
      { applicationId: 'APP001', customerId: 'CUS003', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J17', calculatedAmt: '200.0000000000' },
      { applicationId: 'APP001', customerId: 'CUS003', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J18', calculatedAmt: '3600.0000000000' },
      { applicationId: 'APP001', customerId: 'CUS003', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J19', calculatedAmt: '0.5000000000' },
      { applicationId: 'APP001', customerId: 'CUS003', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J20', calculatedAmt: 'Pass Rule' },
    ],
    6: [
      { applicationId: 'APP001', customerId: 'CUS003', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J23', calculatedAmt: '109200.0000000000' },
      { applicationId: 'APP001', customerId: 'CUS003', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J24', calculatedAmt: '9100.0000000000' },
      { applicationId: 'APP001', customerId: 'CUS003', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J25', calculatedAmt: '3200.0000000000' },
      { applicationId: 'APP001', customerId: 'CUS003', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J26', calculatedAmt: '1800.0000000000' },
      { applicationId: 'APP001', customerId: 'CUS003', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J27', calculatedAmt: '200.0000000000' },
      { applicationId: 'APP001', customerId: 'CUS003', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J28', calculatedAmt: '400.0000000000' },
      { applicationId: 'APP001', customerId: 'CUS003', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J29', calculatedAmt: '5600.0000000000' },
      { applicationId: 'APP001', customerId: 'CUS003', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J30', calculatedAmt: '0.5000000000' },
      { applicationId: 'APP001', customerId: 'CUS003', applicationScreenTabId: 'CLC', lineDetails: 'LIN_J31', calculatedAmt: 'Fail Rule' },
    ],
  },
};

@Injectable({ providedIn: 'root' })
export class LimitCalculatorService {
  getCalculatorData(_applicationId: any, _customerId: any, partyId: any, tabId: any): Observable<any> {
    return of(MOCK_DB[partyId]?.[tabId] ?? []);
  }
}
