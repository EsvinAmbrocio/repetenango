import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLoginUser, fetchRegisterUser } from './userAPI';
import { error } from 'console';
import { getErrorMessage } from '@/utils/error';
import { backendClient } from '@/services/backendApi';
import { setCookie } from 'cookies-next';

interface UserThunk {
  username: string;
  password: string;
}

type user = {
  token: string;
}

type userState = {
  user: user | null;
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
  error: string | null;
}

const initialState: userState = {
  user: null,
  status: 'idle',
  error: null
}

export const fetchRegisterUserThunk = createAsyncThunk("user/fetchRegisterUser", async (user: UserThunk, { rejectWithValue}) => {
  try {
    const response = await fetchRegisterUser(user.username, user.password);
    return response;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
})

export const fetchLoginUserThunk = createAsyncThunk("user/fetchLoginUser", async (user:   UserThunk, { rejectWithValue}) => {
  try {
    const response = await fetchLoginUser(user.username, user.password);
    backendClient.setGlobalHeader('authorization', `Bearer ${response.token}`);
    setCookie('habitToken', response.token)
    return response;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRegisterUserThunk.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.user = null
      state.error = "";
      alert("Usuario registrado correctamente")
    })
    .addCase(fetchRegisterUserThunk.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string;
      alert(action.payload)
    })
    .addCase(fetchLoginUserThunk.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.user = action.payload;
      state.error = "";
      alert("Usuario logueado correctamente")
    })
    .addCase(fetchLoginUserThunk.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string;
      alert(action.payload)
    })
  }
})

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
