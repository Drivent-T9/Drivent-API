import dotenv from 'dotenv';
import { prisma } from '@/config';
import { redis } from '@/config/redis';

async function findFirst() {
  if (process.env.NODE_ENV === 'test') {
    return await prisma.event.findFirst();
  }

  const cacheKey = 'event';
  const cachedEvent = await redis.get(cacheKey);

  if (cachedEvent) {
    const event = JSON.parse(cachedEvent);
    return event;
  }

  const event = await prisma.event.findFirst();
  redis.setEx(cacheKey, 2, JSON.stringify(event));

  return event;
}

const eventRepository = {
  findFirst,
};

export default eventRepository;
