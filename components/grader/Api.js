import axios from 'axios';

const BASE_URL = 'http://localhost:8000/';

export const enterInternalMarks = async (data) => {
  try {
    const response = await axios.post(
      `${BASE_URL}marksheets/enterInternalMarks`,
      data
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const enterExternalMarks = async (data) => {
  try {
    const response = await axios.post(
      `${BASE_URL}marksheets/enterExternalMark`,
      data
    );
    return response.data;
    console.log(response.data);
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const updateInternalMarks = async (data) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}marksheets/updateInternal`,
      data
    );
    return response.data;
    console.log(response.data);
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const updateExternalMarks = async (data) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}marksheets/updateExternalMark`,
      data
    );
    return response.data;
    console.log(response.data);
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getResult = async (data) => {
  try {
    const response = await axios.get(`${BASE_URL}marksheets/getResult`, {
      params: data,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
