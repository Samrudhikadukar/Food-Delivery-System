/* eslint-disable no-unused-vars */
import { API_URL, api } from "../../../config/api";
import {
  createOrderFailure,
  createOrderRequest,
  createOrderSuccess,
  getUsersOrdersFailure,
  getUsersOrdersRequest,
  getUsersOrdersSuccess
} from "./ActionCreators";
import {
  GET_USERS_NOTIFICATION_FAILURE,
  GET_USERS_NOTIFICATION_SUCCESS
} from "./ActionTypes";

// In your action file
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`${API_URL}/api/order`, orderData.order, {
        headers: {
          Authorization: `Bearer ${orderData.jwt}`
        }
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getUsersOrders = jwt => {
  return async dispatch => {
    dispatch(getUsersOrdersRequest());
    try {
      const { data } = await api.get(`${API_URL}/api/order/user`, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });
      console.log("users order ", data);
      dispatch(getUsersOrdersSuccess(data));
    } catch (error) {
      dispatch(getUsersOrdersFailure(error));
    }
  };
};

export const getUsersNotificationAction = () => {
  return async dispatch => {
    dispatch(createOrderRequest());
    try {
      const { data } = await api.get(`${API_URL}/api/notifications`);

      console.log("all notifications ", data);
      dispatch({ type: GET_USERS_NOTIFICATION_SUCCESS, payload: data });
    } catch (error) {
      console.log("error ", error);
      dispatch({ type: GET_USERS_NOTIFICATION_FAILURE, payload: error });
    }
  };
};
