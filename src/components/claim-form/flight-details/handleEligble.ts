import { DisruptionType } from '../enums/disruption';
import { CancellationNotice } from '@/components/claim-form/enums/cancellation.enum.ts';
import { IClaimForm } from '@/components/claim-form/interfaces/claim-form.interface.ts';
import { FlightDetailsInput } from './interfaces/input.interface';
import { DelayCategory } from '@/components/claim-form/enums/delay.enum.ts';

export const onDisruptionTypeSubmit = (
  data: FlightDetailsInput,
  setIsChecking: (value: boolean) => void,
) => {
  if (
    data.disruptionType == DisruptionType.cancellation &&
    data.notificationTime == CancellationNotice.fourteen_days_or_more
  ) {
    return false;
  }

  setIsChecking(true);

  let isEligible = false;

  switch (data.disruptionType) {
    case DisruptionType.delay:
      isEligible = data.arrivalDelay != DelayCategory.less_than_3hours;
      break;

    case DisruptionType.cancellation:
      isEligible =
        data.arrivalDelay == DelayCategory.threehours_or_more ||
        data.arrivalDelay == DelayCategory.never_arrived ||
        data.notificationTime == CancellationNotice.less_than_14days;
      break;

    case DisruptionType.denied_boarding:
      isEligible = true;
      break;

    case DisruptionType.missed_connection:
      isEligible = data.arrivalDelay != DelayCategory.less_than_3hours;
      break;
  }

  setIsChecking(false);

  // if (isEligible) scrollToTop();
  return isEligible;
};
