import faker from '@faker-js/faker';
import dayjs from 'dayjs';
import { prisma } from '@/config';
import activityRepository from '@/repositories/activity-repository';

export async function createActivity() {
  await prisma.activityPlace.create({
    data: {
      name: 'Auditório Principal',
      Activity: {
        createMany: {
          data: [
            {
              name: faker.name.jobTitle(),
              capacity: 20,
              startsAt: dayjs().add(1, 'day').hour(14).toDate(),
              endsAt: dayjs().add(1, 'day').hour(15).toDate(),
            },
            {
              name: faker.name.jobTitle(),
              capacity: 15,
              startsAt: dayjs().add(2, 'days').hour(9).toDate(),
              endsAt: dayjs().add(2, 'days').hour(13).toDate(),
            },
          ],
        },
      },
    },
  });
}

export async function getActivities() {
  return await activityRepository.findAllActivitiesByPlace();
}
