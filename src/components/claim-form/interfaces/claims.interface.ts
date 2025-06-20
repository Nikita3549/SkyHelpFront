import { ClaimStatus } from '../enums/claim-status.enum';
import { DisruptionType } from '@/components/claim-form/enums/disruption.ts';

interface ClaimDocument {
  id: string;
  name: string;
  status: 'uploaded';
}

interface ClaimMessage {
  date: string;
  content: string;
  isFromTeam: boolean;
}

export interface IClaim {
  id: string;
  airline: string;
  flightNumber: string;
  departureDate: string;
  route: string;
  status: ClaimStatus;
  statusText: string;
  compensation: string;
  progress: number;
  progresses: {
    id: string;
    title: string;
    description: string;
    endAt: string | null;
    status: 'IN_PROCESS' | 'COMPLETED';
    claimStateId: string;
  }[];
  lastUpdate: string;
  estimatedCompletion: string;
  disruptionType: DisruptionType;
  passengerName: string;
  documents: ClaimDocument[];
  messages: ClaimMessage[];
}
