import { MutationTree } from 'vuex';

import {
  LOADING,
  CURRENCY,
  COMMENT_CURSOR,
  SHOW_COMMENT,
  HIDE_COMMENT,
  SHOW_MODAL,
  HIDE_MODAL,
  CHART_PERIOD,
  PERIOD_TYPE,
  VIEW_TYPE,
  SELECTED_ROWS,
  HIDEFORECASTEDITINGMODAL,
  LIST_VIEW_TYPE,
  LIST_SHOW_SYMBOL,
  LIST_ADDED_FIELDS,
  LIST_REMOVED_FIELDS,
  LIST_HIGHLIGHT,
  CHART_PARAMS,
  NOTE_SORT_TYPE,
  NOTE_FONT_TYPE,
  NOTE_ADDITIONAL,
  COMPARE_COMPANY_LIST,
  IS_MOBILE,
} from '@/store/actions/application';

import { Comment } from '@/rest-api/comments/assets';

import { State } from './state';

export type Mutations<S = State> = {
  [LOADING](state: S, status: boolean): void,
  [IS_MOBILE](state: S, status: boolean): void,
  [CURRENCY](state: S, name: string): void,
  [COMMENT_CURSOR](state: S, status: boolean): void,
  [SHOW_COMMENT](state: S, comment: Comment): void,
  [HIDE_COMMENT](state: S): void,
  [SHOW_MODAL](state: S, name: string): void,
  [HIDE_MODAL](state: S): void,
  [PERIOD_TYPE](state: S, name: string): void,
  [CHART_PERIOD](state: S, name: string): void,
  [CHART_PARAMS](state: S, status: Array<string>): void,
  [VIEW_TYPE](state: S, name: string): void,
  [SELECTED_ROWS](state: S, rows: any[]): void,
  [HIDEFORECASTEDITINGMODAL](state: S, status: boolean): void,
  [LIST_VIEW_TYPE](state: S, name: string): void,
  [LIST_SHOW_SYMBOL](state: S, status: boolean): void,
  [LIST_ADDED_FIELDS](state: S, status: Array<string>): void,
  [LIST_REMOVED_FIELDS](state: S, status: Array<string>): void,
  [LIST_HIGHLIGHT](state: S, status: boolean): void,
  [NOTE_SORT_TYPE](state: S, status: number): void,
  [NOTE_FONT_TYPE](state: S, status: string): void,
  [NOTE_ADDITIONAL](state: S, status: Array<number>): void,
  [COMPARE_COMPANY_LIST](state: S, status: Array<string>): void,
}

export const mutations: MutationTree<State> & Mutations = {
  [LOADING]: (state, status: boolean) => {
    state.loading = status;
  },
  [IS_MOBILE]: (state, status: boolean) => {
    state.isMobile = status;
  },
  [CURRENCY]: (state, name: string) => {
    state.currency = name;
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
  [PERIOD_TYPE]: (state, name: string) => {
    state.periodType = name;
  },
  [CHART_PERIOD]: (state, name: string) => {
    state.chartPeriod = name;
  },
  [CHART_PARAMS]: (state, status: Array<string>) => {
    state.chartParams = status;
  },
  [VIEW_TYPE]: (state, name: string) => {
    state.viewType = name;
  },
  [NOTE_SORT_TYPE]: (state, name: number) => {
    state.noteSortType = name;
  },
  [NOTE_FONT_TYPE]: (state, name: string) => {
    state.noteFontType = name;
  },
  [NOTE_ADDITIONAL]: (state, types: Array<number>) => {
    state.noteAdditionalTypes = types;
  },
  [SELECTED_ROWS]: (state, rows: any[]) => {
    state.selectedRows = rows;
  },
  [HIDEFORECASTEDITINGMODAL]: (state, status: boolean) => {
    state.forecastEditingModalShow = status;
  },
  [LIST_VIEW_TYPE]: (state, name: string) => {
    state.listViewType = name;
  },
  [LIST_SHOW_SYMBOL]: (state, status: boolean) => {
    state.listShowSymbol = status;
  },
  [LIST_ADDED_FIELDS]: (state, status: Array<string>) => {
    state.listAddedFields = status;
  },
  [LIST_REMOVED_FIELDS]: (state, status: Array<string>) => {
    state.listRemoveFields = status;
  },
  [LIST_HIGHLIGHT]: (state, status: boolean) => {
    state.listHighlight = status;
  },
  [COMPARE_COMPANY_LIST]: (state, types: Array<string>) => {
    state.compareCompanyList = types;
  },
};
