import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchHabits } from './habitAPI';

export type Habit = {
    _id: string,
    title: string,
    description: string
    created_at: string
}

type HabitState = {
    habits: Habit[]
}

const initialState: HabitState = {
    habits: []
}

export const fetchHabitsThunk = createAsyncThunk<Habit[]>("habit/fetchHabits", async () => {
    return await fetchHabits();
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
            state.habits = state.habits.filter(habit => habit.id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchHabitsThunk.fulfilled, (state, action) => {
            state.habits = action.payload
        })
    }
})

export const { addHabits, addHabit, removeHabit } = habitSlice.actions;
export default habitSlice.reducer;
