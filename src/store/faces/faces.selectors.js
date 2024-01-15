import { createSelector } from 'reselect';

const selectFacesReducer = (state) => state.faces;
const selectNewFaces = (state) => state.faces.newDetectedFaces;

export const selectFacesStore = createSelector(
  [selectFacesReducer],
  (facesSlice)=>facesSlice
)

export const selectFacesCounet = createSelector(
  [selectFacesReducer],
  (facesSlice) => facesSlice.counter

)

export const selectNewDetectedFaces = createSelector(
    [selectNewFaces],
    (facesSlice) => facesSlice.detectedFaces
  );

  export const selectFacesIsLoading = createSelector(
    [selectFacesReducer],
    (facesSlice) => facesSlice.isLoading
  );

  export const selectFacesAge = createSelector(
    [selectFacesReducer],
    (facesSlice) => facesSlice.newDetectedFaces.detectedAge
  );

  export const selectFacesFamous = createSelector(
    [selectFacesReducer],
    (facesSlice) => facesSlice.newDetectedFaces.detectedFamous
  );

  export const selectFacesGender = createSelector(
    [selectFacesReducer],
    (facesSlice) => facesSlice.newDetectedFaces.detectedGender
  );

  export const selectFacesError = createSelector(
    [selectFacesReducer],
    (facesSlice) => facesSlice.error
  );