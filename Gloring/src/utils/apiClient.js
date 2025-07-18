import React from 'react'
import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://43.201.67.86:8090/gloring',
})

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
}, (error) => Promise.reject(error))

export default apiClient