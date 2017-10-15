import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule, provideRoutes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    TranslateModule.forRoot(),
    CoreModule.forRoot(),
    SharedModule,
    RouterModule.forRoot([
      {
          path: '',
          redirectTo: 'customers',
          pathMatch: 'full'
      },
      {
          path: 'customers',
          loadChildren: 'app/customer/customer.module#CustomerModule'
      },
      {
          path: 'invoices',
          loadChildren: 'app/invoice/invoice.module#InvoiceModule'
      },
    ]),
    BrowserAnimationsModule
  ],
  exports: [
    RouterModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
