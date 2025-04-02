import { backendClient } from "@/services/backendApi";
import { ResponseHttp, ResponseHttpLogin } from "@/types";

/**
 * Registers a new user by sending their username and password to the backend API.
 *
 * @param username - The username of the user to be registered.
 * @param password - The password of the user to be registered.
 * @returns A promise that resolves to the response from the backend API.
 */
export async function fetchRegisterUser(
  username: string,
  password: string
){
  const response:ResponseHttp = await backendClient.post('/users/register', {
    username,
    password
  })
  return response;
}

export async function fetchLoginUser(
  username: string,
  password: string
){
  const response:ResponseHttpLogin = await backendClient.post('/users/login', {
    username,
    password
  },{},{},{
    credentials: 'include'
  })
  return response;
}
