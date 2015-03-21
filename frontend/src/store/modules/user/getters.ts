import { GetterTree } from 'vuex';
import { State } from './state';

export type Getters = {
  isAuthenticated(state: State): boolean,
};

export const getters: GetterTree<State, State> & Getters = {
  isAuthenticated: (state: State) => !!state.accessToken,
};
