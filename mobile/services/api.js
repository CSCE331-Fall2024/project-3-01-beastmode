import axios from 'axios';
import { Platform } from 'react-native';

// Determine if we are in development mode
const isLocalhost = __DEV__;

// Define base URLs
const localBaseURL = 'http://127.0.0.1:5001/api/';
const productionBaseURL = 'https://project-3-01-beastmode-1fed971de919.herokuapp.com/api/';

// Create a primary axios instance with local URL
const api = axios.create({
  baseURL: isLocalhost ? localBaseURL : productionBaseURL,
});

// Add an interceptor to handle requests and fallback if necessary
api.interceptors.response.use(
  response => response, // Pass through successful responses
  async error => {
    // If the request fails and was using the local base URL, try the production URL
    if (isLocalhost && error.config && !error.response) {
      // Change the baseURL to production and retry the request
      error.config.baseURL = productionBaseURL;
      return axios.request(error.config);
    }
    return Promise.reject(error);
  }
);

export default api;
