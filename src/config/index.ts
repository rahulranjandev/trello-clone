import { config } from 'dotenv';

const PATH = '.env';

if (!PATH) {
  throw new Error('The .env file is missing');
}

config({ path: PATH });

export const {
  NODE_ENV,
  PORT,
  MONGODB_URL,
  JWT_SECRET,
  ACCESS_TOKEN_PRIVATE_KEY,
  ACCESS_TOKEN_PUBLIC_KEY,
  REFRESH_TOKEN_PRIVATE_KEY,
  REFRESH_TOKEN_PUBLIC_KEY,
} = process.env;

if (!MONGODB_URL) {
  throw new Error('MONGODB_URL is missing');
}

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is missing');
}

if (!ACCESS_TOKEN_PRIVATE_KEY) {
  throw new Error('ACCESS_TOKEN_PRIVATE_KEY is missing');
}

if (!ACCESS_TOKEN_PUBLIC_KEY) {
  throw new Error('ACCESS_TOKEN_PUBLIC_KEY is missing');
}

if (!REFRESH_TOKEN_PRIVATE_KEY) {
  throw new Error('REFRESH_TOKEN_PRIVATE_KEY is missing');
}

if (!REFRESH_TOKEN_PUBLIC_KEY) {
  throw new Error('REFRESH_TOKEN_PUBLIC_KEY is missing');
}
