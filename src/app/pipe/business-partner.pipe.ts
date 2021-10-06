import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usedBy'
})
export class BusinessPartnerPipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }

  transform(restrictions: any[]): string {
    let businessPartnerRestrictions: number = 0;
    let vendorRestrictions: number = 0;
    let customerRestrictions: number = 0;
    let groupRestrictions: number = 0;
    if (!restrictions) {
      return "NA";
    }

    for (let i = 0; i < restrictions.length; i++) {
      if (restrictions[i].objectType === "group") {
        groupRestrictions = groupRestrictions + 1;
      }

      if (restrictions[i].objectType === "vendor") {
        vendorRestrictions = vendorRestrictions + 1;
      }

      if (restrictions[i].objectType === "customer") {
        customerRestrictions = customerRestrictions + 1;
      }

      if (restrictions[i].objectType === "businessPartner") {
        businessPartnerRestrictions = businessPartnerRestrictions + 1;
      }
    }

    return `Business Partner - ${businessPartnerRestrictions} | Vendor - ${vendorRestrictions} | Customer - ${customerRestrictions} | Group - ${groupRestrictions}`;
  }

}
