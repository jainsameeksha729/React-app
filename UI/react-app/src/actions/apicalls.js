import axios from "axios";
// import history from '../routes/history';

// api calls
export const apiCalls = (method, url, data = {}) => {
  if (method === "get") {
    // only for get
    return axios({ method: method, url: url, params: data });
  } else {
    // post, put, delete
    return axios({ method: method, url: url, data: data });
  }
};