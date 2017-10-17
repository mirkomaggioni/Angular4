import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Invoice } from './invoice.model';
import { WebApi } from '../shared/webapi';
import * as moment from 'moment';

@Injectable()
export class InvoiceService extends WebApi<Invoice>  {
    constructor(public http: Http) {
        super('/api/invoices', http);
    }

    public Map(invoices: Invoice[]): Invoice[] {
        const mappedInvoices = new Array<Invoice>();
        invoices.forEach(invoice => {
            if (invoice.EmissionDate !== null) {
                invoice.EmissionDate = moment(invoice.EmissionDate).toDate();
            }

            if (invoice.DueDate != null) {
                invoice.DueDate = moment(invoice.DueDate).toDate();
            }

            if (invoice.PaymentDate != null) {
                invoice.PaymentDate = moment(invoice.PaymentDate).toDate();
            }

            mappedInvoices.push(invoice);
        });

        return mappedInvoices;
    }
}
