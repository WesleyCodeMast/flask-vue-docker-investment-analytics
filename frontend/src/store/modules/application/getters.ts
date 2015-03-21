import { GetterTree } from 'vuex';
import { State } from './state';

export type Getters = {
  isPreloaderShown(state: State): boolean,
};

export const getters: GetterTree<State, State> & Getters = {
  isPreloaderShown: (state: State) => state.loading,
};
