import axios from "axios";

// export const apiUrl ="https://apimonitora.herokuapp.com/api"; // http://apidev.maissaude.bybitx.com
export const apiUrl =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_DEV
    : process.env.REACT_APP_PROD; // http://apidev.maissaude.bybitx.com

export const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
export const apiUpload = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
