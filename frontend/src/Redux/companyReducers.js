// Redux/reducers/companyReducers.js

import {
  GET_ALL_COMPANIES_REQUEST,
  GET_ALL_COMPANIES_SUCCESS,
  GET_ALL_COMPANIES_FAILURE,
  GET_COMPANY_BY_ID_REQUEST,
  GET_COMPANY_BY_ID_SUCCESS,
  GET_COMPANY_BY_ID_FAILURE,
  ADD_COMPANY_REQUEST,
  ADD_COMPANY_SUCCESS,
  ADD_COMPANY_FAILURE,
  UPDATE_COMPANY_REQUEST,
  UPDATE_COMPANY_SUCCESS,
  UPDATE_COMPANY_FAILURE,
  DELETE_COMPANY_REQUEST,
  DELETE_COMPANY_SUCCESS,
  DELETE_COMPANY_FAILURE,
} from './constants/CompanyTypes'

const initialState = {
  companies: [],
  loading: false,
  error: null,
  companyData: null, // New state to hold the data of a single company
};

const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COMPANIES_REQUEST:
    case GET_COMPANY_BY_ID_REQUEST:
    case ADD_COMPANY_REQUEST:
    case UPDATE_COMPANY_REQUEST:
    case DELETE_COMPANY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_ALL_COMPANIES_SUCCESS:
      return {
        ...state,
        loading: false,
        companies: action.payload,
      };
    case GET_COMPANY_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        companyData: action.payload, // Set the company data when fetched successfully
      };
    case GET_ALL_COMPANIES_FAILURE:
    case GET_COMPANY_BY_ID_FAILURE:
    case ADD_COMPANY_FAILURE:
    case UPDATE_COMPANY_FAILURE:
    case DELETE_COMPANY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_COMPANY_SUCCESS:
    case UPDATE_COMPANY_SUCCESS:
    case DELETE_COMPANY_SUCCESS:
      // ... (existing code for success cases)
    default:
      return state;
  }
};

export default companyReducer;
