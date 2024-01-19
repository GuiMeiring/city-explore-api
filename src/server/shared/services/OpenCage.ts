import 'dotenv/config';
import * as OpenCage from 'opencage-api-client';
import { ApiError, InternalServerError } from '../helpers';

export const getCoordinateCity =async (name_city: string): Promise<{ lat: number; lng: number } | ApiError> => {
    try {
        const res = await OpenCage.geocode({ q: name_city, key: process.env.API_KEY_OPENCAGE });
        const { geometry } = res.results[0];
    
        return { lat: geometry.lat, lng: geometry.lng };
      } catch (error) {
        return new InternalServerError('Error getting city coordinates', error);
      }
         
}