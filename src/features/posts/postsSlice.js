import { createSlice, nanoid } from '@reduxjs/toolkit';
import { sub } from 'date-fns';

const initialState = [
  {
    id: '1',
    title: 'First Post!',
    content: 'Hello!',
    date: sub(new Date(), { minutes: 10}).toISOString(),
    reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0}
  },
  {
    id: '2',
    title: 'Second Post',
    content: 'More text',
    date: sub(new Date(), { minutes: 5}).toISOString(),
    reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0}
  }
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            user: userId,
            date: new Date().toISOString(),
            reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0}
          }
        }
      }
    },
    postUpdate: {
      reducer(state, action) {
        const {id, title, content } = action.payload;
        const existingPost = state.find(post => post.id === id);
        if (existingPost) {
          existingPost.title = title;
          existingPost.content = content;
        }
      }
    },
    reactionAdded: {
      reducer(state, action) {
        const {id, reaction} = action.payload;
        const existingPost = state.find(post => post.id === id);
        if (existingPost) {
          existingPost.reactions[reaction]++;
        }
      }
    },
  },
});

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
