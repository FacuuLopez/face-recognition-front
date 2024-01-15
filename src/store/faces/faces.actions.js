import { createAction } from "../../utils/reducer/reducer.utils";
import { FACES_ACTION_TYPES } from "./faces.types";

export const fetchCategoriesStart = () =>
  createAction(FACES_ACTION_TYPES.FETCH_FACES_START);

export const fetchCategoriesSuccess = (newDetectedFaces) =>
  createAction(
    FACES_ACTION_TYPES.FETCH_FACES_SUCCESS,
    newDetectedFaces
  );

export const facesCounter = () => createAction(FACES_ACTION_TYPES.COUNTER);

export const fetchFacesSuccess = (newDetectedFaces) =>
  createAction(
    FACES_ACTION_TYPES.FETCH_FACES_SUCCESS,
    newDetectedFaces
  );

export const fetchFacesFailure = (error) =>
  createAction(FACES_ACTION_TYPES.FETCH_FACES_FAILED, error);

export const fetchCategoriesStartAsync = (imageURL) => {
  return async (dispatch) => {
    dispatch(fetchCategoriesStart());
    try {
      const response = await fetch('http://localhost:3000/imageURL', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl: imageURL
        })
      });
      try {
        const newDetectedFaces = await response.json();
        console.log(newDetectedFaces);
        dispatch(fetchFacesSuccess(newDetectedFaces));
      } catch (error) {
        dispatch(fetchFacesFailure(error));
      }
    } catch (error) {
      dispatch(fetchFacesFailure(error));
    }
  };
};


