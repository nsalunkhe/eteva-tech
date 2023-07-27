// frontend/src/redux/actions/companyActions.js

import axios from 'axios';
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
} from '../constants/CompanyTypes';

// Get all companies
export const getAllCompanies = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_COMPANIES_REQUEST });

    const { data } = await axios.get('http://localhost:5000/companies');
    dispatch({ type: GET_ALL_COMPANIES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ALL_COMPANIES_FAILURE, payload: error.message });
  }
};

// Action to get a company by ID
export const getCompanyById = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_COMPANY_BY_ID_REQUEST });

    const { data } = await axios.get(`/api/companies/${id}`);
    dispatch({ type: GET_COMPANY_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_COMPANY_BY_ID_FAILURE, payload: error.message });
  }
};

// Add a new company
export const addCompany = (newCompany) => async (dispatch) => {
  try {
    dispatch({ type: ADD_COMPANY_REQUEST });

    await axios.post('http://localhost:5000/companies', newCompany);
    dispatch({ type: ADD_COMPANY_SUCCESS });
  } catch (error) {
    dispatch({ type: ADD_COMPANY_FAILURE, payload: error.message });
  }
};

// Update an existing company
export const updateCompany = (companyId, updatedCompany) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_COMPANY_REQUEST });

    const response = await axios.put(`http://localhost:5000/companies/${companyId}`, updatedCompany);
    const updatedCompanyData = response.data;

    dispatch({ type: UPDATE_COMPANY_SUCCESS, payload: updatedCompanyData });

    return updatedCompanyData; // Return the updated company data to the caller (useful if needed in the component)
  } catch (error) {
    dispatch({ type: UPDATE_COMPANY_FAILURE, payload: error.message });
  }
};

// Delete a company
export const deleteCompany = (companyId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_COMPANY_REQUEST });

    await axios.delete(`http://localhost:5000/companies/${companyId}`);
    dispatch({ type: DELETE_COMPANY_SUCCESS });
  } catch (error) {
    dispatch({ type: DELETE_COMPANY_FAILURE, payload: error.message });
  }
};
