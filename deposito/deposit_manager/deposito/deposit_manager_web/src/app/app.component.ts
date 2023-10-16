import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, inject } from '@angular/core';
import { map, shareReplay } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-root',
  templateUrl: "app.component.html",
  styleUrls: ['app.component.css']
})
export class AppComponent {
  title = 'deposit_manager_web';
  private breakpointObserver = inject(BreakpointObserver);
  // nav.component.ts
  menuItems = ["dashboard", "sales", "orders", "customers", "products"];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
}
