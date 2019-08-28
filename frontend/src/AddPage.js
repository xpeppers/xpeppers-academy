import React, { useState } from 'react'
import Menu from './Menu'
import { withRouter } from "react-router-dom"
import { addActivity } from './lib/activity-repository'

const AddPage = (props) => {
  const [links, setLinks] = useState([{url: "http://an.url", type: "wiki"}])
  const [type, setType] = useState('facilitation')
  const [date, setDate] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')

  const addLink = () => {
    setLinks([...links, {url:"", type:""}])
  }

  const updateLink = (id, type) => {
      return (event) => {
        setLinks(links.map((link, index) => {
          if (index === id) {
              link[type] = event.target.value
          }
          return link
        }))
      }
  }

  const changeTitle = (event) => {
    setTitle(event.target.value)
  }

  const changeAuthor = (event) => {
    setAuthor(event.target.value)
  }

  const changeDate = (event) => {
    setDate(event.target.value)
  }

  const changeType = (event) => {
    setType(event.target.value)
  }

  const submit = (event) => {
    event.preventDefault()

    addActivity({author, title, links, date, type})
    .then((activity) => {
      props.dispatch({ type: 'add', value: activity })
      props.history.push('/')
    })
    .catch(console.log)
  }

  return (
    <div>
      <Menu selected="add"></Menu>
      <form className="text-left p-3" onSubmit={submit}>
          <div className="form-group">
              <label htmlFor="date">Date</label>
              <input type="text" onChange={changeDate} className="form-control" placeholder="yyyy-MM-dd" />
          </div>
          <div className="form-group">
              <label htmlFor="author">Author</label>
              <input type="text" onChange={changeAuthor} className="form-control" placeholder="Author" />
          </div>
          <div className="form-group">
              <label htmlFor="type">Type</label>
              <select onChange={changeType} className="form-control">
                  <option value="facilitation">facilitation</option>
                  <option value="presentation">presentation</option>
                  <option value="conference">conference</option>
              </select>
          </div>
          <div className="form-group">
              <label htmlFor="title">Title</label>
              <input type="text" onChange={changeTitle} className="form-control" placeholder="Title" />
          </div>
          <div className="text-right">
            <button className="btn btn-sm btn-secondary" type="button" onClick={addLink}>Add Link</button>
          </div>
          {links.map((link, idx) => {
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
                            value={links[idx].type}
                            onChange={updateLink(idx, "type")}
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
                        value={links[idx].url}
                        onChange={updateLink(idx, 'url')}
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

export default withRouter(AddPage)

