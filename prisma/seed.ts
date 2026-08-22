import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient } from '../src/database/generated/prisma/client';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not set');
}

const adapter = new PrismaPg({ connectionString });
const db = new PrismaClient({ adapter });

const fans = [
  { id: 'fan_1', name: 'Luna Nightshade', email: 'luna.nightshade@example.com' },
  { id: 'fan_2', name: 'Phoenix Groove', email: 'phoenix.groove@example.com' },
  { id: 'fan_3', name: 'Melody Stargazer', email: 'melody.stargazer@example.com' },
];

const artists = [
  { id: 'artist_1', name: 'The Beatles', genre: 'Rock', bio: 'Legendary British rock band from Liverpool' },
  { id: 'artist_2', name: 'Miles Davis', genre: 'Jazz', bio: 'Influential American jazz trumpeter and composer' },
  {
    id: 'artist_3',
    name: 'Daft Punk',
    genre: 'Electronic',
    bio: 'French electronic music duo known for their innovative sound',
  },
  { id: 'artist_4', name: 'Adele', genre: 'Pop', bio: 'British singer-songwriter with powerful vocals' },
];

const albums = [
  { id: 'album_1', title: 'Abbey Road', artistId: 'artist_1', releaseYear: 1969, coverArtUrl: 'https://example.com/abbey-road.jpg' },
  { id: 'album_2', title: 'Kind of Blue', artistId: 'artist_2', releaseYear: 1959, coverArtUrl: 'https://example.com/kind-of-blue.jpg' },
  {
    id: 'album_3',
    title: 'Random Access Memories',
    artistId: 'artist_3',
    releaseYear: 2013,
    coverArtUrl: 'https://example.com/ram.jpg',
  },
  { id: 'album_4', title: '21', artistId: 'artist_4', releaseYear: 2011, coverArtUrl: 'https://example.com/21.jpg' },
  { id: 'album_5', title: 'Revolver', artistId: 'artist_1', releaseYear: 1966, coverArtUrl: 'https://example.com/revolver.jpg' },
];

const favorites = [
  { id: 'fav_1', fanId: 'fan_1', albumId: 'album_1' },
  { id: 'fav_2', fanId: 'fan_1', albumId: 'album_4' },
  { id: 'fav_3', fanId: 'fan_2', albumId: 'album_2' },
  { id: 'fav_4', fanId: 'fan_2', albumId: 'album_3' },
  { id: 'fav_5', fanId: 'fan_3', albumId: 'album_3' },
  { id: 'fav_6', fanId: 'fan_3', albumId: 'album_5' },
];

function main() {
  const createdAt = new Date();

  return db.$transaction([
    ...artists.map((artist) => db.artist.upsert({ where: { id: artist.id }, create: { ...artist, createdAt }, update: artist })),
    ...albums.map((album) => db.album.upsert({ where: { id: album.id }, create: { ...album, createdAt }, update: album })),
    ...fans.map((fan) => db.fan.upsert({ where: { id: fan.id }, create: { ...fan, createdAt }, update: fan })),
    ...favorites.map((favorite) => db.favorite.upsert({ where: { id: favorite.id }, create: { ...favorite, createdAt }, update: favorite })),
  ]);
}

main()
  .then(() => console.log('Fans, artists, albums, and favorites have been seeded with sample data. Happy syncing!'))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => db.$disconnect());
