import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    location: '',
    vehicleType: null,
    equipment: [],
    engine: '',
    transmission: '',
};

const filtersSlice = createSlice({
    name: 'filters',

    initialState,

    reducers: {
        setLocation: (state, action) => {
            state.location = action.payload;
        },

        setVehicleType: (state, action) => {
            state.vehicleType = action.payload;
        },

        toggleEquipment: (state, action) => {
            const id = action.payload;

            const index = state.equipment.indexOf(id);

            if (index === -1) {
                state.equipment.push(id);
            } else {
                state.equipment.splice(index, 1);
            }
        },

        setEngine: (state, action) => {
            state.engine = action.payload;
        },

        setTransmission: (state, action) => {
            state.transmission = action.payload;
        },

        resetFilters: (state) => {
            state.location = '';
            state.vehicleType = null;
            state.equipment = [];
            state.engine = '';
            state.transmission = '';
        },
    },
});

export const {
    setLocation,
    setVehicleType,
    toggleEquipment,
    setEngine,
    setTransmission,
    resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;