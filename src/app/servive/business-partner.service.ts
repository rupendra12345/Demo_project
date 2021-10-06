import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class BusinessPartnerService {
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
}
