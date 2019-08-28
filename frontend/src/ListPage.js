import React, { useEffect } from 'react'
import Menu from './Menu'
import { deleteActivity, listActivities } from './lib/activity-repository'

const ListPage = (props) => {

  useEffect(() => {
    listActivities()
    .then((activities) => {
      props.dispatch({ type: 'list', value: activities})
    }).catch(console.log)
  }, [])

  const links = (index, links) => {
    return links
    .map((link, link_index) => <a key={'link' + index + link_index} href={link.url}>{link.type}</a>)
    .reduce((acc, prev) => {
      if (acc === "")  return prev
      return [acc, ", ", prev]
    }, "")
  }

  const del = (activity) => {
    return (event) => {
      event.preventDefault()

      deleteActivity(activity, props.activities)
      .then(activities => props.dispatch({ type: 'delete', value: activities }))
    }
  }

  const searchActivities = (event) => {
    event.preventDefault()
    props.dispatch({ type: 'search', value: event.target.value })
  }

  return (
    <div>
      <Menu selected="list"></Menu>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col" className="date">Date</th>
              <th scope="col">Author</th>
              <th scope="col">Type</th>
              <th scope="col">Title</th>
              <th scope="col">Links</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr key="search">
              <th colSpan="6">
                <input className="searchInput" type="text" onChange={searchActivities} placeholder="Search Title, Author or Type" />
              </th>
            </tr>
          {props.activities.sort((a, b) => a.date < b.date ? 1 : -1).map((activity, index) =>
            <tr key={'activity' + index}>
              <td>{activity.date}</td>
              <td>{activity.author}</td>
              <td>{activity.type}</td>
              <td>{activity.title}</td>
              <td>{links(index, activity.links)}</td>
              <td>
                <button type="button" className="btn btn-sm btn-secondary" onClick={del(activity)}>
                  <span className="fa fa-trash"></span>
                </button>
              </td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListPage;
