import { ApiClient } from "@/services/ApiClient";

const base_url_api = process.env.NEXT_PUBLIC_APP_URL_API || '';

const backendClient = new ApiClient(base_url_api);

export const fetchHabits = async () => {
    const response = await backendClient.get('/habits');
    return response
}
