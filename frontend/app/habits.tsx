import { fetchHabitsThunk, fetchMarkAsDoneThunk, Habit } from "@/features/habit/habitSlice";
import HabitComponent from "./habit";
import { AppDispatch, AppState } from "@/Redux/store";
import { useSelector } from "react-redux";
type Habits = {
    habits: Habit[];
}
const handleMarkAsDone = async (dispatch: AppDispatch, habitId: string) => {
  dispatch(fetchMarkAsDoneThunk(habitId))
  dispatch(fetchHabitsThunk())
}
export default function Habits({ habits }: Habits) {
  const calculateProgress = (days:number):number => {
    return Math.min((days/66)*100,100)
  }
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {habits.map(habit => (
                <HabitComponent habit={habit}
                  key={habit._id}
                  progress={calculateProgress(habit.days)}
                  onClickMarketAsDone={handleMarkAsDone} />
            ))}
        </div>
    );
}
