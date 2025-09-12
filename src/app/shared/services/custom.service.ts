import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { URL } from '../../url-config';
import { endpointPaths, EndpointKey } from '../../endpoints'; 

@Injectable({
  providedIn: 'root'
})
export class CustomService {

  private readonly url = URL; 
  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private constructUrl(endpoint: EndpointKey, params?: Record<string, any>): string {
    const path = endpointPaths[endpoint];
    let urlWithBase = `${this.url}/${path}`;
    
    if (params) {
      const queryString = new HttpParams({ fromObject: params }).toString();
      urlWithBase += `?${queryString}`;
    }

    // console.log('Resolved URL:', urlWithBase);
    return urlWithBase;
  }

  constructor(private http: HttpClient) {}

  getVisitorTypes(params?: Record<string, any>) {
    return this.http.get(this.constructUrl('_urlgetVisitorType', params), this.httpOptions);
  }

  getProperties(params?: Record<string, any>) {
    return this.http.get(this.constructUrl('_urlgetProperties', params), this.httpOptions);
  }

  getUserByProperty(propID: number) {
    return this.http.get(this.constructUrl('_urlusersbyProp', {propID}), this.httpOptions)
  }

}
