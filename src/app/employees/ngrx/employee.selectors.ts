import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  IEmployeeInitialState,
  employeeFeatureKey,
  selectAll,
} from './employee.reducer';

export const selectEmployeeState =
  createFeatureSelector<IEmployeeInitialState>(employeeFeatureKey);

export const selectEmployees = createSelector(selectEmployeeState, selectAll);
