import 'dotenv/config';
import * as OpenCage from 'opencage-api-client';
import { ApiError, InternalServerError, NotFoundError } from '../helpers';

export const getGecodingCity = async (name_city: string): Promise<{ lat: number; lng: number } | ApiError> => {
  try {
    if (!process.env.API_KEY_OPENCAGE) return new InternalServerError('API_KEY_OPENCAGE is missing or empty in the environment variables');

    const res = await OpenCage.geocode({ q: name_city, key: process.env.API_KEY_OPENCAGE });
    const { geometry } = res.results[0];

    if (!geometry) {
      return new NotFoundError('0004', 'Please ensure the city name is correct')
    }
    return { lat: geometry.lat, lng: geometry.lng };
  } catch (error) {
    return new InternalServerError('Error fetching city coordinates', error);
  }

}