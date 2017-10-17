import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Invoice } from './invoice.model';
import { Constants } from '../shared/commons';
import { AlertService } from '../core/alert.service';
import { InvoiceService } from './invoice.service';
import { SearchService } from '../core/search.service';

@Component({
    moduleId: module.id,
    selector: 'app-invoice',
    templateUrl: 'invoice.component.html'
})

export class InvoiceComponent implements OnInit {
    public invoices: Invoice[];
    public invoice: Invoice;
    public edit = false;
    public newInvoice = false;
    public invoiceValidationEnabled = true;

    constructor(private invoiceService: InvoiceService,
        private alertService: AlertService,
        private searchService: SearchService,
        private translateService: TranslateService) { }

    ngOnInit() {
        this.searchService.searchText = '';
        this.Load();
    }

    public Load() {
        this.alertService.isLoading = false;

        this.invoiceService.GetAll().subscribe(
            (data: Invoice[]) => {
                this.alertService.isLoading = false;
                this.invoices = this.invoiceService.Map(data);
                this.invoice = null;
                this.translateService.get('INVOICESLOADED').subscribe((res: string) => {
                    this.alertService.Success(res);
                });
            },
            (error) => this.alertService.Error(error));
    }

    public New() {
        const newInvoice: Invoice = {
            Id: Constants.guidEmpty,
            IdAttachment: '',
            IdCustomer: '',
            Year: (new Date()).getFullYear(),
            EmissionDate: new Date(),
            DueDate: new Date(),
            Customer: null
        };

        this.invoice = newInvoice;
        this.newInvoice = true;
        this.invoiceValidationEnabled = true;
        this.edit = true;
    }

    public Edit(invoice: Invoice) {
        this.invoice = invoice;
        this.newInvoice = false;
        this.invoiceValidationEnabled = true;
        this.edit = true;
    }

    onClosed(invoice: Invoice) {
        this.invoice = invoice;
        this.invoiceValidationEnabled = false;
        this.edit = false;

        this.Load();
    }

    onDeleted(invoice: Invoice) {
        this.invoices.splice(this.invoices.indexOf(this.invoice), 1);
        this.edit = false;
    }
}
