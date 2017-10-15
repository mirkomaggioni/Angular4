import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export class WebApi<T> {
    protected url: string;
    protected options: RequestOptions;

    constructor(url: string, public http: Http) {
        this.url = url;
        const headers = new Headers({ 'Content-Type': 'application/json' });
        this.options = new RequestOptions({ headers: headers });
    }

    public GetAll(): Observable<T[]> {
        return this.http.get(this.url, this.options).map(this.extractData).catch(this.handleError);
    }

    public Get(id: string): Observable<T> {
        return this.http.get(this.url + '/' + id, this.options).map(this.extractData).catch(this.handleError);
    }

    public Put(id: string, entity: T): Observable<boolean> {
        const request = this.http.put(this.url + '/' + id, JSON.stringify(entity), this.options);
        return request.map(this.extractResponseStatus).catch(this.handleError);
    }

    public Post(entity: T): Observable<T> {
        const request = this.http.post(this.url, JSON.stringify(entity), this.options);
        return request.map(this.extractData).catch(this.handleError);
    }

    public Delete(id: string): Observable<boolean> {
        const request = this.http.delete(this.url + '/' + id, this.options);
        return request.map(this.extractResponseStatus).catch(this.handleError);
    }

    protected extractData(res: Response) {
        const body = res.json();
        return body || {};
    }

    protected handleError(error: any) {
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

    private extractResponseStatus(res: Response) {
        return res.ok;
    }
}
