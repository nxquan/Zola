import axios from 'axios'

export const authenInstance = axios.create({
    baseURL: process.env.REACT_APP_AUTHEN_API,
    withCredentials: true,
})

export const get = async  (url, config={}) => {
    const res = await authenInstance.get(url, config)
    
    return res.data
}

export const post = async (url, data,  config={}) => {
    const res = await authenInstance.post(url, data, config)
    console.log('res.data', res.data)

    return res.data
}