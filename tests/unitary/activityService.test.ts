import { enrollmentWithAddressReturn, findTicketFailByEnrollmentIdReturn } from '../factories';
import { notFoundError, unauthorizedError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import activityService from '@/services/activity-service';
import ticketsRepository from '@/repositories/tickets-repository';

describe('getActivitiesByPlace', () => {
  it('should return not found error if dont have enrollment', async () => {
    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValue(null);

    await expect(activityService.getActivitiesByPlace(1)).rejects.toEqual(notFoundError());
  });
  it('should return unauthorized error if dont find ticket', async () => {
    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValue(enrollmentWithAddressReturn());
    jest.spyOn(ticketsRepository, 'findTicketByEnrollmentId').mockResolvedValue(null);

    await expect(activityService.getActivitiesByPlace(1)).rejects.toEqual(unauthorizedError());
  });
  it('should return unauthorized error if ticket isnt paid', async () => {
    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValue(enrollmentWithAddressReturn());
    jest.spyOn(ticketsRepository, 'findTicketByEnrollmentId').mockResolvedValue(findTicketFailByEnrollmentIdReturn());

    await expect(activityService.getActivitiesByPlace(1)).rejects.toEqual(unauthorizedError());
  });
});
