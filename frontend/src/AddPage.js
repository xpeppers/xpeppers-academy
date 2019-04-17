import React, { Component } from 'react'
import Menu from './Menu'
import axios from 'axios'
import { withRouter } from "react-router-dom"

class ListPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            links: [{url: "http://an.url", type: "submission"}]
        }
    }

    addLink() {
        this.setState((prevState) => ({
            links: [...prevState.links, {url:"", type:""}],
        }))
    }

    updateLink(id, type) {
        return (event) => {
            this.setState({
                links: this.state.links.map((link, index) => {
                    if (index === id) {
                        link[type] = event.target.value
                    }
                    return link
                })
            })
        }
    }

    change(item) {
        return (event) => {
            let newState = {}
            newState[item] = event.target.value
            this.setState(newState)
        }
    }

    submit(event) {
        event.preventDefault()

        axios.post(`https://539bk9ow41.execute-api.us-east-1.amazonaws.com/dev/save`, this.state)
            .then(() => {
              //TODO: ok response
              this.props.activityAdded(this.state)

              this.props.history.push('/')
            })
            .catch(console.log)
    }

    render() {
        return (
            <div>
                <Menu selected="add"></Menu>
                <form className="text-left p-3" onSubmit={this.submit.bind(this)}>
                    <div className="form-group">
                        <label htmlFor="date">Date</label>
                        <input type="text" onChange={this.change("date")} className="form-control" placeholder="yyyy-MM-dd" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="author">Author</label>
                        <input type="text" onChange={this.change("author")} className="form-control" placeholder="Author" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="type">Type</label>
                        <input type="text" onChange={this.change("type")} className="form-control" placeholder="Type" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" onChange={this.change("title")} className="form-control" placeholder="Title" />
                    </div>
                    <div className="text-right">
                      <button className="btn btn-sm btn-secondary" type="button" onClick={this.addLink.bind(this)}>Add Link</button>
                    </div>
                    {this.state.links.map((link, idx) => {
                        let typeId = `type-${idx}`
                        let urlId = `url-${idx}`

                        return (

                          <div className="row p-3" key={idx}>
                              <div className="col-sm-6">
                                  <label htmlFor={typeId}>Type</label>
                                  <input
                                      type="text"
                                      name={typeId}
                                      data-id={idx}
                                      id={typeId}
                                      className="form-control"
                                      value={this.state.links[idx].type}
                                      onChange={this.updateLink(idx, "type").bind(this)}
                                  />
                              </div>
                              <div className="col-sm-6">
                                  <label htmlFor={urlId}>Url</label>
                                  <input
                                  type="text"
                                  name={urlId}
                                  data-id={idx}
                                  id={urlId}
                                  className="form-control"
                                  value={this.state.links[idx].url}
                                  onChange={this.updateLink(idx, 'url').bind(this)}
                                  />
                              </div>
                          </div>
                        )
                    })}

                    <button type="submit" className="btn btn-primary">Save</button>
                </form>
            </div>
        )
    }
}

export default withRouter(ListPage)

