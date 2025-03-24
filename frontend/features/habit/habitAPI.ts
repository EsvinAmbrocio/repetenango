import { ApiClient } from "@/services/ApiClient";
import { Habit } from "./habitSlice";
import { ResponseHttp } from "@/types";


const base_url_api = process.env.NEXT_PUBLIC_APP_URL_API || '';

const backendClient = new ApiClient(base_url_api);

export const fetchHabits = async ():Promise<Habit[]> => {
    const response:Habit[] = await backendClient.get('/habits');
    return response
}

export const fetchMarkAsDone = async (habitId: string):Promise<ResponseHttp> => {
    const response = await backendClient.patch(`/habits/markasdone/${habitId}`,{});
    return response
}
