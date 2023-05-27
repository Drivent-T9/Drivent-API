import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import faker from '@faker-js/faker';
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: "Driven.t",
        logoImageUrl: "https://files.driveneducation.com.br/images/logo-rounded.png",
        backgroundImageUrl: "linear-gradient(to right, #FA4098, #FFD77F)",
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, "days").toDate(),
      },
    });
  }
  await prisma.ticketType.create({
    data: {
      name: "online",
      price: 100,
      isRemote: true,
      includesHotel: false,
    },
  });

  await prisma.ticketType.create({
    data: {
      name: "presencial - com hotel",
      price: 600,
      isRemote: false,
      includesHotel: true,
    },
  });

  await prisma.ticketType.create({
    data: {
      name: "presencial - sem hotel",
      price: 250,
      isRemote: false,
      includesHotel: false,
    },
  });
  await prisma.hotel.create({
    data: {
      name: faker.name.findName(),
      image: faker.image.business(),
      Rooms: {
        createMany: {
          data: [
            {
              name: '101',
              capacity: 1,
            },
            {
              name: '102',
              capacity: 2,
            },
            {
              name: '103',
              capacity: 3,
            },
            {
              name: '104',
              capacity: 3,
            },
            {
              name: '105',
              capacity: 2,
            }
          ]
        }
      }
    }
  });
  await prisma.hotel.create({
    data: {
      name: faker.name.findName(),
      image: faker.image.business(),
      Rooms: {
        createMany: {
          data: [
            {
              name: '101',
              capacity: 1,
            },
            {
              name: '102',
              capacity: 2,
            },
            {
              name: '103',
              capacity: 1,
            },
          ]
        }
      }
    }
  });

  await prisma.hotel.create({
    data: {
      name: faker.name.findName(),
      image: faker.image.business(),
      Rooms: {
        createMany: {
          data: [
            {
              name: '101',
              capacity: 1,
            },
            {
              name: '102',
              capacity: 2,
            },
            {
              name: '103',
              capacity: 2,
            },
            {
              name: '104',
              capacity: 1,
            },
          ]
        }
      }
    }
  });
  console.log({ event });
  await prisma.activityPlace.create({
    data: {
      name: "Auditório Principal",
      Activity: {
        createMany: {
          data: [
            {
              name: faker.name.jobTitle(),
              capacity: 20,
              startsAt: dayjs().date(28).hour(14).toDate(),
              endsAt: dayjs().date(28).hour(15).toDate(),
            },
            {
              name: faker.name.jobTitle(),
              capacity: 15,
              startsAt: dayjs().date(29).hour(9).toDate(),
              endsAt: dayjs().date(29).hour(13).toDate(),
            },
            {
              name: faker.name.jobTitle(),
              capacity: 15,
              startsAt: dayjs().date(30).hour(9).toDate(),
              endsAt: dayjs().date(30).hour(10).toDate(),
            },
            {
              name: faker.name.jobTitle(),
              capacity: 20,
              startsAt: dayjs().date(30).hour(11).toDate(),
              endsAt: dayjs().date(30).hour(13).toDate(),
            },
            {
              name: faker.name.jobTitle(),
              capacity: 15,
              startsAt: dayjs().date(31).hour(9).toDate(),
              endsAt: dayjs().date(31).hour(13).toDate(),
            },
            {
              name: faker.name.jobTitle(),
              capacity: 20,
              startsAt: dayjs().date(31).hour(14).toDate(),
              endsAt: dayjs().date(31).hour(15).toDate(),
            },
          ]
        }
      }
    }
  });

  await prisma.activityPlace.create({
    data: {
      name: "Auditório Lateral",
      Activity: {
        createMany: {
          data: [
            {
              name: faker.name.jobTitle(),
              capacity: 9,
              startsAt: dayjs().date(28).hour(9).toDate(),
              endsAt: dayjs().date(28).hour(10).toDate(),
            },
            {
              name: faker.name.jobTitle(),
              capacity: 6,
              startsAt: dayjs().date(28).hour(10).toDate(),
              endsAt: dayjs().date(28).hour(11).toDate(),
            },
            {
              name: faker.name.jobTitle(),
              capacity: 10,
              startsAt: dayjs().date(28).hour(11).toDate(),
              endsAt: dayjs().date(28).hour(12).toDate(),
            },
            {
              name: faker.name.jobTitle(),
              capacity: 20,
              startsAt: dayjs().date(28).hour(13).toDate(),
              endsAt: dayjs().date(28).hour(14).toDate(),
            },
            {
              name: faker.name.jobTitle(),
              capacity: 15,
              startsAt: dayjs().date(29).hour(13).toDate(),
              endsAt: dayjs().date(29).hour(15).toDate(),
            },
            {
              name: faker.name.jobTitle(),
              capacity: 15,
              startsAt: dayjs().date(30).hour(9).toDate(),
              endsAt: dayjs().date(30).hour(10).toDate(),
            },
            {
              name: faker.name.jobTitle(),
              capacity: 30,
              startsAt: dayjs().date(30).hour(12).toDate(),
              endsAt: dayjs().date(30).hour(14).toDate(),
            },
            {
              name: faker.name.jobTitle(),
              capacity: 6,
              startsAt: dayjs().date(31).hour(10).toDate(),
              endsAt: dayjs().date(31).hour(11).toDate(),
            },
            {
              name: faker.name.jobTitle(),
              capacity: 10,
              startsAt: dayjs().date(31).hour(11).toDate(),
              endsAt: dayjs().date(31).hour(12).toDate(),
            },
            {
              name: faker.name.jobTitle(),
              capacity: 20,
              startsAt: dayjs().date(31).hour(13).toDate(),
              endsAt: dayjs().date(31).hour(14).toDate(),
            },

          ]
        }
      }
    }
  });

  await prisma.activityPlace.create({
    data: {
      name: "Sala de Workshop",
      Activity: {
        createMany: {
          data: [
            {
              name: faker.name.jobTitle(),
              capacity: 30,
              startsAt: dayjs().date(28).hour(12).toDate(),
              endsAt: dayjs().date(28).hour(15).toDate(),
            },
            {
              name: faker.name.jobTitle(),
              capacity: 36,
              startsAt: dayjs().date(29).hour(9).toDate(),
              endsAt: dayjs().date(29).hour(13).toDate(),
            },
            {
              name: faker.name.jobTitle(),
              capacity: 34,
              startsAt: dayjs().date(30).hour(9).toDate(),
              endsAt: dayjs().date(30).hour(12).toDate(),
            },
            {
              name: faker.name.jobTitle(),
              capacity: 34,
              startsAt: dayjs().date(31).hour(9).toDate(),
              endsAt: dayjs().date(31).hour(12).toDate(),
            },
          ]
        }
      }
    }
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
