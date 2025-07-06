import axios from "axios"

const baseUrl = import.meta.env.VITE_API_URL

export const getUser = async (id: string) => {
    const query = baseUrl + `/user/${id}`

    try {
        const request = await axios.get(query)
        return request
    } catch (error) {
        console.log(error)
        return null
    }
}

export const postUser = async (id: string) => {
    const query = baseUrl + `/user`
    try {
        const request = await axios.post(query, {
            id
        })
        return request.data
    } catch (error) {
        console.log(error)
        return null
    }
}