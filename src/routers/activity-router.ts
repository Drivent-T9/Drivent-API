import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getActivitiesByPlace } from '@/controllers/activity-controller';

const activityRouter = Router();

activityRouter.all('/*', authenticateToken).get('/', getActivitiesByPlace);

export { activityRouter };
