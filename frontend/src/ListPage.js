import React, { Component } from 'react';
import Menu from './Menu';
import axios from 'axios'
import { apiBaseUrl } from './lib/configuration'

class ListPage extends Component {
  links(index, links) {
    return links
    .map((link, link_index) => <a key={'link' + index + link_index} href={link.url}>{link.type}</a>)
    .reduce((acc, prev) => {
      if (acc === "")  return prev
      return [acc, ", ", prev]
    }, "")
  }

  delete(activity) {
    return (event) => {
      event.preventDefault()

      axios.post(`${apiBaseUrl}/delete`, activity)
        .then(() => {
          this.props.activityDeleted(activity)
        })
        .catch(console.log)
    }
  }

  render() {
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
            {this.props.activities.sort((a, b) => a.date < b.date ? 1 : -1).map((activity, index) =>
              <tr key={'activity' + index}>
                <td>{activity.date}</td>
                <td>{activity.author}</td>
                <td>{activity.type}</td>
                <td>{activity.title}</td>
                <td>{this.links(index, activity.links)}</td>
                <td>
                  <button type="button" className="btn btn-sm btn-secondary" onClick={this.delete(activity).bind(this)}>
                    <span className="fa fa-trash"></span>
                  </button>
                </td>
              </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ListPage;
