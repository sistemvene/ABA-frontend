// src/services/session_middleware.js

import api from './api';


const SESSION_KEY = 'ABA_SESSION_TOKEN';


export const session = {

  async requestOTP(email) {

    try {

      const res = await api.post('/auth/request-otp', { email });

      return res.data; // Mensaje de "OTP enviado"

    } catch (error) {

      console.error('Error solicitando OTP:', error);

      throw error.response?.data || { error: 'Error solicitando OTP' };

    }

  },


  async verifyOTP(email, otp) {

    try {

      const res = await api.post('/auth/verify-otp', { email, otp });

      const token = res.data?.token;

      if (token) localStorage.setItem(SESSION_KEY, token);

      return token;

    } catch (error) {

      console.error('Error verificando OTP:', error);

      throw error.response?.data || { error: 'Error verificando OTP' };

    }

  },


  logout() {

    localStorage.removeItem(SESSION_KEY);

  },


  getToken() {

    return localStorage.getItem(SESSION_KEY);

  },


  isAuthenticated() {

    return !!this.getToken();

  },

};

