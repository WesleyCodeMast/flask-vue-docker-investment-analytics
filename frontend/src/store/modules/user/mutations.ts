import { MutationTree } from 'vuex';

import { AUTH_SUCCESS } from '@/store/actions/user';

import { State } from './state';

export type Mutations<S = State> = {
  [AUTH_SUCCESS](state: S, accessToken: string): void,
}

export const mutations: MutationTree<State> & Mutations = {
  [AUTH_SUCCESS]: (state, accessToken: string) => {
    localStorage.setItem('access-token', accessToken);
    state.accessToken = accessToken;
  },
};
