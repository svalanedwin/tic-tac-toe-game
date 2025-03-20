import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

// Helper function to set headers with token
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Auth Services
export const registerUser = async (userData) => {
  return axios.post(`${API_BASE_URL}/auth/register`, userData);
};

export const loginUser = async (credentials) => {
  return axios.post(`${API_BASE_URL}/auth/login`, credentials);
};

// Game Services
export const createGameSession = async (startWithPlayer) => {
  return axios.post(`${API_BASE_URL}/game/create_game_session`, { startWithPlayer }, getAuthHeaders());
};

export const makePlayerMove = async (payload) => {
  return axios.post(`${API_BASE_URL}/game/player_move`, payload, getAuthHeaders());
};

export const makeComputerMove = async (payload) => {
  return axios.post(`${API_BASE_URL}/game/pc_move`, payload, getAuthHeaders());
};



export const getGameSession = async (sessionId) => {
  return axios.get(`${API_BASE_URL}/game?sessionId=${sessionId}`, getAuthHeaders());
};

export const getGameStats = async () => {
  return axios.get(`${API_BASE_URL}/stats`, getAuthHeaders());
};