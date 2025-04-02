import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCreateHabit, fetchHabits, fetchMarkAsDone } from './habitAPI';
import { ApiError } from '@/types';
import { getErrorMessage } from '@/utils/error';

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

type createHabitThunkParams = {
  title: string;
  description: string;
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
export const fetchCreateHabitThunk = createAsyncThunk("habit/fetchCreateHabit", async (params:createHabitThunkParams, { rejectWithValue }) => {
  try {
    const response = await fetchCreateHabit(params.title, params.description);
    return response
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
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
    }).addCase(fetchCreateHabitThunk.fulfilled, (state, action) => {
      state.habits.push(action.payload)
    })
  }
})

export const { addHabits, addHabit, removeHabit } = habitSlice.actions;
export default habitSlice.reducer;
