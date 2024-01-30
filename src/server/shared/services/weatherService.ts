import axios from "axios";
import { ApiError, InternalServerError } from "../helpers";
import 'dotenv/config';

interface IWeather {
    description: string;
    temperature: string;
    humidity: string;
}

export const getWeatherCity = async (name: string): Promise<IWeather | void | ApiError> => {
    try {

        if (!process.env.API_KEY_OPENWEATHERMAP) return new InternalServerError('API_KEY_OPENWEATHERMAP is missing or empty in the environment variables');

        const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${name}&lang=pt&appid=${process.env.API_KEY_OPENWEATHERMAP}`;
        const result = await axios.get(apiUrl);


        const weatherData = result.data;
        const temp = `${weatherData.main.temp - 273.15}°C`;

        return <IWeather>{
            description: weatherData.weather[0].description,
            temperature: temp,
            humidity: `${weatherData.main.humidity}%`
        }

    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.log('API Error Status:', error.response.status);
            return;
        }

        return new InternalServerError('Error fetching weather', error);
    }

}