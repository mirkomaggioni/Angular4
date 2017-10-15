import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from './core/alert.service';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public onLoading = true;
  private viewContainerRef: ViewContainerRef;

  constructor (translateService: TranslateService, viewContainerRef: ViewContainerRef, private alertService: AlertService) {
      translateService.setDefaultLang('en');
      translateService.use('en');
      this.viewContainerRef = viewContainerRef;
      this.alertService.SetViewContainerRef(this.viewContainerRef);
  }

  ngOnInit() {
      this.alertService.onLoading.subscribe((onLoading: boolean) => {
         this.onLoading = onLoading;
      });
  }
}
