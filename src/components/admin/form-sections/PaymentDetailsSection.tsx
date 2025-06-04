import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type PaymentDetailsSectionProps = {
  paymentMethod: string;
  bankName: string;
  accountHolderName: string;
  iban: string;
  accountNumber: string;
  paypalEmail: string;
  wiseAccountHolder: string;
  wiseIbanOrAccount: string;
  wiseEmail: string;
  errors: Record<string, string>;
  handleChange: (field: string, value: any) => void;
};

const PaymentDetailsSection = ({
  paymentMethod,
  bankName,
  accountHolderName,
  iban,
  accountNumber,
  paypalEmail,
  wiseAccountHolder,
  wiseIbanOrAccount,
  wiseEmail,
  errors,
  handleChange,
}: PaymentDetailsSectionProps) => {
  return (
    <div className="space-y-4 pt-2">
      <h3 className="text-lg font-medium">Payment Details</h3>

      <div className="space-y-4">
        <Label className="block mb-2">Payment Method</Label>
        <RadioGroup
          value={paymentMethod}
          onValueChange={(value) => handleChange('paymentMethod', value)}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <label htmlFor="payment-bank" className="cursor-pointer w-full">
            <div
              className={`flex items-center rounded-lg border p-4 hover:bg-gray-50 transition-colors ${paymentMethod === 'bank_transfer' ? 'bg-gray-50 border-primary' : ''}`}
            >
              <RadioGroupItem
                value="bank_transfer"
                id="payment-bank"
                className="mr-2"
              />
              <span>Bank Transfer</span>
            </div>
          </label>

          <label htmlFor="payment-paypal" className="cursor-pointer w-full">
            <div
              className={`flex items-center rounded-lg border p-4 hover:bg-gray-50 transition-colors ${paymentMethod === 'paypal' ? 'bg-gray-50 border-primary' : ''}`}
            >
              <RadioGroupItem
                value="paypal"
                id="payment-paypal"
                className="mr-2"
              />
              <span>PayPal</span>
            </div>
          </label>

          <label htmlFor="payment-wise" className="cursor-pointer w-full">
            <div
              className={`flex items-center rounded-lg border p-4 hover:bg-gray-50 transition-colors ${paymentMethod === 'wise' ? 'bg-gray-50 border-primary' : ''}`}
            >
              <RadioGroupItem value="wise" id="payment-wise" className="mr-2" />
              <span>Wise / TransferWise</span>
            </div>
          </label>
        </RadioGroup>
        {errors.paymentMethod && (
          <p className="text-sm text-red-500">{errors.paymentMethod}</p>
        )}
      </div>

      {paymentMethod === 'bank_transfer' && (
        <div className="space-y-4 pl-6 border-l-2 border-gray-100">
          <div className="space-y-2">
            <Label htmlFor="bankName">Bank Name</Label>
            <Input
              id="bankName"
              value={bankName}
              onChange={(e) => handleChange('bankName', e.target.value)}
              placeholder="Enter bank name"
            />
            {errors.bankName && (
              <p className="text-sm text-red-500">{errors.bankName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountHolderName">Account Holder Name</Label>
            <Input
              id="accountHolderName"
              value={accountHolderName}
              onChange={(e) =>
                handleChange('accountHolderName', e.target.value)
              }
              placeholder="Enter account holder name"
            />
            {errors.accountHolderName && (
              <p className="text-sm text-red-500">{errors.accountHolderName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="iban">IBAN</Label>
            <Input
              id="iban"
              value={iban}
              onChange={(e) => handleChange('iban', e.target.value)}
              placeholder="Enter IBAN"
            />
            {errors.iban && (
              <p className="text-sm text-red-500">{errors.iban}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountNumber">Account Number</Label>
            <Input
              id="accountNumber"
              value={accountNumber}
              onChange={(e) => handleChange('accountNumber', e.target.value)}
              placeholder="Enter account number"
            />
            {errors.accountNumber && (
              <p className="text-sm text-red-500">{errors.accountNumber}</p>
            )}
          </div>
        </div>
      )}

      {paymentMethod === 'paypal' && (
        <div className="space-y-4 pl-6 border-l-2 border-gray-100">
          <div className="space-y-2">
            <Label htmlFor="paypalEmail">PayPal Email</Label>
            <Input
              id="paypalEmail"
              type="email"
              value={paypalEmail}
              onChange={(e) => handleChange('paypalEmail', e.target.value)}
              placeholder="Enter PayPal email"
            />
            {errors.paypalEmail && (
              <p className="text-sm text-red-500">{errors.paypalEmail}</p>
            )}
          </div>
        </div>
      )}

      {paymentMethod === 'wise' && (
        <div className="space-y-4 pl-6 border-l-2 border-gray-100">
          <div className="space-y-2">
            <Label htmlFor="wiseAccountHolder">Account Holder Name</Label>
            <Input
              id="wiseAccountHolder"
              value={wiseAccountHolder}
              onChange={(e) =>
                handleChange('wiseAccountHolder', e.target.value)
              }
              placeholder="Enter account holder name"
            />
            {errors.wiseAccountHolder && (
              <p className="text-sm text-red-500">{errors.wiseAccountHolder}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="wiseIbanOrAccount">IBAN or Account Number</Label>
            <Input
              id="wiseIbanOrAccount"
              value={wiseIbanOrAccount}
              onChange={(e) =>
                handleChange('wiseIbanOrAccount', e.target.value)
              }
              placeholder="Enter IBAN or account number"
            />
            {errors.wiseIbanOrAccount && (
              <p className="text-sm text-red-500">{errors.wiseIbanOrAccount}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="wiseEmail">Email linked to Wise</Label>
            <Input
              id="wiseEmail"
              type="email"
              value={wiseEmail}
              onChange={(e) => handleChange('wiseEmail', e.target.value)}
              placeholder="Enter email linked to Wise"
            />
            {errors.wiseEmail && (
              <p className="text-sm text-red-500">{errors.wiseEmail}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentDetailsSection;
