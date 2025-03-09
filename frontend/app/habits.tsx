import { Habit } from "@/features/habit/habitSlice";
import HabitComponent from "./habit";
type Habits = {
    habits: Habit[];
}
export default function Habits({ habits }: Habits) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {habits.map(habit => (
                <HabitComponent habit={habit} key={habit._id} />
            ))}
        </div>
    );
}