import produce from "immer";
import { createModel } from "@rematch/core";
import { geoInfoFetch, weatherFetch } from "../../api/axios";
import { actions } from "redux-router5";
import { stringToPartUrl } from "../../helpers/utils";

type GeoInfoState = {
  info: any,
  isLoading: boolean,
  error: string
}

const geoInfo = createModel<GeoInfoState>({
  state: {
    info: null,
    isLoading: false,
    error: ""
  },
  reducers: {
    requestGeoInfo: produce((state: GeoInfoState) => {
      state = {
        info: null,
        isLoading: true,
        error: ""
      };

      return state;
    }),
    requestGeoInfoSuccess: produce((state: GeoInfoState, payload) => {
      state = {
        ...state,
        info: payload,
        isLoading: false
      };

      return state;
    }),
    requestGeoInfoError: produce((state: GeoInfoState, payload) => {
      state = {
        ...state,
        isLoading: false,
        error: payload
      };

      return state;
    })
  },
  effects: dispatch => ({
    async redirectToCityWeather() {
      try {
        this.requestGeoInfo();
        const geoInfo = await geoInfoFetch.get("");

        this.requestGeoInfoSuccess(geoInfo.data);

        const { data: weatherData }: any = await weatherFetch("weather", {
          params: {
            lat: geoInfo.data.latitude,
            lon: geoInfo.data.longitude
          }
        });

        dispatch(
          actions.navigateTo("weather", {
            city: stringToPartUrl(weatherData.name)
          })
        );
      } catch (e) {
        this.requestGeoInfoError(e);
        console.error(e);
      }
    }
  })
});

export default geoInfo;
