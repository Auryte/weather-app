import axios from 'axios';
// import App from '../App';

import {
    timeStampToWeekDay,
    timeStampToHoursMinutes 
} from '../utils/dateHelpers';

const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
const weatherApi = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/',
    headers: { 'Content-type': 'application/json' }
})
//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// const BASE_URL = process.env.REACT_APP_BASE_URL;
const locationApiKey = process.env.REACT_APP_LOCATION_API_KEY;
const locationApi = axios.create({
    baseURL: 'https://api.opencagedata.com/geocode/v1/',
    headers: { 'Content-type': 'application/json' }
})
// https://api.opencagedata.com/geocode/v1/json?q=PLACENAME&key=cd52b29ab5634489938bf1c477af7845

export const getDailyWeatherByCityCountry = async ({ city, country }, success, failure) => {
    try {
      const { data: locData } = await locationApi.get(`json?q=${country}, ${city}&key=${locationApiKey}`);
      const { lat, lng } = locData.results[0].geometry;
      const { data: weatherData } = await weatherApi.get(`onecall?lat=${lat}&lon=${lng}&units=metric&exclude=hourly,alerts,current,minutely&appid=${weatherApiKey}`);
      const formatedDays = weatherData.daily.map(({ temp, clouds, dt, sunrise, sunset, wind_deg, wind_speed }) => ({
        temp: temp.day,
        cloudPercentage: clouds,
        weekDay: timeStampToWeekDay(dt),
        sunrise: timeStampToHoursMinutes(sunrise),
        sunset: timeStampToHoursMinutes(sunset),
        windDeg: wind_deg,
        windSpeed: wind_speed
      }));
      success(formatedDays)
    } catch (error) {
      failure(error);
    }
  }

/* Atvaizduoti savaitės dienų orus pagal visus api grąžinamus duomenis
  * Visas dienas atvaizduoti vienoje eilutėje koretelėmis
  * Kortelės turi būti vienodo pločio ir lygiais tarpais
  * Priklausomai nuo debesuotumo kortelėje turi būti paveiksliukas
  *  * 0-15 - saulė be debesėlio
  *  * 15-65 - saulė su debesėliu
  *  * 65-100 - tik debesėliai
  * Kortelėje taip pat turi būti vėjo kryptis pažymėta rodykle
  *  * Jeigu savybė 'windDeg' 0 rodyklė rodo į viršų
  *  * Rodyklės kampą nustatyti sukant į dešinę pagal 'windDeg' savybę
*/