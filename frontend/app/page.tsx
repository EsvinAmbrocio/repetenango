'use client'
import Image from "next/image";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchHabitsThunk } from "@/features/habit/habitSlice";
import { AppState, AppDispatch } from "@/Redux/store";
import Habits from "./habits";
export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const habits = useSelector((state: AppState) => state.habit.habits);
  useEffect(() => {
    dispatch(fetchHabitsThunk());
  }, [dispatch]);
  return (
    <div className="items-center justify-items-center min-h-screen bg-gray-100">
      <Habits  habits= {habits}/>
    </div>
  );
}
