import Link from 'next/link'
import React from 'react'

const NavBar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
  <div className="container-fluid">
    <Link className="navbar-brand" href="/">Navbar</Link>
  </div>
</nav>

  )
}

export default NavBar