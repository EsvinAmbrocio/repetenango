'use client'

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchHabitsThunk } from "@/features/habit/habitSlice";
import { AppState, AppDispatch } from "@/Redux/store";
import Habits from "./habits";
import { deleteCookie, getCookie } from "cookies-next";
import { addUser, fetchLoginUserThunk, fetchRegisterUserThunk } from "@/features/user/userSlice";
import { backendClient } from "@/services/backendApi";
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
  const handleLogout = async () => {
    dispatch(addUser(null))
    setUsername('')
    setPassword('')
    backendClient.removeGlobalHeader('authorization')
    deleteCookie('habitToken')
  }
  return (
    <div className="items-center justify-items-center min-h-screen bg-gray-100">
      {!user && (
            <div className="flex flex-col justify-center items-center min-h-screen">
              <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
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
              <div className="mt-6 flex justify-between">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md" onClick={handleLogin}>
              Login
              </button>
              <button className="px-4 py-2 bg-green-500 text-white rounded-md" onClick={handleRegister}>
              Register
              </button>
              </div>
              </div>
            </div>
      )}
      {user && (
        <div>
            <div className="flex justify-end mb-4">
            <button className="m-4 px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600" onClick={() => handleLogout()}>
              Logout
            </button>
            </div>
          <Habits  habits= {habits}/>
        </div>
      )}
    </div>
  );
}
