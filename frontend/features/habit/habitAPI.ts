import { Habit } from "./habitSlice";
import { ResponseHttp } from "@/types";
import { backendClient } from "@/services/backendApi";


export const fetchHabits = async ():Promise<Habit[]> => {
    const response:Habit[] = await backendClient.get('/habits');
    return response
}

export const fetchMarkAsDone = async (habitId: string):Promise<ResponseHttp> => {
    const response:ResponseHttp = await backendClient.patch(`/habits/markasdone/${habitId}`,{});
    return response
}

export const fetchCreateHabit = async (title: string, description: string):Promise<Habit> => {
  const response:Habit = await backendClient.post('/habits', {
    title,
    description
  });
  return response
}
