import axios from 'axios';


const authApi = axios.create({
  baseURL: process.env.REACT_APP_AUTH_API_URL
});

const parkingApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

const idCardApi = axios.create({
  baseURL: process.env.REACT_APP_ID_API_URL
});


const setupResponseInterceptor = (apiInstance) => {
  apiInstance.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (
        error.response &&
        error.response.status === 401 &&
        error.response.data &&
        error.response.data.detail === "Token has expired"
      ) {
        window.location.href = "/session_expired";
        return Promise.reject(new Error("Token has expired"));
      } else {
        return Promise.reject(error);
      }
    }
  );
};


setupResponseInterceptor(authApi);
setupResponseInterceptor(parkingApi);
setupResponseInterceptor(idCardApi);

export { authApi, parkingApi, idCardApi };