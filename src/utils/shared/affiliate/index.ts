import { stripeProfitAfterFees } from 'utils/shared/payments/stripeHelpers';
import { DEFAULT_REVENUE_SHARE, AFFILIATE_KEY } from './constants';

// NOTE: The amount of payout per month, the amount displayed in the DOM, and the actual amount paid out should all be calculated the same way
export const getAffiliateId = (affiliateId: string | string[] = '') => {
  let id = '';

  if (Array.isArray(affiliateId)) {
    id = affiliateId[0];
  } else {
    id = affiliateId;
  }

  return id;
};

export const getAffiliateRevenueEarned = (
  saleDollars: number,
  revenueShare = DEFAULT_REVENUE_SHARE,
) => {
  const profitAfterFees = stripeProfitAfterFees(saleDollars);
  const affiliateShareOfProfit = revenueShare || DEFAULT_REVENUE_SHARE;
  const affiliateRevenue = profitAfterFees * affiliateShareOfProfit;

  return affiliateRevenue;
};

export const getAffiliateUrl = (username: string) => {
  return `https://${process.env.APP_URL}/${AFFILIATE_KEY}/${username}`;
};
