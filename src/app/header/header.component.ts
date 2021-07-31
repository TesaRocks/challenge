import {
  Component,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
  AfterContentChecked,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IApplicationState } from '../application-state';
import { updateHeaderSelector } from './ngrx/header.selectors';
import { updateHeader } from './ngrx/header.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, AfterContentChecked, OnDestroy {
  headerSub!: Subscription;
  header!: string;
  backArrow!: boolean;
  hasAddButton!: boolean;

  constructor(
    private store: Store<IApplicationState>,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.headerSub = this.store
      .select(updateHeaderSelector)
      .subscribe((headerFromStore) => {
        this.header = headerFromStore;
        this.hasBackArrowRoute(this.header);
      });
  }
  ngAfterContentChecked(): void {
    this.cd.detectChanges();
  }
  hasBackArrowRoute(header: string) {
    switch (header) {
      case 'My projects':
        this.backArrow = false;
        this.hasAddButton = true;
        break;
      case 'Add project':
        this.backArrow = true;
        this.hasAddButton = false;
        break;
      case 'Edit project':
        this.backArrow = true;
        this.hasAddButton = false;
        break;
    }
  }
  onAdd() {
    this.store.dispatch(updateHeader({ updatedHeader: 'Add project' }));
    this.router.navigate(['/projects/new']);
  }
  onBack() {
    this.store.dispatch(updateHeader({ updatedHeader: 'My projects' }));
    this.router.navigate(['/projects']);
  }
  ngOnDestroy() {
    this.headerSub.unsubscribe();
  }
}
