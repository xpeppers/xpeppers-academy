import axios from 'axios'
import { apiBaseUrl } from './configuration'

function isNot(activityToDelete) {
  return (activity) => {
    return !(activityToDelete.date === activity.date &&
          activityToDelete.author === activity.author &&
          activityToDelete.title === activity.title &&
          activityToDelete.type === activity.type)
  }
}

function hasTitleOrAuthorOrTypeContaining(text) {
  return (activity) => {
    return (activity.title && activity.title.toLowerCase().includes(text.toLowerCase())) ||
           (activity.author && activity.author.toLowerCase().includes(text.toLowerCase())) ||
           (activity.type && activity.type.toLowerCase().includes(text.toLowerCase()))
  }
}

export const searchActivities = (text, activities) => activities.filter(hasTitleOrAuthorOrTypeContaining(text))
export const listActivities = () => axios.get(`${apiBaseUrl}/read`).then(({data}) => data)
export const addActivity = (activity) => axios.post(`${apiBaseUrl}/save`, activity).then(() => activity)
export const deleteActivity = (activity, activities) => axios.post(`${apiBaseUrl}/delete`, activity).then(data => activities.filter(isNot(activity)))
