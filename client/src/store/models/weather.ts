import produce from "immer";
import { createModel } from "@rematch/core";
import { weatherFetch } from "../../api/axios";

type WeatherState = {
  currentCity: any,
  lastUpdate: number,
  isLoading: boolean,
  isInitialized: boolean,
  error: string
}

const weather = createModel<WeatherState>({
  state: {
    currentCity: null,
    lastUpdate: null,
    isLoading: false,
    isInitialized: false,
    error: ""
  },
  reducers: {
    requestWeather: produce((state: WeatherState) => {
      state = {
        ...state,
        isLoading: true,
        isInitialized: true,
        error: ""
      };

      return state;
    }),
    requestWeatherSuccess: produce((state: WeatherState, { weather }) => {
      state = {
        ...state,
        currentCity: weather,
        lastUpdate: Date.now(),
        isLoading: false
      };

      return state;
    }),
    requestWeatherError: produce((state: WeatherState, payload) => {
      state = {
        ...state,
        isLoading: false,
        error: payload.response
      };

      return state;
    })
  },
  effects: dispatch => ({
    async requestCityWeather(payload) {
      try {
        this.requestWeather();
        const { data: weatherData } = await weatherFetch.get("/weather", {
          params: payload.params
        });

        this.requestWeatherSuccess({
          city: weatherData.id,
          weather: weatherData
        });

        return weatherData;
      } catch (e) {
        this.requestWeatherError(e);
        console.error(e);
      }
    }
  })
});

export default weather;
