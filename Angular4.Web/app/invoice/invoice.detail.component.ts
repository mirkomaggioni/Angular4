import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Constants } from '../shared/commons';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import { Attachment } from '../attachment/attachment.model';
import { Customer } from '../customer/customer.model';
import { Invoice } from './invoice.model';
import { AlertService } from '../core/alert.service';
import { AttachmentService } from '../attachment/attachment.service';
import { CustomerService } from '../customer/customer.service';
import { InvoiceService } from './invoice.service';

@Component({
    moduleId: module.id,
    selector: 'app-invoice-detail',
    templateUrl: 'invoice.detail.component.html'
})

export class InvoiceDetailComponent implements OnInit {
    @Input() isNew: boolean;
    @Input() validationEnabled: boolean;
    @Output() onClosed = new EventEmitter<Invoice>();
    @Output() onDeleted = new EventEmitter<Invoice>();
    public attachment: Attachment;
    public customers: Customer[];
    private currentInvoice: Invoice;
    private originalInvoice: Invoice;

    @Input()
    set invoice(invoice: Invoice) {
        this.currentInvoice = invoice;
        this.backupInvoice(this.currentInvoice);

        if (this.invoice.IdAttachment !== '') {
            this.attachmentService.Get(this.invoice.IdAttachment).subscribe(
                (res: Attachment) => {
                    this.attachment = res;
                },
                (error) => this.alertService.Error(error));
        } else {
            this.attachment = null;
        }
    }

    get invoice() {
        return this.currentInvoice;
    }

    constructor(private attachmentService: AttachmentService,
        private customerService: CustomerService,
        private invoiceService: InvoiceService,
        private alertService: AlertService,
        private translateService: TranslateService) { }

    ngOnInit() {
        this.LoadCustomers();
    }

    public Save() {
        if (this.isNew) {

            this.attachmentService.Post(this.attachment).subscribe(
                (attachment) => {
                    this.attachment = attachment;
                    this.invoice.IdAttachment = this.attachment.Id;

                    this.invoiceService.Post(this.invoice).subscribe(
                        (invoice) => {
                            this.invoice = invoice;

                            this.translateService.get('INVOICESAVED').subscribe((res: string) => {
                                this.alertService.Success(res);
                            });
                        },
                        (error) => this.alertService.Error(error));
                },
                (error) => this.alertService.Error(error));
        } else {
            Observable.forkJoin(
                this.attachmentService.Put(this.attachment.Id, this.attachment),
                this.invoiceService.Put(this.invoice.Id, this.invoice)
            ).subscribe((res) => {
                this.backupInvoice(this.invoice);
                this.translateService.get('INVOICESAVED').subscribe((translation: string) => {
                    this.alertService.Success(translation);
                });
            },
            (error) => this.alertService.Error(error));
        }
    }

    public Close() {
        this.restoreInvoice();
        this.onClosed.emit(this.invoice);
    }

    public Delete() {
        this.invoiceService.Delete(this.invoice.Id).subscribe(
            (res) => {
                this.attachmentService.Delete(this.attachment.Id).subscribe(
                    (result) => {
                        this.translateService.get('INVOICEDELETED').subscribe((translation: string) => {
                            this.alertService.Success(translation);
                        });
                        this.onDeleted.emit(this.invoice);
                    },
                    (error) => this.alertService.Error(error));
            },
            (error) => this.alertService.Error(error));
    }

    public onAttachmentSaved(attachment: Attachment) {
        this.attachment = attachment;
    }

    public onEmissionDateSelected(date: Date) {
        this.invoice.EmissionDate = date;
    }

    public onDueDateSelected(date: Date) {
        this.invoice.DueDate = date;
    }

    public onPaymentDateSelected(date: Date) {
        this.invoice.PaymentDate = date;
    }

    private backupInvoice(invoice: Invoice) {
        this.originalInvoice = _.cloneDeep(invoice);
    }

    private restoreInvoice() {
        this.currentInvoice = _.mapValues(this.originalInvoice, function(value) {
            return value;
        });
    }

    private LoadCustomers() {
        this.customerService.GetAll().subscribe(
            (data: Customer[]) => {
                this.customers = data;
            },
            (error) => this.alertService.Error(error));
    }
}

