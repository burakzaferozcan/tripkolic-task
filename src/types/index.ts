export interface UserCredentials {
  userId: string;
  password: string;
}

export interface ApiResponse {
  status: boolean;
}

export interface User {
  userId: string;
  isLoggedIn: boolean;
}

export interface CompanyDetails {
  operatorId: string;
  companyNumber: string;
  legalName: string;
  tatNumber: string;
  vatNumber: string;
  address: string;
}

export interface BankDetails {
  accountType: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
}

export interface ContactDetails {
  companyOwnerName: string;
  phoneNumber: string;
  officePhoneNumber1: string;
  officePhoneNumber2: string;
}

export interface Settings {
  password: string;
  email: string;
}

export interface UserProfile {
  companyDetails: CompanyDetails;
  bankDetails: BankDetails;
  contactDetails: ContactDetails;
  settings: Settings;
}
