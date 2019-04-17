import React from 'react'
import Menu from './Menu'

function groupBy (xs, key) {
  return Object.entries(xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {}))
}

function pointsOf(authorActivities) {
  return authorActivities.reduce((points, currentActivity) => {
    if(currentActivity.date === '') {
      return points
    }
    currentActivity.type === 'presentation' ? points+=3 : points++
    return points
  }, 0)
}

function byPoints(a, b) {
  return pointsOf(a[1]) < pointsOf(b[1]) ? 1 : -1
}

class RankingPage extends React.Component {
  render() {
    var group = groupBy(this.props.activities, "author")
      .sort(byPoints)

    return (
      <div>
        <Menu selected="ranking"></Menu>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Points</th>
                <th scope="col">Author</th>
              </tr>
            </thead>
            <tbody>
            {group.map((entry, index) =>
              <tr key={'group' + index}>
                <td>{index + 1}</td>
                <td>{pointsOf(entry[1])}</td>  
                <td>{entry[0]}</td>                              
              </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      )
    }
  }

  export default RankingPage