import React from 'react'
import Menu from './Menu'

const RankingPage = (props) => {

  const groupBy = (xs, key) => {
    return Object.entries(xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x)
      return rv
    }, {}))
  }

  const pointsOf = (authorActivities) => {
    return authorActivities.reduce((points, currentActivity) => {
      if(currentActivity.date === '') {
        return points
      }

      var types = {
        'facilitation': 1,
        'presentation': 3,
        'conference': 5
      }

      return points + types[currentActivity.type]
    }, 0)
  }

  const byPoints = (a, b) => {
    return pointsOf(a[1]) < pointsOf(b[1]) ? 1 : -1
  }

  const group = groupBy(props.activities, 'author').sort(byPoints)

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

export default RankingPage
