import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import ListPage from './ListPage'
import RankingPage from './RankingPage'
import AddPage from './AddPage'
import * as serviceWorker from './serviceWorker'
import { Route, BrowserRouter } from 'react-router-dom'
import axios from 'axios'

class App extends React.Component {
  state = {
    activities: []
  }

  componentDidMount() {
    axios.get(`https://539bk9ow41.execute-api.us-east-1.amazonaws.com/dev/read`)
      .then(res => {
        const activity = res.data
        this.setState({ activities: activity })
      })
  }

  isNot(activityToDelete) {
    return (activity) => {
      return !(activityToDelete.date === activity.date &&
            activityToDelete.author === activity.author &&
            activityToDelete.title === activity.title &&
            activityToDelete.type === activity.type)
    }
  }

  activityDeleted(activity) {
    this.setState({ activities: this.state.activities.filter(this.isNot(activity)) })
  }

  activityAdded(activity) {
    this.setState({ activities: [...this.state.activities, activity] })
  }

  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
          <div className='router a1'>
              <Route exact path="/" render={() => <ListPage activityDeleted={this.activityDeleted.bind(this)} activities={this.state.activities}/>}/>
              <Route exact path="/ranking" render={() => <RankingPage activities={this.state.activities}/>} />
              <Route exact path="/add" render={() => <AddPage activityAdded={this.activityAdded.bind(this)} activities={this.state.activities}/>} />
          </div>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
