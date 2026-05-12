import { Routes } from '@angular/router';
import { LimitCalculator } from './limit-calculator/limit-calculator';

export const routes: Routes = [
  { path: '', redirectTo: 'limit-calculator', pathMatch: 'full' },
  { path: 'limit-calculator', component: LimitCalculator },
];
