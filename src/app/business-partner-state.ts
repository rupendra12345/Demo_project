export interface BusinessPartnerManagerState {
    spinner?: null | undefined | boolean;
    message?: null | undefined | string;
    error?: null | undefined | string;
    // businessPartner?: null | undefined | BusinessPartner[];
    // selectedBusinessPartner?: null | undefined | string[];
    // count?: null | undefined | number;
    customFields?: null | undefined | any[];
    // groups?: null | undefined | BusinessPartnerGroup[];
    // groupCount?: null | undefined | number;
    // partnerPermission?: null | undefined | any;
    // filters?: null | undefined | BpFilter;
    // documents?: null | undefined | any[];
    // selectedBusinessPartnerObj?: null | undefined | any;
    // misTemplates?: null | undefined | any[];
  }
  export const initialBusinessPartnerState: BusinessPartnerManagerState = {
    spinner: false,
    message: null,
    error: null,
    // businessPartner: [],
    // selectedBusinessPartner: [],
    // count: 0,
    customFields: [],
    // groups: [],
    // groupCount: 0,
    // partnerPermission: null,
    // filters: JSON.parse(JSON.stringify(initialBpFilters)),
    // documents: [],
    // misTemplates: []
  };