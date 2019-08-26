import axios from 'axios'
import { apiBaseUrl } from './configuration'

export const listActivities = () => axios.get(`${apiBaseUrl}/read`).then(({data}) => data)
export const addActivity = (activity) => axios.post(`${apiBaseUrl}/save`, activity)
