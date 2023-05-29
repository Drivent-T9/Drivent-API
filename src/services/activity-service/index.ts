import { notFoundError, unauthorizedError } from '@/errors';
import activityRepository from '@/repositories/activity-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function getActivitiesByPlace(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket || ticket.status === 'RESERVED') {
    throw unauthorizedError();
  }

  return await activityRepository.findAllActivitiesByPlace();
}

const activityService = {
  getActivitiesByPlace,
};
export default activityService;
