import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { MatSnackBarConfig, MatSnackBar } from "@angular/material/snack-bar";
@Injectable({
  providedIn: 'root',
})
export class BusinessPartnerService {
  private sharedBusinessPartnerSetting$ = new ReplaySubject<any>(1);
  public snackBar: MatSnackBar
  constructor(private httpClient: HttpClient) {}
  url: 'https://apis.fretron.com/business-partners/v2/settings/customFields';

  addCustomField(customField: any) {
    

    let headers = new HttpHeaders({
      Authorization:
        'Bearer ' +
        'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MzExODExMDEsInVzZXJJZCI6IjdkZWYyMjNiLWRhNmMtNDVlMS1iMjYxLTY1ZDAyNzQyNGU0MCIsImVtYWlsIjoicnVwZW5kcmEuY2hhdWhhbkBmcmV0cm9uLmNvbSIsIm1vYmlsZU51bWJlciI6IjkxNDkwOTg3NTIiLCJvcmdJZCI6ImMyNGY3YzkxLTMwYmEtNDUzMy1iODZkLTllY2E2NDRlNjYwNSIsIm5hbWUiOiJSdXBlbmRyYSBjaGF1aGFuIiwib3JnVHlwZSI6IkZMRUVUX09XTkVSIiwiaXNHb2QiOmZhbHNlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.BxWUGOPhwgEpZQxDp0SRAvnqH9auMWCaAFTnTIvT2LA',
    });
    return this.httpClient.post(
      'https://apis.fretron.com/business-partners/v2/settings/customFields',
      customField,
      {
        headers: headers,
      }
    );
  }
  getCustomFields() {
    let getUrl = `https://apis.fretron.com/business-partners/v2/settings/customFields?limit=10&offset=${
      0
    }`;
    let headers = new HttpHeaders({
      Authorization:
        'Bearer ' +
        'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MzExODExMDEsInVzZXJJZCI6IjdkZWYyMjNiLWRhNmMtNDVlMS1iMjYxLTY1ZDAyNzQyNGU0MCIsImVtYWlsIjoicnVwZW5kcmEuY2hhdWhhbkBmcmV0cm9uLmNvbSIsIm1vYmlsZU51bWJlciI6IjkxNDkwOTg3NTIiLCJvcmdJZCI6ImMyNGY3YzkxLTMwYmEtNDUzMy1iODZkLTllY2E2NDRlNjYwNSIsIm5hbWUiOiJSdXBlbmRyYSBjaGF1aGFuIiwib3JnVHlwZSI6IkZMRUVUX09XTkVSIiwiaXNHb2QiOmZhbHNlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.BxWUGOPhwgEpZQxDp0SRAvnqH9auMWCaAFTnTIvT2LA',
    });
    return this.httpClient.get(getUrl,{
      headers: headers,
    });
  }

