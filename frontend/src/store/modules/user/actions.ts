import { ActionTree, ActionContext } from 'vuex';

import { AccessToken, User } from '@/rest-api/users/assets';
import * as api from '@/rest-api/users';

import { SIGNIN_REQUEST, SIGNUP_REQUEST, AUTH_SUCCESS } from '@/store/actions/user';

import { Mutations } from './mutations';
import { State } from './state';

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, State>, 'commit'>

export interface Actions {
  [SIGNIN_REQUEST](
    { commit }: AugmentedActionContext,
    { email, password }: { email: string, password: string },
  ): Promise<AccessToken>;
  [SIGNUP_REQUEST](
    { commit }: AugmentedActionContext,
    { email, password }: { email: string, password: string },
  ): Promise<User>;
}

export const actions: ActionTree<State, State> & Actions = {
  [SIGNIN_REQUEST]: ({ commit }, { email, password }) => new Promise((resolve, reject) => {
    api.login(email, password).then((payload) => {
      commit(AUTH_SUCCESS, payload.accessToken);
      resolve(payload);
    }).catch((error) => reject(error));
  }),
  [SIGNUP_REQUEST]: ({ commit }, { email, password }) => new Promise((resolve, reject) => {
    api.register(email, password).then((payload) => {
      resolve(payload);
    }).catch((error) => reject(error));
  }),
};
