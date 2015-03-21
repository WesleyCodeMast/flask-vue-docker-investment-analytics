export interface State {
  accessToken: string;
}

export const state: State = {
  accessToken: localStorage.getItem('access-token') || '',
};
