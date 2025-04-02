import { getCookie } from "cookies-next";
import { ApiClient } from "./ApiClient";

const base_url_api = process.env.NEXT_PUBLIC_APP_URL_API || '';
const tocken = getCookie('habitToken') || '';

export const backendClient = new ApiClient(base_url_api, {
  'authorization': `Bearer ${tocken}`,
});
