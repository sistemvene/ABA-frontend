// src/services/api.js

import axios from 'axios';


const api = axios.create({

  baseURL: 'http://localhost:3000', // Cambiar por tu API Gateway o servicio auth

  timeout: 5000,

});


api.interceptors.request.use((config) => {

  const token = localStorage.getItem('ABA_SESSION_TOKEN');

  if (token) {

    config.headers.Authorization = `Bearer ${token}`;

  }

  return config;

});


export default api;

