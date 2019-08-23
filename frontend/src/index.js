import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import ListPage from './ListPage'
import RankingPage from './RankingPage'
import AddPage from './AddPage'
import * as serviceWorker from './serviceWorker'
import { Route, BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import { apiBaseUrl } from './lib/configuration'

const App = () => {
  const [activities, setActivities] = useState([])
  const [filtered, setFiltered] = useState([])

  const getActivities = () => {
    axios.get(`${apiBaseUrl}/read`)
      .then(({data}) => {
        setActivities(data)
        setFiltered(data)
      })
  }

  function isNot(activityToDelete) {
    return (activity) => {
      return !(activityToDelete.date === activity.date &&
            activityToDelete.author === activity.author &&
            activityToDelete.title === activity.title &&
            activityToDelete.type === activity.type)
    }
  }

  function searchActivities(text) {
    setFiltered(activities.filter(hasTitleOrAuthorOrTypeContaining(text)))
  }

  function hasTitleOrAuthorOrTypeContaining(text) {
    return (activity) => {
      return (activity.title && activity.title.toLowerCase().includes(text.toLowerCase())) ||
             (activity.author && activity.author.toLowerCase().includes(text.toLowerCase())) ||
             (activity.type && activity.type.toLowerCase().includes(text.toLowerCase()))
    }
  }

  function activityDeleted(activity) {
    setActivities(activities.filter(isNot(activity)))
    setFiltered(activities.filter(isNot(activity)))
  }

  function activityAdded(activity) {
    setActivities([...activities, activity])
    setFiltered([...activities, activity])
  }

  useEffect(() => {
    getActivities()
  }, [])

  return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
          <div className='router a1'>
              <Route exact path="/" render={() => <ListPage activityDeleted={activityDeleted} searchActivities={searchActivities} activities={filtered}/>}/>
              <Route exact path="/ranking" render={() => <RankingPage activities={activities}/>} />
              <Route exact path="/add" render={() => <AddPage activityAdded={activityAdded} activities={activities}/>} />
          </div>
      </BrowserRouter>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
