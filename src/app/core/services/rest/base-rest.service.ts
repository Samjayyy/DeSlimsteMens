import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { RequestUtils } from '../../util/request-utils';
import { RESTSuccess, FindOneResponse, FindResponse } from '../../../shared/responses/findresponse';

export interface RequestOptions {
  subPath?: string;
  params?: HttpParams;
  body?: any;
}

export class BaseService {
  protected readonly apiPrefix: string = RequestUtils.joinWithSlash(environment.host, environment.apiPrefix);
  protected http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }
  protected getHttpOptions(options: RequestOptions) {
    return Object.assign(
      {
        params: options.params,
        body: options.body,
      },
      { withCredentials: true }
    );
  }

  protected getHeaders() {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return headers;
  }
}

/**
 * Service for one simple entity
 */
export class BaseEntityService extends BaseService {
  constructor(http: HttpClient, private readonly path = '') {
    super(http);
  }

  public find<T>(
    options: RequestOptions = {},
  ): Observable<FindOneResponse<T>> {
    return this.http.get<FindOneResponse<T>>(
      RequestUtils.joinWithSlash(this.getUrl(), options.subPath),
      this.getHttpOptions(options)
    );
  }

  public update(
    model: any,
    options: RequestOptions = {},
  ): Observable<RESTSuccess> {
    return this.http.post<RESTSuccess>(
      RequestUtils.joinWithSlash(this.getUrl(), options.subPath),
      model,
      this.getHttpOptions(options),
    );
  }

  private getUrl(): string {
    return RequestUtils.joinWithSlash(this.apiPrefix, this.path);
  }
}

export class BaseListService extends BaseService {
  constructor(http: HttpClient, private readonly parentpath: string, private readonly entitypath: string) {
    super(http);
  }

  public find<T>(
    options: RequestOptions = {}
  ): Observable<FindResponse<T>> {
    return this.http.get<FindResponse<T>>(RequestUtils.joinWithSlash(this.getUrl(), options.subPath),
      this.getHttpOptions(options),
    );
  }

  public findFor<T>(
    parentId: (number | string),
    options: RequestOptions = {},
  ): Observable<FindResponse<T>> {
    return this.http.get<FindResponse<T>>(RequestUtils.joinWithSlash(this.getUrl(parentId), options.subPath),
      this.getHttpOptions(options),
    );
  }

  public save<T = RESTSuccess>(
    models: any[],
    options: RequestOptions = {}
  ) {
    return this.http.post<T>(
      RequestUtils.joinWithSlash(this.getUrl(), options.subPath),
      models,
      this.getHttpOptions(options)
    );
  }

  public saveFor<T = RESTSuccess>(
    parentId: (number | string),
    models: any[],
    options: RequestOptions = {}
  ) {
    return this.http.post<T>(
      RequestUtils.joinWithSlash(this.getUrl(parentId), options.subPath),
      models,
      this.getHttpOptions(options)
    );
  }

  private getUrl(parentId?: any): string {
    return RequestUtils.joinWithSlash(this.apiPrefix, this.parentpath, parentId, this.entitypath);
  }
}

export class BaseRestService extends BaseService {
  constructor(http: HttpClient, private readonly path = '') {
    super(http);
  }

  public create<T = RESTSuccess>(
    model: any,
    options: RequestOptions = {},
  ): Observable<T> {
    return this.http.post<T>(
      RequestUtils.joinWithSlash(this.getUrl(), options.subPath),
      model,
      this.getHttpOptions(options),
    );
  }

  public find<T>(options: RequestOptions = {}): Observable<FindResponse<T>> {
    return this.http.get<FindResponse<T>>(
      RequestUtils.joinWithSlash(this.getUrl(), options.subPath),
      this.getHttpOptions(options),
    );
  }

  public findOne<T>(
    id: (number | string),
    options: RequestOptions = {},
  ): Observable<FindOneResponse<T>> {
    return this.http.get<FindOneResponse<T>>(
      RequestUtils.joinWithSlash(this.getUrl(id), options.subPath),
      this.getHttpOptions(options),
    );
  }

  public update(
    id: (number | string),
    model: any,
    options: RequestOptions = {},
  ): Observable<RESTSuccess> {
    return this.http.post<RESTSuccess>(
      RequestUtils.joinWithSlash(this.getUrl(id), options.subPath),
      model,
      this.getHttpOptions(options),
    );
  }

  public delete(
    id: (number | string),
    options: RequestOptions = {},
  ): Observable<RESTSuccess> {
    const httpOptions = this.getHttpOptions(options);
    return this.http.delete<RESTSuccess>(
      RequestUtils.joinWithSlash(this.getUrl(id), options.subPath),
      httpOptions,
    );
  }

  private getUrl(id?: any): string {
    return RequestUtils.joinWithSlash(this.apiPrefix, this.path, id);
  }
}
