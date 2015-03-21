import { Comment } from '@/rest-api/comments/assets';

export interface State {
  loading: boolean;
  commentCursor: boolean;
  comment?: Comment;
  modal?: string;
}

export const state: State = {
  loading: true,
  commentCursor: true,
  comment: undefined,
  modal: undefined,
};
