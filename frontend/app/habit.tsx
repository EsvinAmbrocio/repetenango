import type { Habit } from "@/features/habit/habitSlice";

export default function HabitCard({ habit }: { habit: Habit }) {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white w-full m-3">
            <div className="font-bold text-xl mb-2">{habit.title}</div>
            <p className="text-gray-700 text-base">{habit.description}</p>
        </div>
    );
}