import { prisma } from '@/config';

async function findAllActivitiesByPlace() {
  return await prisma.activityPlace.findMany({
    include: {
      Activity: {
        include: {
          _count: {
            select: {
              Registration: true,
            },
          },
        },
        where: {
          startsAt: {
            gte: new Date(),
          },
        },
      },
    },
  });
}

const activityRepository = {
  findAllActivitiesByPlace,
};
export default activityRepository;
