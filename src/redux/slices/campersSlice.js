import { createSlice } from '@reduxjs/toolkit';
import {
    fetchCampers,
    fetchCamperById,
} from '../operations/campersOperations';

const loadFavorites = () => {
    try {
        const stored = localStorage.getItem('campers_favorites');
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
};

const saveFavorites = favorites => {
    localStorage.setItem(
        'campers_favorites',
        JSON.stringify(favorites)
    );
};

const initialState = {
    items: [],
    currentCamper: null,
    favorites: loadFavorites(),
    page: 1,
    hasMore: true,
    loading: false,
    error: null,
    searchPerformed: false,
};

const campersSlice = createSlice({
    name: 'campers',

    initialState,

    reducers: {
        toggleFavorite: (state, action) => {
            const id = action.payload;
            const index = state.favorites.indexOf(id);

            if (index === -1) {
                state.favorites.push(id);
            } else {
                state.favorites.splice(index, 1);
            }

            saveFavorites(state.favorites);
        },

        clearCurrentCamper: state => {
            state.currentCamper = null;
        },

        resetCampers: state => {
            state.items = [];
            state.page = 1;
            state.hasMore = true;
            state.searchPerformed = false;
            state.loading = false;
            state.error = null;
        },
    },

    extraReducers: builder => {
        builder
            .addCase(fetchCampers.pending, state => {
                state.loading = true;
                state.error = null;
                state.searchPerformed = false;
            })

            .addCase(fetchCampers.fulfilled, (state, action) => {
                state.loading = false;

                const items = Array.isArray(action.payload)
                    ? action.payload
                    : [];

                state.items = items;
                state.searchPerformed = true;
            })

            .addCase(fetchCampers.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload || 'Failed to fetch campers';
                state.searchPerformed = true;
                state.items = [];
            })

            .addCase(fetchCamperById.pending, state => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchCamperById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentCamper = action.payload;
            })

            .addCase(fetchCamperById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {
    toggleFavorite,
    clearCurrentCamper,
    resetCampers,
} = campersSlice.actions;

export default campersSlice.reducer;