import axios from "axios";
import { weatherConfigApi, cityConfigApi, geoConfigApi } from "./api";

const weatherFetch = axios.create({
  baseURL: weatherConfigApi.URL,
  params: {
    appid: weatherConfigApi.API_KEY,
    units: weatherConfigApi.UNITS
  }
});

const geoInfoFetch = axios.create({
  baseURL: geoConfigApi.URL
});

const cityFetch = axios.create({
  baseURL: `${cityConfigApi.URL}`
});

export { weatherFetch, cityFetch, geoInfoFetch };
