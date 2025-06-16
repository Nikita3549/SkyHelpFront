import { Textarea } from '@/components/ui/textarea';
import { IClaimForm } from '../interfaces/claim-form.interface';

interface AdditionalInfoFieldProps {
  newForm: IClaimForm;
  setNewForm: (form: IClaimForm) => void;
}

export const AdditionalInfoField: React.FC<AdditionalInfoFieldProps> = ({
  newForm,
  setNewForm,
}) => {
  return (
    <div className="space-y-2">
      <label className="text-xl font-semibold text-black block">
        Additional Information
      </label>
      <p className="text-gray-600">
        Please provide any additional details about the disruption that might
        help with your claim.
      </p>
      <Textarea
        className="min-h-[150px] resize-y"
        placeholder="Describe what happened during the disruption, any communications from the airline, and how it affected you..."
        value={newForm.issue.additionalInfo ?? ''}
        onChange={(e) =>
          setNewForm({
            ...newForm,
            issue: {
              ...newForm.issue,
              additionalInfo: e.target.value,
            },
          })
        }
      />
      <p className="text-xs text-gray-500 mt-2">
        Adding details specific to your experience can significantly strengthen
        your claim.
      </p>
    </div>
  );
};
