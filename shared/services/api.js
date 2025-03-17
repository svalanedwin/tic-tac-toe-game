import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const registerUser = async (userData) => {
    return axios.post('${API_BASE_URL}/auth/register', userData);
};

export const loginUser = async (credentials) => {
    return axios.post('${API_BASE_URL}/auth/login', credentials);
};

export const createGameSession = async (startWithPlayer) => {
    return axios.post('${API_BASE_URL}/game/create_game_session', {startWithPlayer});
};

export const makePlayerMove = async (sessionId, board) => {
    return axios.post('${API_BASE_URL}/game/player_move', {sessionId, board});
};

export const makeComputerMove = async (sessionId, board) =>{
    return axios.post('${API_BASE_URL}/game/pc_move', {sessionId, board});
};

export const getGameSession = async (sessionId) => {
    return axios.get('${API_BASE_URL}/game?sessionId=${sessionId}');
};

export const getGameStats = async () => {
    return axios.get('${API_BASE_URL}/stats');
};