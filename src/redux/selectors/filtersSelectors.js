export const selectLocation = (state) => state.filters.location;
export const selectVehicleType = (state) => state.filters.vehicleType;
export const selectEquipment = (state) => state.filters.equipment;
export const selectEngine = (state) => state.filters.engine;
export const selectTransmission = (state) => state.filters.transmission;
export const selectAllFilters = (state) => ({
    location: state.filters.location,
    vehicleType: state.filters.vehicleType,
    equipment: state.filters.equipment,
    engine: state.filters.engine,
    transmission: state.filters.transmission,
});