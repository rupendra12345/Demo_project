import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(private http:HttpClient) { }

   getDrivers(
    offset: any,
    search: string,
  
  ) {
    let path = `https://apis.fretron.com/shipment-view/drivers/drivers?limit=50`;
    let headers = new HttpHeaders({
      Authorization:
      `Bearer ` +
      `eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MzQ3MjM0MTYsInVzZXJJZCI6IjdkZWYyMjNiLWRhNmMtNDVlMS1iMjYxLTY1ZDAyNzQyNGU0MCIsImVtYWlsIjoicnVwZW5kcmEuY2hhdWhhbkBmcmV0cm9uLmNvbSIsIm1vYmlsZU51bWJlciI6Ijg5MjA3OTY3MTUiLCJvcmdJZCI6ImMyNGY3YzkxLTMwYmEtNDUzMy1iODZkLTllY2E2NDRlNjYwNSIsIm5hbWUiOiJSdXBlbmRyYSBjaGF1aGFuIiwib3JnVHlwZSI6IkZMRUVUX09XTkVSIiwiaXNHb2QiOmZhbHNlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.ghh1zUZUfJfsIr87hDZvsf2gKtvskZA4054dvPRSNfM`,
  });

    if (offset) {
      path = `${path}&from=${encodeURIComponent(
        JSON.stringify([offset])
      )}`;
    } 
    if (search) {
      path = `${path}&search=${encodeURIComponent(search)}`;
    }

    // if (isCount) {
    //   path = `${path}&isCount=${isCount}`;
    // }

    // if (filters) {
    //   path = `${path}&filters=${encodeURIComponent(JSON.stringify(filters))}`;
    // }

    return this.http.get(path,{
      headers: headers,
    });
  }
}
