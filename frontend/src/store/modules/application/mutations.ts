import { MutationTree } from 'vuex';

import {
  LOADING,
  COMMENT_CURSOR,
  SHOW_COMMENT,
  HIDE_COMMENT,
  SHOW_MODAL,
  HIDE_MODAL,
} from '@/store/actions/application';

import { Comment } from '@/rest-api/comments/assets';

import { State } from './state';

export type Mutations<S = State> = {
  [LOADING](state: S, status: boolean): void,
  [COMMENT_CURSOR](state: S, status: boolean): void,
  [SHOW_COMMENT](state: S, comment: Comment): void,
  [HIDE_COMMENT](state: S): void,
  [SHOW_MODAL](state: S, name: string): void,
  [HIDE_MODAL](state: S): void,
}

export const mutations: MutationTree<State> & Mutations = {
  [LOADING]: (state, status: boolean) => {
    state.loading = status;
  },
  [COMMENT_CURSOR]: (state, status: boolean) => {
    state.commentCursor = status;
  },
  [SHOW_COMMENT]: (state, comment: Comment) => {
    state.comment = comment;
  },
  [HIDE_COMMENT]: (state) => {
    state.comment = undefined;
  },
  [SHOW_MODAL]: (state, name: string) => {
    state.modal = name;
  },
  [HIDE_MODAL]: (state) => {
    state.modal = undefined;
  },
};
