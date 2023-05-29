import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import activityService from '@/services/activity-service';

export async function getActivitiesByPlace(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const activities = await activityService.getActivitiesByPlace(userId);
    return res.send(activities);
  } catch (error) {
    if (error.name === 'NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND);
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}
