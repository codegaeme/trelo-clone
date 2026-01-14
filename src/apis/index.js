import axios from "axios";
import { BASE_URL } from "~/utils/constants";
export const fetchBoardDetailApi = async(id) => {
    const response =await axios.get(`${BASE_URL}/v1/boards/${id}`)
    return response.data
}   