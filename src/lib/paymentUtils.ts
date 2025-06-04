import { Claim } from '@/lib/supabase';

/**
 * Formats payment details into a readable string format based on the payment method
 * @param claim The claim object containing payment details
 * @returns Formatted payment details as a string
 */
export function formatPaymentDetails(claim: Claim | undefined): string {
  if (!claim || !claim.paymentdetails) return 'No payment details provided';

  const details = claim.paymentdetails;

  if (claim.paymentmethod === 'bank_transfer') {
    return [
      `Bank: ${details.bankName || 'N/A'}`,
      `Account Holder: ${details.accountHolderName || 'N/A'}`,
      `IBAN: ${details.iban || 'N/A'}`,
      details.accountNumber ? `Account Number: ${details.accountNumber}` : '',
    ]
      .filter(Boolean)
      .join('\n');
  } else if (claim.paymentmethod === 'paypal') {
    return `PayPal Email: ${details.paypalEmail || 'N/A'}`;
  } else if (claim.paymentmethod === 'wise') {
    return [
      `Account Holder: ${details.accountHolderName || 'N/A'}`,
      `IBAN/Account: ${details.ibanOrAccount || 'N/A'}`,
      `Email: ${details.email || 'N/A'}`,
    ]
      .filter(Boolean)
      .join('\n');
  }

  return 'No details available for the selected payment method';
}
