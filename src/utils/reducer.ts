import {
  SET_MESSAGE,
  SET_SHOW_INSTRUCTIONS,
  SET_SHOW_LOADER,
  SET_SHOW_PEDOMETER,
} from './actions';
import {Action, State} from './types';

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_SHOW_INSTRUCTIONS:
      return {...state, showInstructions: action.payload};
    case SET_SHOW_LOADER:
      return {...state, showLoader: action.payload};
    case SET_MESSAGE:
      return {...state, message: action.payload};
    case SET_SHOW_PEDOMETER:
      return {...state, showPedometer: action.payload};
    default:
      throw new Error('Unknown action type');
  }
};
