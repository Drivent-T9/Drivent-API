import { Hotel, Room } from '@prisma/client';
import { prisma } from '@/config';

async function findHotels() {
  return prisma.hotel.findMany();
}

async function findRoomsByHotelId(hotelId: number): Promise<Hotel & { Rooms: GetRoomsBooking[] }> {
  return prisma.hotel.findFirst({
    where: {
      id: hotelId,
    },
    include: {
      Rooms: {
        select: {
          id: true,
          name: true,
          capacity: true,
          _count: {
            select: {
              Booking: true,
            },
          },
        },
      },
    },
  });
}

export interface GetRoomsBooking extends Pick<Room, 'id' | 'name' | 'capacity'> {
  _count: { Booking: number };
}

const hotelRepository = {
  findHotels,
  findRoomsByHotelId,
};

export default hotelRepository;
