import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers';

const buildQueryParams = (filters) => {
    const params = {};
    if (filters?.location?.trim()) {
        params.location = filters.location.trim();
    }
    return params;
};

export const fetchCampers = createAsyncThunk(
    'campers/fetchCampers',
    async ({ filters = null }, { rejectWithValue }) => {
        try {
            const params = buildQueryParams(filters);
            const response = await axios.get(API_URL, { params });
            const items = Array.isArray(response.data) ? response.data : (response.data.items || []);
            return items;
        } catch (error) {
            // Если 404 — возвращаем пустой массив (No campers found)
            if (error.response?.status === 404) {
                return [];
            }
            return rejectWithValue(error.message);
        }
    }
);

export const fetchCamperById = createAsyncThunk(
    'campers/fetchCamperById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);