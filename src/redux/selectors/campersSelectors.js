export const selectAllCampers = (state) => state.campers.items;
export const selectCampersLoading = (state) => state.campers.loading;
export const selectCampersError = (state) => state.campers.error;
export const selectHasMore = (state) => state.campers.hasMore;
export const selectCurrentPage = (state) => state.campers.page;
export const selectCurrentCamper = (state) => state.campers.currentCamper;
export const selectFavorites = (state) => state.campers.favorites;