import type { Habit } from "@/features/habit/habitSlice";

/**
 * A React component that renders a card displaying information about a habit.
 *
 * @param {Object} props - The properties object.
 * @param {Habit} props.habit - The habit object containing details to be displayed.
 * @returns {JSX.Element} A JSX element representing the habit card.
 */
export default function HabitCard({ habit }: { habit: Habit }) {
    return (
        <div className="max-w-md rounded-lg overflow-hidden shadow-md mt-8 p-4 bg-white w-full m-3">
            <div className="font-bold text-xl mb-2">{habit.title}</div>
            <p className="text-gray-700 text-base">{habit.description}</p>
            <div className="flex items-center justify-between space-x-2">
                <progress className="flex-1" value="50" max="100"></progress>
                <div>
                    <button className="flex-1 px-2 py-1 text-sm text-white bg-blue-500 rounded">
                        Mark as done
                    </button>
                </div>
            </div>
        </div>
    );
}