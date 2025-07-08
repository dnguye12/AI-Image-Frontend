import axios from "axios"

const baseUrl = import.meta.env.VITE_API_URL

export const getImagesRecent = async() => {
    const query = baseUrl + `/image/recent`

    try {
        const request = await axios.get(query)

        return request.data
    }catch(error) {
        console.log(error)
        return null
    }
}

export const postImage = async (prompt: string, model: string, width: number, height: number, seed: number, createdBy: string, imageLink: string) => {
    const query = baseUrl + `/image`

    try {
        const request = await axios.post(query, {
            prompt,
            model,
            width,
            height,
            seed,
            createdBy,
            imageLink
    })

        return request.data
    } catch (error) {
        console.log(error)
        return null
    }
}