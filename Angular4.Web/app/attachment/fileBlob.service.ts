import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { FileBlob } from './fileBlob.model';
import { WebApi } from '../shared/webapi';

@Injectable()
export class FileBlobService extends WebApi<FileBlob> {
    constructor(public http: Http) {
        super('/api/fileBlobs', http);
    }

    public DownloadFile(id: string) {
        window.open('api/fileBlobs/GetFileBlob?id=' + id, '_blank');
    }

    public PostFile(entity: File): Observable<File> {
        const formData = new FormData();
        formData.append(entity.name, entity);

        return this.http.post(this.url, formData).map(this.extractData).catch(this.handleError);
    }
}
