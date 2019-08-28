import React, { useEffect, useReducer } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import ListPage from './ListPage'
import RankingPage from './RankingPage'
import AddPage from './AddPage'
import * as serviceWorker from './serviceWorker'
import { Route, BrowserRouter } from 'react-router-dom'
import { listActivities, searchActivities } from './lib/activity-repository'

const reducer = (state, action) => {
  switch (action.type) {
    case 'search':
      return { activities: state.activities, filtered: searchActivities(action.value, state.activities) }
    case 'list':
      return { activities: action.value, filtered: action.value}
    case 'add':
      return { activities: [...state.activities, action.value], filtered: [...state.activities, action.value]}
    case 'delete':
      return { activities: action.value, filtered: action.value}
    default:
      return state;
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, { activities: [], filtered: [] })

  useEffect(() => {
    listActivities().then((activities) => dispatch({ type: 'list', value: activities})).catch(console.log)
  }, [])

  return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
          <div className='router a1'>
              <Route exact path="/" render={() => <ListPage dispatch={dispatch} activities={state.filtered}/>}/>
              <Route exact path="/ranking" render={() => <RankingPage activities={state.activities}/>} />
              <Route exact path="/add" render={() => <AddPage dispatch={dispatch} activities={state.activities}/>} />
          </div>
      </BrowserRouter>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
