import { Hotel, Room } from '@prisma/client';
import { prisma } from '@/config';

async function findHotels() {
  const hotels = await prisma.hotel.findMany({
    include: {
      Rooms: {
        include: {
          Booking: true,
        },
      },
    },
  });

  return hotels.map((h) => {
    const freeSlots = h.Rooms.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.capacity - currentValue.Booking.length;
    }, 0);
    const typeRooms = { single: false, double: false, triple: false };
    typeRooms.single = h.Rooms.some((r) => r.capacity === 1);
    typeRooms.double = h.Rooms.some((r) => r.capacity === 2);
    typeRooms.triple = h.Rooms.some((r) => r.capacity === 3);

    return {
      id: h.id,
      image: h.image,
      name: h.name,
      freeSlots,
      typeRooms,
    } as GetHotel;
  });
}

export interface GetHotel extends Pick<Hotel, 'id' | 'name' | 'image'> {
  freeSlots: number;
  typeRooms: {
    single: boolean;
    double: boolean;
    triple: boolean;
  };
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
