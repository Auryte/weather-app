import axios from 'axios';
import {
    timeStampToWeekDay,
    timeStampToHoursMinutes 
} from '../utils/dateHelpers';

const weatherApiKey = '381ae15ae7e6a3a41979a9906dcbd4d8';
const weatherApi = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/',
    headers: { 'Content-type': 'application/json' }
})
//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

const locationApiKey = 'cd52b29ab5634489938bf1c477af7845';
const locationApi = axios.create({
    baseURL: 'https://api.opencagedata.com/geocode/v1/',
    headers: { 'Content-type': 'application/json' }
})
// https://api.opencagedata.com/geocode/v1/json?q=PLACENAME&key=cd52b29ab5634489938bf1c477af7845

export const getDailyWeatherByCityCountry = async ({ city, country }, success, failure) => {
   try {
       const { data: locData } = await locationApi.get(`json?q=${city}, ${country}&key=${locationApiKey}`);
       const { lat, lng } = locData.results[0].geometry;
       
       const { data: weatherData } = await weatherApi.get(`onecall?lat=${lat}&lon=${lng}&units=metric&exclude=hourly,alerts,current,minutely&appid=${weatherApiKey}`);
       const formatedDays = weatherData.daily.map(({ temp, clouds, dt, sunrise, sunset, wind_deg, wind_speed }) => ({
           temp: temp.day,
           cloudLevel: clouds,
           weekDay: timeStampToWeekDay(dt),
           sunrise: timeStampToHoursMinutes(sunrise),
           sunset: timeStampToHoursMinutes(sunset),
           windDeg: wind_deg,
           windSpeed:wind_speed
        }));
       success(formatedDays)
   } catch (error) {
       failure(error);;
   }
}
