import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IEmployee } from '../employee.interface';
import { loadEmployees } from '../ngrx/employee.actions';

export const employeeFeatureKey = 'employeeState';

export interface IEmployeeInitialState extends EntityState<IEmployee> {
  // additional entities state properties
  error: any;
  loadEmployeesPending: boolean;
}
export const adapter: EntityAdapter<IEmployee> =
  createEntityAdapter<IEmployee>();

export const employeeInitialState: IEmployeeInitialState =
  adapter.getInitialState({
    // additional entity state properties
    error: null,
    loadEmployeesPending: false,
  });

export const reducer = createReducer(
  employeeInitialState,
  // Load employees
  on(loadEmployees.begin, (state) => {
    return { ...state, loadEmployeesPending: true };
  }),
  on(loadEmployees.success, (state, action) => {
    return {
      ...adapter.setAll(action.employees, state),
      loadEmployeesPending: false,
    };
  }),
  on(loadEmployees.failure, (state, action) => {
    return {
      ...state,
      loadEmployeesPending: false,
      error: action.error,
    };
  })
);
export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
