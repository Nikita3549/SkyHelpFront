import { useEffect, useState } from 'react';
import api from '@/api/axios.ts';
import { IClaimBackend } from '@/components/claim-form/interfaces/claim-back.interface.ts';
import { IClaim } from '@/components/claim-form/interfaces/claims.interface';
import { ClaimStatus } from '@/components/claim-form/enums/claim-status.enum.ts';
import { DisruptionType } from '@/components/claim-form/enums/disruption.ts';

export const useDashboardClaims = (setLoading: (value: boolean) => void) => {
  const [claims, setClaims] = useState<IClaim[]>([]);

  useEffect(() => {
    (async () => {
      const res = await api.get<IClaimBackend[]>('/claims');

      setClaims(
        res.data.map((backClaim) => {
          const completedSteps = backClaim.state.progress.filter(
            (s) => s.status == 'COMPLETED',
          );

          return {
            id: backClaim.id,
            airline: backClaim.details.airlines.name,
            flightNumber: backClaim.details.flightNumber,
            departureDate: backClaim.details.date,
            route: `${backClaim.details.routes[0].DepartureAirport.name} (${backClaim.details.routes[0].DepartureAirport.icao}) to ${backClaim.details.routes[0].ArrivalAirport.name} (${backClaim.details.routes[0].ArrivalAirport.icao})`,
            status: backClaim.state.status as ClaimStatus,
            statusText: 'status text',
            compensation: backClaim.state.amount.toString(),
            progress:
              completedSteps.length == 0
                ? 0
                : (backClaim.state.progress.length / completedSteps.length) *
                  100,
            lastUpdate: backClaim.updatedAt,
            estimatedCompletion: 'estimated completion',
            disruptionType: backClaim.issue.disruptionType as DisruptionType,
            passengerName: `${backClaim.customer.firstName} ${backClaim.customer.lastName}`,
            documents: backClaim.documents.map((d) => ({
              id: d.id,
              name: d.name,
              status: 'uploaded',
            })),
            messages: [],
            progresses: backClaim.state.progress,
          };
        }),
      );
      setLoading(false);
    })();
  }, []);

  return {
    claims,
    setClaims,
  };
};
