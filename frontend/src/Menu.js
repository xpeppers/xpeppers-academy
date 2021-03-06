import React from 'react'
import { Link } from 'react-router-dom'

const Menu = (props) => {
  const pages = [
    { code: "list", name: "List", url: "/" },
    { code: "ranking", name: "Ranking", url: "/ranking" },
    { code: "add", name: "+ Add", url: "/add" }
  ]

  return (
    <ul className="nav">
      {pages.map((page, index) =>
        <li key={'page' + index} className={"nav-item " + (page.code === props.selected ? 'active' : '')}>
          <Link to={page.url} className="nav-link">{page.name}</Link>
        </li>
      )}
    </ul>
  )
}

export default Menu