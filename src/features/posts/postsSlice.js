import { createSlice, nanoid, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { client } from '../../api/client';

const initialState = {
  posts: [],
  status: 'idle',
  error: null
};

const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts');
  return response.data;
});

const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
  const response = await client.post('/fakeApi/posts', initialPost);
  return response.data;
});

export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter(post => post.user === userId)
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            user: userId,
            date: new Date().toISOString(),
            reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 }
          }
        }
      }
    },
    postUpdated: {
      reducer(state, action) {
        const { id, title, content } = action.payload;
        const existingPost = state.posts.find(post => post.id === id);
        if (existingPost) {
          existingPost.title = title;
          existingPost.content = content;
        }
      }
    },
    reactionAdded: {
      reducer(state, action) {
        const { id, reaction } = action.payload;
        const existingPost = state.posts.find(post => post.id === id);
        if (existingPost) {
          existingPost.reactions[reaction]++;
        }
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      }).addCase(addNewPost.fulfilled, (state, action) => {
        // We can directly add the new post object to our posts array
        state.posts.push(action.payload)
      });
  }
});

function selectAllPosts(state) {
  return state.posts.posts;
};

function selectPostById(state, postId) {
  return state.posts.posts.find(post => post.id === postId);
}

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;

export { selectAllPosts, selectPostById, fetchPosts, addNewPost };
