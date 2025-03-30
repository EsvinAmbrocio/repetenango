'use client'

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchHabitsThunk } from "@/features/habit/habitSlice";
import { AppState, AppDispatch } from "@/Redux/store";
import Habits from "./habits";
import { getCookie } from "cookies-next";
import { addUser, fetchLoginUserThunk, fetchRegisterUserThunk } from "@/features/user/userSlice";
export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const habits = useSelector((state: AppState) => state.habit.habits);
  const user = useSelector((state: AppState) => state.user.user);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  useEffect(() => {
    const token = getCookie('habitToken')
    console.log(token)
    if(token) {
      dispatch(addUser(token))
    }
    if(user) {
      dispatch(fetchHabitsThunk())
    }
  }, [dispatch, user]);
  const handleLogin = async () => {
    if(!username || !password) return
    await dispatch(fetchLoginUserThunk({username, password}))
    setUsername('')
    setPassword('')
  }
  const handleRegister = async () => {
    if(!username || !password) return
    await dispatch(fetchRegisterUserThunk({username, password}))
    setUsername('')
    setPassword('')
  }
  return (
    <div className="items-center justify-items-center min-h-screen bg-gray-100">
      {!user && (
            <div className="flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md  my-8">
                <fieldset>
                  <legend className="text-lg font-semibold mb-4 text-center">Add new Habit</legend>
                  <div className="space-y-4">
                    <label className="block">
                      <span className="text-gray-700">Login / Register</span>
                      <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </label>
                    <label className="block">
                      <span className="text-gray-700">Password</span>
                      <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </label>
                  </div>
                </fieldset>
                <div className="flex space-x-4">
                  <button className="px-4 py-2 bg-blue-500 text-white rounted-md" onClick={handleLogin}>
                    Login
                  </button>
                  <button className="px-4 py-2 bg-green-500 text-white rounted-md" onClick={handleRegister}>
                    Register
                  </button>
                </div>
              </div>
            </div>
      )}
      {user && (
        <Habits  habits= {habits}/>
      )}
    </div>
  );
}
