
import { Claim } from '@/lib/supabase';
import { claimsCrudService } from './api/claimsCrudService';
import { claimCreateService } from './api/claimCreateService';
import { claimUpdateService } from './api/claimUpdateService';

/**
 * Unified claims service that combines all claim-related services
 */
export const claimsService = {
  // Re-export methods from individual services to maintain the same API
  getClaims: claimsCrudService.getClaims,
  createClaim: claimCreateService.createClaim,
  updateClaim: claimUpdateService.updateClaim,
  deleteClaim: claimsCrudService.deleteClaim
};
