import {
  SET_MESSAGE,
  SET_SHOW_INSTRUCTIONS,
  SET_SHOW_LOADER,
  SET_SHOW_PEDOMETER,
} from './actions';

export type State = {
  showInstructions: boolean;
  showLoader: boolean;
  message: string;
  showPedometer: boolean;
};

export type Action =
  | {type: typeof SET_SHOW_INSTRUCTIONS; payload: boolean}
  | {type: typeof SET_SHOW_LOADER; payload: boolean}
  | {type: typeof SET_MESSAGE; payload: string}
  | {type: typeof SET_SHOW_PEDOMETER; payload: boolean};
