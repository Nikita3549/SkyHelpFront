import { CancellationNotice } from '../../enums/cancellation.enum';
import { DelayCategory } from '../../enums/delay.enum';
import { DisruptionType } from '../../enums/disruption';

export interface FlightDetailsInput {
  disruptionType: DisruptionType;

  arrivalDelay?: DelayCategory;

  notificationTime?: CancellationNotice;

  voluntaryDenial?: boolean;
}
