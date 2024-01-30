import axios, { AxiosResponse } from 'axios';
import { ApiError, InternalServerError } from '../helpers';
import 'dotenv/config';

interface TouristSpots {
  xid: string;
  name: string;
  kinds: string;
  point: {
    lon: number;
    lat: number;
  };
}

export async function getTouristSpotsCity(lat: number, lon: number, raio: number = 10000): Promise<TouristSpots[] | void | ApiError> {
  try {

    if (!process.env.API_KEY_OPENTRIPMAP) return new InternalServerError('API_KEY_OPENTRIPMAP is missing or empty in the environment variables');

    const resposta: AxiosResponse<TouristSpots[]> = await axios.get(
      'https://api.opentripmap.com/0.1/en/places/radius',
      {
        params: {
          apikey: process.env.API_KEY_OPENTRIPMAP, // Substitua pela sua chave de API
          lat,
          lon,
          radius: raio,
          format: 'json',
          lang: 'pt',
        },
      }
    );

    let touristSpots: TouristSpots[] = [];

    if (Array.isArray(resposta.data)) {
      resposta.data.forEach((dataItem) => {
        const ponto: TouristSpots = {
          xid: dataItem.xid,
          name: dataItem.name,
          kinds: dataItem.kinds,
          point: {
            lon: dataItem.point.lon,
            lat: dataItem.point.lat,
          },
        };

        touristSpots.push(ponto);
      });

      touristSpots = touristSpots
        .filter((ponto: TouristSpots) => ponto.name)

      return touristSpots;
    } else {
      return;
    }
  } catch (error) {
    return new InternalServerError('Error fetching tourist spots', error);
  }
};