  fetchCfDetails(uuid: string) {
    let path = `https://apis.fretron.com/business-partners/v2/setting/custom-field/${uuid}`;
    let headers = new HttpHeaders({
      Authorization:
        'Bearer ' +
        'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MzExODExMDEsInVzZXJJZCI6IjdkZWYyMjNiLWRhNmMtNDVlMS1iMjYxLTY1ZDAyNzQyNGU0MCIsImVtYWlsIjoicnVwZW5kcmEuY2hhdWhhbkBmcmV0cm9uLmNvbSIsIm1vYmlsZU51bWJlciI6IjkxNDkwOTg3NTIiLCJvcmdJZCI6ImMyNGY3YzkxLTMwYmEtNDUzMy1iODZkLTllY2E2NDRlNjYwNSIsIm5hbWUiOiJSdXBlbmRyYSBjaGF1aGFuIiwib3JnVHlwZSI6IkZMRUVUX09XTkVSIiwiaXNHb2QiOmZhbHNlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.BxWUGOPhwgEpZQxDp0SRAvnqH9auMWCaAFTnTIvT2LA',
    });
    return this.httpClient.get(path,{
      headers: headers,
    });
  }
  //https://apis.fretron.com/business-partners/v2/settings/grouped-profile
  businessPartnerSetting() {
    console.log("servcie")
    let path = `https://apis.fretron.com/business-partners/v2/settings/grouped-profile`
    let headers = new HttpHeaders({
      Authorization:
        `Bearer ` +
        `eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MzQ3MjM0MTYsInVzZXJJZCI6IjdkZWYyMjNiLWRhNmMtNDVlMS1iMjYxLTY1ZDAyNzQyNGU0MCIsImVtYWlsIjoicnVwZW5kcmEuY2hhdWhhbkBmcmV0cm9uLmNvbSIsIm1vYmlsZU51bWJlciI6Ijg5MjA3OTY3MTUiLCJvcmdJZCI6ImMyNGY3YzkxLTMwYmEtNDUzMy1iODZkLTllY2E2NDRlNjYwNSIsIm5hbWUiOiJSdXBlbmRyYSBjaGF1aGFuIiwib3JnVHlwZSI6IkZMRUVUX09XTkVSIiwiaXNHb2QiOmZhbHNlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.ghh1zUZUfJfsIr87hDZvsf2gKtvskZA4054dvPRSNfM`,
    });
    console.log(headers,path)
    return this.httpClient.get(path,{
      headers: headers,
    });
  }
  openSnackBar(message: string, duration: number = 8000) {
    this.snackBar.open(message, "OK", <MatSnackBarConfig>{
      duration: duration,
    });
  }
  setPartnerSetting(partnerObj: any) {
    console.log(partnerObj)
    this.sharedBusinessPartnerSetting$.next(partnerObj);
  }
  getPartnerSetting(): Observable<any> {
    return this.sharedBusinessPartnerSetting$.asObservable();
  }
  getUniquenessContraints() {
    let path = `https://apis.fretron.com/business-partners/v2/settings/suggest-uniqueness-constraint`
    let headers = new HttpHeaders({
      Authorization:
      `Bearer ` +
      `eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MzQ3MjM0MTYsInVzZXJJZCI6IjdkZWYyMjNiLWRhNmMtNDVlMS1iMjYxLTY1ZDAyNzQyNGU0MCIsImVtYWlsIjoicnVwZW5kcmEuY2hhdWhhbkBmcmV0cm9uLmNvbSIsIm1vYmlsZU51bWJlciI6Ijg5MjA3OTY3MTUiLCJvcmdJZCI6ImMyNGY3YzkxLTMwYmEtNDUzMy1iODZkLTllY2E2NDRlNjYwNSIsIm5hbWUiOiJSdXBlbmRyYSBjaGF1aGFuIiwib3JnVHlwZSI6IkZMRUVUX09XTkVSIiwiaXNHb2QiOmZhbHNlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.ghh1zUZUfJfsIr87hDZvsf2gKtvskZA4054dvPRSNfM`,
  });
    return this.httpClient.get(path,{
      headers: headers,
    });
  }
  createPartnerSetting(settingObj: any) {
    let path = `https://apis.fretron.com/business-partners/v2/setting/profile`
    let headers = new HttpHeaders({
      Authorization:
      `Bearer ` +
      `eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MzQ3MjM0MTYsInVzZXJJZCI6IjdkZWYyMjNiLWRhNmMtNDVlMS1iMjYxLTY1ZDAyNzQyNGU0MCIsImVtYWlsIjoicnVwZW5kcmEuY2hhdWhhbkBmcmV0cm9uLmNvbSIsIm1vYmlsZU51bWJlciI6Ijg5MjA3OTY3MTUiLCJvcmdJZCI6ImMyNGY3YzkxLTMwYmEtNDUzMy1iODZkLTllY2E2NDRlNjYwNSIsIm5hbWUiOiJSdXBlbmRyYSBjaGF1aGFuIiwib3JnVHlwZSI6IkZMRUVUX09XTkVSIiwiaXNHb2QiOmZhbHNlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.ghh1zUZUfJfsIr87hDZvsf2gKtvskZA4054dvPRSNfM`,
  });
    return this.httpClient.post(path,settingObj,{
      headers: headers,
    });
  }
  deletePartnerSetting(id: any) {
    let path = `https://apis.fretron.com/business-partners/v2/setting/${id}`
    let headers = new HttpHeaders({
      Authorization:
      `Bearer ` +
      `eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MzQ5MDIyMjAsInVzZXJJZCI6IjdkZWYyMjNiLWRhNmMtNDVlMS1iMjYxLTY1ZDAyNzQyNGU0MCIsImVtYWlsIjoicnVwZW5kcmEuY2hhdWhhbkBmcmV0cm9uLmNvbSIsIm1vYmlsZU51bWJlciI6Ijg5MjA3OTY3MTUiLCJvcmdJZCI6ImMyNGY3YzkxLTMwYmEtNDUzMy1iODZkLTllY2E2NDRlNjYwNSIsIm5hbWUiOiJSdXBlbmRyYSBjaGF1aGFuIiwib3JnVHlwZSI6IkZMRUVUX09XTkVSIiwiaXNHb2QiOmZhbHNlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.q_MC81PmV6sqotXsj8l5ZEYMqsra0Gf-TW3oCvkm2Pc`,
  });
    return this.httpClient.delete(path,{
      headers: headers,
    });
  }
}
