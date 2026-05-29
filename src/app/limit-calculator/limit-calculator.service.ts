import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

const MOCK_DB: any = {
  // Primary / business entity
  BUS001: [
    { applicationId: 'APP001', customerId: 'BUS001', screenId: 'DRSG', applicationScreenTabId: 'TDS', lineDetails: 'TDSC4',  calculatedAmt: '140000.0000000000', calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'BUS001', screenId: 'DRSG', applicationScreenTabId: 'TDS', lineDetails: 'TDSC5',  calculatedAmt: '55000.0000000000',  calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'BUS001', screenId: 'DRSG', applicationScreenTabId: 'TDS', lineDetails: 'TDSC6',  calculatedAmt: '195000.0000000000', calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'BUS001', screenId: 'DRSG', applicationScreenTabId: 'TDS', lineDetails: 'TDSC7',  calculatedAmt: '310000.0000000000', calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'BUS001', screenId: 'DRSG', applicationScreenTabId: 'TDS', lineDetails: 'TDSC8',  calculatedAmt: '310000.0000000000', calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'BUS001', screenId: 'DRSG', applicationScreenTabId: 'TDS', lineDetails: 'TDSC9',  calculatedAmt: '0.6000000000',      calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'BUS001', screenId: 'DRSG', applicationScreenTabId: 'TDS', lineDetails: 'TDSC11', calculatedAmt: '52247.0000000000',  calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'BUS001', screenId: 'DRSG', applicationScreenTabId: 'TDS', lineDetails: 'TDSC12', calculatedAmt: '52247.0000000000',  calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'BUS001', screenId: 'DRSG', applicationScreenTabId: 'TDS', lineDetails: 'TDSC13', calculatedAmt: '0.0000000000',      calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'BUS001', screenId: 'DRSG', applicationScreenTabId: 'TDS', lineDetails: 'TDSC14', calculatedAmt: 'Fail Rule',          calculatedValue: '' },

    { applicationId: 'APP001', customerId: 'BUS001', screenId: 'DRSG', applicationScreenTabId: 'RCS', lineDetails: 'RCSC17', calculatedAmt: '0.0000000000',      calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'BUS001', screenId: 'DRSG', applicationScreenTabId: 'RCS', lineDetails: 'RCSC18', calculatedAmt: '0.0000000000',      calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'BUS001', screenId: 'DRSG', applicationScreenTabId: 'RCS', lineDetails: 'RCSC19', calculatedAmt: '10000.0000000000',  calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'BUS001', screenId: 'DRSG', applicationScreenTabId: 'RCS', lineDetails: 'RCSC20', calculatedAmt: '45000.0000000000',  calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'BUS001', screenId: 'DRSG', applicationScreenTabId: 'RCS', lineDetails: 'RCSC21', calculatedAmt: '55000.0000000000',  calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'BUS001', screenId: 'DRSG', applicationScreenTabId: 'RCS', lineDetails: 'RCSC22', calculatedAmt: '0.2500000000',      calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'BUS001', screenId: 'DRSG', applicationScreenTabId: 'RCS', lineDetails: 'RCSC23', calculatedAmt: '77500.0000000000',  calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'BUS001', screenId: 'DRSG', applicationScreenTabId: 'RCS', lineDetails: 'RCSC24', calculatedAmt: 'Pass Rule',          calculatedValue: '' },

    { applicationId: 'APP001', customerId: 'BUS001', screenId: 'DRSG', applicationScreenTabId: 'BTP', lineDetails: 'BTPC27', calculatedAmt: '5692.3300000000',   calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'BUS001', screenId: 'DRSG', applicationScreenTabId: 'BTP', lineDetails: 'BTPC28', calculatedAmt: '2232.8800000000',   calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'BUS001', screenId: 'DRSG', applicationScreenTabId: 'BTP', lineDetails: 'BTPC29', calculatedAmt: '959.2000000000',    calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'BUS001', screenId: 'DRSG', applicationScreenTabId: 'BTP', lineDetails: 'BTPC30', calculatedAmt: '600.0000000000',    calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'BUS001', screenId: 'DRSG', applicationScreenTabId: 'BTP', lineDetails: 'BTPC31', calculatedAmt: '3792.0700000000',   calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'BUS001', screenId: 'DRSG', applicationScreenTabId: 'BTP', lineDetails: 'BTPC32', calculatedAmt: '4.0000000000',      calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'BUS001', screenId: 'DRSG', applicationScreenTabId: 'BTP', lineDetails: 'BTPC33', calculatedAmt: '63733.1600000000',  calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'BUS001', screenId: 'DRSG', applicationScreenTabId: 'BTP', lineDetails: 'BTPC34', calculatedAmt: '66762.9600000000',  calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'BUS001', screenId: 'DRSG', applicationScreenTabId: 'BTP', lineDetails: 'BTPC35', calculatedAmt: 'Fail Rule',          calculatedValue: '' },
  ],

  // Owner – Devon Yamashita
  CUS001: [
    { applicationId: 'APP001', customerId: 'CUS001', screenId: 'DRSG', applicationScreenTabId: 'SDU', lineDetails: 'DRSJ12', calculatedAmt: '250000.0000000000', calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS001', screenId: 'DRSG', applicationScreenTabId: 'SDU', lineDetails: 'DRSJ4',  calculatedAmt: '1394.0000000000',   calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS001', screenId: 'DRSG', applicationScreenTabId: 'SDU', lineDetails: 'DRSJ5',  calculatedAmt: '8208.3300000000',   calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS001', screenId: 'DRSG', applicationScreenTabId: 'SDU', lineDetails: 'DRSJ6',  calculatedAmt: '2610.0000000000',   calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS001', screenId: 'DRSG', applicationScreenTabId: 'SDU', lineDetails: 'DRSJ7',  calculatedAmt: '375.0000000000',    calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS001', screenId: 'DRSG', applicationScreenTabId: 'SDU', lineDetails: 'DRSJ8',  calculatedAmt: '742.8800000000',    calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS001', screenId: 'DRSG', applicationScreenTabId: 'SDU', lineDetails: 'DRSJ9',  calculatedAmt: '3727.8800000000',   calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS001', screenId: 'DRSG', applicationScreenTabId: 'SDU', lineDetails: 'DRSJ10', calculatedAmt: '0.5000000000',      calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS001', screenId: 'DRSG', applicationScreenTabId: 'SDU', lineDetails: 'DRSJ11', calculatedAmt: 'Pass Rule',          calculatedValue: '' },

    { applicationId: 'APP001', customerId: 'CUS001', screenId: 'DRSG', applicationScreenTabId: 'MBD', lineDetails: 'DRSJ4',  calculatedAmt: '1394.0000000000',   calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS001', screenId: 'DRSG', applicationScreenTabId: 'MBD', lineDetails: 'DRSJ14', calculatedAmt: '7400.0000000000',   calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS001', screenId: 'DRSG', applicationScreenTabId: 'MBD', lineDetails: 'DRSJ15', calculatedAmt: '2610.0000000000',   calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS001', screenId: 'DRSG', applicationScreenTabId: 'MBD', lineDetails: 'DRSJ16', calculatedAmt: '742.8800000000',    calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS001', screenId: 'DRSG', applicationScreenTabId: 'MBD', lineDetails: 'DRSJ17', calculatedAmt: '188.0000000000',    calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS001', screenId: 'DRSG', applicationScreenTabId: 'MBD', lineDetails: 'DRSJ18', calculatedAmt: '3540.8800000000',   calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS001', screenId: 'DRSG', applicationScreenTabId: 'MBD', lineDetails: 'DRSJ19', calculatedAmt: '0.5000000000',      calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS001', screenId: 'DRSG', applicationScreenTabId: 'MBD', lineDetails: 'DRSJ20', calculatedAmt: 'Pass Rule',          calculatedValue: '' },

    { applicationId: 'APP001', customerId: 'CUS001', screenId: 'DRSG', applicationScreenTabId: 'SDI', lineDetails: 'DRSJ4',  calculatedAmt: '1394.0000000000',   calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS001', screenId: 'DRSG', applicationScreenTabId: 'SDI', lineDetails: 'DRSJ23', calculatedAmt: '98500.0000000000',  calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS001', screenId: 'DRSG', applicationScreenTabId: 'SDI', lineDetails: 'DRSJ24', calculatedAmt: '8208.3300000000',   calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS001', screenId: 'DRSG', applicationScreenTabId: 'SDI', lineDetails: 'DRSJ25', calculatedAmt: '2610.0000000000',   calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS001', screenId: 'DRSG', applicationScreenTabId: 'SDI', lineDetails: 'DRSJ26', calculatedAmt: '1455.6700000000',   calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS001', screenId: 'DRSG', applicationScreenTabId: 'SDI', lineDetails: 'DRSJ27', calculatedAmt: '742.8800000000',    calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS001', screenId: 'DRSG', applicationScreenTabId: 'SDI', lineDetails: 'DRSJ28', calculatedAmt: '375.0000000000',    calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS001', screenId: 'DRSG', applicationScreenTabId: 'SDI', lineDetails: 'DRSJ29', calculatedAmt: '2573.5500000000',   calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS001', screenId: 'DRSG', applicationScreenTabId: 'SDI', lineDetails: 'DRSJ30', calculatedAmt: '0.5000000000',      calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS001', screenId: 'DRSG', applicationScreenTabId: 'SDI', lineDetails: 'DRSJ31', calculatedAmt: 'Fail Rule',          calculatedValue: '' },
  ],

  // Owner – Alex Johnson
  CUS002: [
    { applicationId: 'APP001', customerId: 'CUS002', screenId: 'DRSG', applicationScreenTabId: 'SDU', lineDetails: 'DRSJ12', calculatedAmt: '200000.0000000000', calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS002', screenId: 'DRSG', applicationScreenTabId: 'SDU', lineDetails: 'DRSJ4',  calculatedAmt: '1800.0000000000',   calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS002', screenId: 'DRSG', applicationScreenTabId: 'SDU', lineDetails: 'DRSJ5',  calculatedAmt: '6500.0000000000',   calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS002', screenId: 'DRSG', applicationScreenTabId: 'SDU', lineDetails: 'DRSJ6',  calculatedAmt: '1800.0000000000',   calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS002', screenId: 'DRSG', applicationScreenTabId: 'SDU', lineDetails: 'DRSJ7',  calculatedAmt: '250.0000000000',    calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS002', screenId: 'DRSG', applicationScreenTabId: 'SDU', lineDetails: 'DRSJ8',  calculatedAmt: '150.0000000000',    calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS002', screenId: 'DRSG', applicationScreenTabId: 'SDU', lineDetails: 'DRSJ9',  calculatedAmt: '2200.0000000000',   calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS002', screenId: 'DRSG', applicationScreenTabId: 'SDU', lineDetails: 'DRSJ10', calculatedAmt: '0.5000000000',      calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS002', screenId: 'DRSG', applicationScreenTabId: 'SDU', lineDetails: 'DRSJ11', calculatedAmt: 'Pass Rule',          calculatedValue: '' },

    { applicationId: 'APP001', customerId: 'CUS002', screenId: 'DRSG', applicationScreenTabId: 'MBD', lineDetails: 'DRSJ4',  calculatedAmt: '1800.0000000000',   calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS002', screenId: 'DRSG', applicationScreenTabId: 'MBD', lineDetails: 'DRSJ14', calculatedAmt: '6200.0000000000',   calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS002', screenId: 'DRSG', applicationScreenTabId: 'MBD', lineDetails: 'DRSJ15', calculatedAmt: '1800.0000000000',   calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS002', screenId: 'DRSG', applicationScreenTabId: 'MBD', lineDetails: 'DRSJ16', calculatedAmt: '150.0000000000',    calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS002', screenId: 'DRSG', applicationScreenTabId: 'MBD', lineDetails: 'DRSJ17', calculatedAmt: '125.0000000000',    calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS002', screenId: 'DRSG', applicationScreenTabId: 'MBD', lineDetails: 'DRSJ18', calculatedAmt: '2075.0000000000',   calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS002', screenId: 'DRSG', applicationScreenTabId: 'MBD', lineDetails: 'DRSJ19', calculatedAmt: '0.5000000000',      calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS002', screenId: 'DRSG', applicationScreenTabId: 'MBD', lineDetails: 'DRSJ20', calculatedAmt: 'Pass Rule',          calculatedValue: '' },

    { applicationId: 'APP001', customerId: 'CUS002', screenId: 'DRSG', applicationScreenTabId: 'SDI', lineDetails: 'DRSJ4',  calculatedAmt: '1800.0000000000',   calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS002', screenId: 'DRSG', applicationScreenTabId: 'SDI', lineDetails: 'DRSJ23', calculatedAmt: '78000.0000000000',  calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS002', screenId: 'DRSG', applicationScreenTabId: 'SDI', lineDetails: 'DRSJ24', calculatedAmt: '6500.0000000000',   calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS002', screenId: 'DRSG', applicationScreenTabId: 'SDI', lineDetails: 'DRSJ25', calculatedAmt: '1800.0000000000',   calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS002', screenId: 'DRSG', applicationScreenTabId: 'SDI', lineDetails: 'DRSJ26', calculatedAmt: '950.0000000000',    calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS002', screenId: 'DRSG', applicationScreenTabId: 'SDI', lineDetails: 'DRSJ27', calculatedAmt: '150.0000000000',    calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS002', screenId: 'DRSG', applicationScreenTabId: 'SDI', lineDetails: 'DRSJ28', calculatedAmt: '250.0000000000',    calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS002', screenId: 'DRSG', applicationScreenTabId: 'SDI', lineDetails: 'DRSJ29', calculatedAmt: '3150.0000000000',   calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS002', screenId: 'DRSG', applicationScreenTabId: 'SDI', lineDetails: 'DRSJ30', calculatedAmt: '0.5000000000',      calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS002', screenId: 'DRSG', applicationScreenTabId: 'SDI', lineDetails: 'DRSJ31', calculatedAmt: 'Pass Rule',          calculatedValue: '' },
  ],

  // Owner – Maria Garcia
  CUS003: [
    { applicationId: 'APP001', customerId: 'CUS003', screenId: 'DRSG', applicationScreenTabId: 'SDU', lineDetails: 'DRSJ12', calculatedAmt: '300000.0000000000', calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS003', screenId: 'DRSG', applicationScreenTabId: 'SDU', lineDetails: 'DRSJ4',  calculatedAmt: '3200.0000000000',   calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS003', screenId: 'DRSG', applicationScreenTabId: 'SDU', lineDetails: 'DRSJ5',  calculatedAmt: '9100.0000000000',   calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS003', screenId: 'DRSG', applicationScreenTabId: 'SDU', lineDetails: 'DRSJ6',  calculatedAmt: '3200.0000000000',   calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS003', screenId: 'DRSG', applicationScreenTabId: 'SDU', lineDetails: 'DRSJ7',  calculatedAmt: '400.0000000000',    calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS003', screenId: 'DRSG', applicationScreenTabId: 'SDU', lineDetails: 'DRSJ8',  calculatedAmt: '200.0000000000',    calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS003', screenId: 'DRSG', applicationScreenTabId: 'SDU', lineDetails: 'DRSJ9',  calculatedAmt: '3800.0000000000',   calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS003', screenId: 'DRSG', applicationScreenTabId: 'SDU', lineDetails: 'DRSJ10', calculatedAmt: '0.5000000000',      calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS003', screenId: 'DRSG', applicationScreenTabId: 'SDU', lineDetails: 'DRSJ11', calculatedAmt: 'Pass Rule',          calculatedValue: '' },

    { applicationId: 'APP001', customerId: 'CUS003', screenId: 'DRSG', applicationScreenTabId: 'MBD', lineDetails: 'DRSJ4',  calculatedAmt: '3200.0000000000',   calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS003', screenId: 'DRSG', applicationScreenTabId: 'MBD', lineDetails: 'DRSJ14', calculatedAmt: '8800.0000000000',   calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS003', screenId: 'DRSG', applicationScreenTabId: 'MBD', lineDetails: 'DRSJ15', calculatedAmt: '3200.0000000000',   calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS003', screenId: 'DRSG', applicationScreenTabId: 'MBD', lineDetails: 'DRSJ16', calculatedAmt: '200.0000000000',    calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS003', screenId: 'DRSG', applicationScreenTabId: 'MBD', lineDetails: 'DRSJ17', calculatedAmt: '200.0000000000',    calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS003', screenId: 'DRSG', applicationScreenTabId: 'MBD', lineDetails: 'DRSJ18', calculatedAmt: '3600.0000000000',   calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS003', screenId: 'DRSG', applicationScreenTabId: 'MBD', lineDetails: 'DRSJ19', calculatedAmt: '0.5000000000',      calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS003', screenId: 'DRSG', applicationScreenTabId: 'MBD', lineDetails: 'DRSJ20', calculatedAmt: 'Pass Rule',          calculatedValue: '' },

    { applicationId: 'APP001', customerId: 'CUS003', screenId: 'DRSG', applicationScreenTabId: 'SDI', lineDetails: 'DRSJ4',  calculatedAmt: '3200.0000000000',   calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS003', screenId: 'DRSG', applicationScreenTabId: 'SDI', lineDetails: 'DRSJ23', calculatedAmt: '109200.0000000000', calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS003', screenId: 'DRSG', applicationScreenTabId: 'SDI', lineDetails: 'DRSJ24', calculatedAmt: '9100.0000000000',   calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS003', screenId: 'DRSG', applicationScreenTabId: 'SDI', lineDetails: 'DRSJ25', calculatedAmt: '3200.0000000000',   calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS003', screenId: 'DRSG', applicationScreenTabId: 'SDI', lineDetails: 'DRSJ26', calculatedAmt: '1800.0000000000',   calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS003', screenId: 'DRSG', applicationScreenTabId: 'SDI', lineDetails: 'DRSJ27', calculatedAmt: '200.0000000000',    calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS003', screenId: 'DRSG', applicationScreenTabId: 'SDI', lineDetails: 'DRSJ28', calculatedAmt: '400.0000000000',    calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS003', screenId: 'DRSG', applicationScreenTabId: 'SDI', lineDetails: 'DRSJ29', calculatedAmt: '5600.0000000000',   calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS003', screenId: 'DRSG', applicationScreenTabId: 'SDI', lineDetails: 'DRSJ30', calculatedAmt: '0.5000000000',      calculatedValue: '' },
    { applicationId: 'APP001', customerId: 'CUS003', screenId: 'DRSG', applicationScreenTabId: 'SDI', lineDetails: 'DRSJ31', calculatedAmt: 'Fail Rule',          calculatedValue: '' },
  ],
};

@Injectable({ providedIn: 'root' })
export class LimitCalculatorService {
  getCalculatorData(_applicationId: any, customerId: any): Observable<any> {
    return of(MOCK_DB[customerId] ?? []);
  }
}
