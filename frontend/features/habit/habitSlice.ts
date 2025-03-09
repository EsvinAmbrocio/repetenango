import { createSlice } from '@reduxjs/toolkit';

type Habit = {
    id: string,
    title: string,
    description: string
    createdAt: string
}

type HabitState = {
    habits: Habit[]
}

const initialState: HabitState = {
    habits: []
}

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
    }
})

export const { addHabits, addHabit, removeHabit } = habitSlice.actions;
export default habitSlice.reducer;