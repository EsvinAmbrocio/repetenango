import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchHabits, fetchMarkAsDone } from './habitAPI';
import { ApiError } from '@/types';

export type Habit = {
  _id: string,
  title: string,
  description: string,
  created_at: string,
  last_updated: Date,
  last_done: Date,
  days: number,
  started_at: Date
}

type HabitState = {
  habits: Habit[],
  status: Record<string, 'idle' | 'loading' | 'failed' | 'succeeded'>,
  error: Record<string, string | null>
}

type ResponseHttp = {
  message: string
}

const initialState: HabitState = {
  habits: [],
  status: {},
  error: {}
}
const getErrorMessage = (error: unknown): string => {
  if (error instanceof ApiError) {
    const message: string = error.message;
    const data: ResponseHttp = error.data as ResponseHttp;
    return String(data?.message ?? message);
  } else if (error instanceof Error) {
    return error.message;
  } else {
    return 'Error desconocido';
  }
};
export const fetchHabitsThunk = createAsyncThunk("habit/fetchHabits", async () => {
  const response = await fetchHabits();
  return response
});

export const fetchMarkAsDoneThunk = createAsyncThunk("habit/fetchMarkAsDone", async (habitId: string, { rejectWithValue }) => {
  try {
    const response:ResponseHttp = await fetchMarkAsDone(habitId);
    if(response.message.toString() === 'Habit restarted'){
      throw new Error(response.message)
    }
    return response.message
  } catch (error) {
    const responseMesssage = getErrorMessage(error);
    return rejectWithValue(responseMesssage)
  }
});

const habitSlice = createSlice({
  name: 'habit',
  initialState,
  reducers: {
    addHabits: (state, action) => {
      state.habits = action.payload
    },
    addHabit(state, action) {
      state.habits.push(action.payload)
    },
    removeHabit(state, action) {
      state.habits = state.habits.filter(habit => habit._id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHabitsThunk.fulfilled, (state, action) => {
      state.habits = action.payload
    }).addCase(fetchMarkAsDoneThunk.fulfilled, (state, action) => {
      state.status[action.meta.arg] = 'succeeded'
      state.error[action.meta.arg] = null
    }).addCase(fetchMarkAsDoneThunk.rejected, (state, action) => {
      state.status[action.meta.arg] = 'failed'
      state.error[action.meta.arg] = action.payload as string
    })
  }
})

export const { addHabits, addHabit, removeHabit } = habitSlice.actions;
export default habitSlice.reducer;
