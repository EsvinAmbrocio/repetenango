import type { Habit } from "@/features/habit/habitSlice";
import { AppDispatch, AppState } from "@/Redux/store";
import { useDispatch, useSelector } from "react-redux";

/**
 * A React component that renders a card displaying information about a habit.
 *
 * @param {Object} props - The properties object.
 * @param {Habit} props.habit - The habit object containing details to be displayed.
 * @param {number} props.progress - The progress of the habit.
 * @param {Function} props.onClickMarketAsDone - The function to be called when the user clicks the "Mark as done" button.
 * @returns {JSX.Element} A JSX element representing the habit card.
 */
export default function HabitCard({ habit, progress, onClickMarketAsDone }: { habit: Habit, progress:number, onClickMarketAsDone: (dispatch:AppDispatch, id:string) =>  void}) {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((state: AppState) => state.habit.status);
  const error = useSelector((state: AppState) => state.habit.error);
    return (
        <div className="max-w-md rounded-lg overflow-hidden shadow-md mt-8 p-4 bg-white w-full m-3">
            <div className="font-bold text-xl mb-2">{habit.title}</div>
            <p className="text-gray-700 text-base">{habit.description}</p>
            <div className="flex items-center justify-between space-x-2">
                <progress className="flex-1" value={progress} max="100"></progress>
                <div>
                    <button className="flex-1 px-2 py-1 text-sm text-white bg-blue-500 rounded"
                      onClick={() => onClickMarketAsDone(dispatch, habit._id)}>
                        {status[habit._id] === 'loading' ? 'Loading...' : 'Mark as done'}
                    </button>
                </div>
            </div>
            {status[habit._id] === 'failed' && <div className="text-red-500 text-sm">{error[habit._id]}</div>}
            {status[habit._id] === 'succeeded' && <div className="text-green-500 text-sm">Already marked as done</div>}
        </div>
    );
}
