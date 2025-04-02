import { fetchCreateHabitThunk, fetchHabitsThunk, fetchMarkAsDoneThunk, Habit } from "@/features/habit/habitSlice";
import HabitComponent from "./habit";
import { AppDispatch, AppState } from "@/Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
type Habits = {
  habits: Habit[];
}
const handleMarkAsDone = async (dispatch: AppDispatch, habitId: string) => {
  await dispatch(fetchMarkAsDoneThunk(habitId))
  await dispatch(fetchHabitsThunk())
}
export default function Habits({ habits }: Habits) {
  const calculateProgress = (days: number): number => {
    return Math.min((days / 66) * 100, 100)
  }
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: AppState) => state.user.user);
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const handleHabit = async (event) => {
    event.preventDefault()
    if(!title || !description) return
    await dispatch(fetchCreateHabitThunk({ title, description }))
    setTitle('')
    setDescription('')
    await dispatch(fetchHabitsThunk())
  }
  return (
    <div>
      <div className="flex justify-center items-center">
        <form onSubmit={handleHabit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md  my-8">
          <fieldset>
            <legend className="text-lg font-semibold mb-4 text-center">Add new Habit</legend>
            <div className="space-y-4">
              <label className="block">
                <span className="text-gray-700">Title</span>
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Description</span>
                <input
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </label>
            </div>
            <button
              type="submit"
              className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add Habit
            </button>
          </fieldset>
        </form>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {habits.map(habit => (
          <HabitComponent habit={habit}
            key={habit._id}
            progress={calculateProgress(habit.days)}
            onClickMarketAsDone={handleMarkAsDone} />
        ))}
      </div>
    </div>
  );
}
