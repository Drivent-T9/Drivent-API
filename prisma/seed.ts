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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
