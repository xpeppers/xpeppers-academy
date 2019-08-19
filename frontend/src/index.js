import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import ListPage from './ListPage'
import RankingPage from './RankingPage'
import AddPage from './AddPage'
import * as serviceWorker from './serviceWorker'
import { Route, BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import { apiBaseUrl } from './lib/configuration'

class App extends React.Component {
  state = {
    filtered: [],
    activities: []
  }

  componentWillMount() {
    this.getActivities()
  }

  getActivities() {
    axios.get(`${apiBaseUrl}/read`)
      .then(({data}) => this.setState({ activities: data, filtered: data }))
  }

  isNot(activityToDelete) {
    return (activity) => {
      return !(activityToDelete.date === activity.date &&
            activityToDelete.author === activity.author &&
            activityToDelete.title === activity.title &&
            activityToDelete.type === activity.type)
    }
  }

  searchActivities(text) {
    this.setState({filtered: this.state.activities.filter(this.hasTitleOrAuthorOrTypeContaining(text))})
  }

  hasTitleOrAuthorOrTypeContaining(text) {
    return (activity) => {
      return (activity.title && activity.title.toLowerCase().includes(text.toLowerCase())) ||
             (activity.author && activity.author.toLowerCase().includes(text.toLowerCase())) ||
             (activity.type && activity.type.toLowerCase().includes(text.toLowerCase()))
    }
  }

  activityDeleted(activity) {
    this.setState({ activities: this.state.activities.filter(this.isNot(activity)), filtered: this.state.activities.filter(this.isNot(activity)) })
  }

  activityAdded(activity) {
    this.setState({ activities: [...this.state.activities, activity], filtered: [...this.state.activities, activity] })
  }

  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
          <div className='router a1'>
              <Route exact path="/" render={() => <ListPage activityDeleted={this.activityDeleted.bind(this)} searchActivities={this.searchActivities.bind(this)} activities={this.state.filtered}/>}/>
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
