import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'challenge';
  @HostListener('window:popstate', ['$event'])
  onPopState(event: any) {
    location.reload();
  }
}
