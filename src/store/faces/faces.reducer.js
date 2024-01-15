import { FACES_ACTION_TYPES } from "./faces.types";

const INITIAL_STATE = {
  newDetectedFaces: {
    detectedFaces: null,
    detectedAge:0,
    detectedFamous:'',
    detectedGender:''
  },
  isLoading:false,
  error:null,
  counter:0
};

export const facesReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case FACES_ACTION_TYPES.FETCH_FACES_START:
      return {
        ...state,
        isLoading: true,
      };
    case FACES_ACTION_TYPES.FETCH_FACES_SUCCESS:
      return { ...state, isLoading: false, newDetectedFaces: payload };
    case FACES_ACTION_TYPES.COUNTER:
      return { ...state, counter: state.counter + 1 }; 
    case FACES_ACTION_TYPES.FACES_CATEGORIES_FAILED:
      return { ...state, isLoading: false, error: payload };
    default:
      return state;
  }
};
