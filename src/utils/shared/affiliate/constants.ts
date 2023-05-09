export const DEFAULT_REVENUE_SHARE = 0.2;
export const AFFILIATE_KEY = 'go';
export const DEFAULT_REDIRECT = 'https://mavyn.com';
export const DEFAULT_AFFILIATE_REDIRECT = 'https://mavyn.com';

export enum AffiliateTier {
  Base = 'BASE',
  PowerUser = 'POWER_USER',
  Influencer = 'INFLUENCER',
  Invitation = 'INVITATION',
}

export enum AffiliatePaymentStatus {
  Unpaid = 'UNPAID',
  Paid = 'PAID',
  Denied = 'DENIED',
  Unpayable = 'UNPAYABLE',
}
