import { createModel } from "@rematch/core";
import produce from "immer";
import { cityFetch } from "../../api/axios";
import { actions } from "redux-router5";
import { stringToPartUrl } from "../../helpers/utils";
import { Dispatch } from "../../index";

export type DefaultCityState = number;

const defaultCity = createModel<DefaultCityState>({
  state: null,
  reducers: {
    setDefaultCity: produce(
      (state: DefaultCityState, payload) => (state = payload)
    )
  },
  effects: (dispatch: Dispatch) => ({
    redirectToDefaultCity: async (payload, rootState) => {
      const { data: city } = await cityFetch(`/city/${payload}`);

      dispatch(
        actions.navigateTo("weather", {
          city: stringToPartUrl(city.name)
        })
      );
    }
  })
});

export default defaultCity;
