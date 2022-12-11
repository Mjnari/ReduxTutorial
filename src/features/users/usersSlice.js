import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { client } from '../../api/client';

const initialState = [];

export function selectAllUsers(state) {
  return state.users;
}

export function selectUserById(state, userId) {
  return state.users.find(user => user.id === userId);
};

const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get('/fakeApi/users');
  return response.data;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload;
    })
  }
});

export { fetchUsers };

export default usersSlice.reducer;
