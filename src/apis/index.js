import axios from "axios";
import { BASE_URL } from "~/utils/constants";
//board
export const fetchBoardDetailApi = async (id) => {
    const response = await axios.get(`${BASE_URL}/v1/boards/${id}`)
    return response.data
}

export const updateBoardDetailApi = async (id, updateData) => {
 
    const response = await axios.put(`${BASE_URL}/v1/boards/${id}`, updateData)
    return response.data
}

export const moveCardDifferentColumnApi = async (updateData) => {
 
    const response = await axios.put(`${BASE_URL}/v1/boards/supports/moving_card`, updateData)
    return response.data
}
//column
export const createNewColumns = async (newColumnData) => {
    const response = await axios.post(`${BASE_URL}/v1/columns`,newColumnData)
    return response.data
}
export const updateColumnDetailApi = async (id, updateData) => {
 
    const response = await axios.put(`${BASE_URL}/v1/columns/${id}`, updateData)
    return response.data
}
export const deleteColumnDetailApi = async (id) => {
 
    const response = await axios.delete(`${BASE_URL}/v1/columns/${id}`)
    return response.data
}

//cards

export const createNewCards = async (newCardData) => {
    const response = await axios.post(`${BASE_URL}/v1/cards`,newCardData)
    return response.data
}
