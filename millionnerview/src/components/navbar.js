import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
 const Navbarcom = () =>  {

    return (
      
  <Navbar>
  <Navbar.Brand href="#home">MILLIONER</Navbar.Brand>
    <Nav.Link href="/accounts">Acount validation</Nav.Link>
    <Nav.Link href="/gifts">Gift </Nav.Link>
      <Nav.Link href="/questions">Questions</Nav.Link>
  <Navbar.Toggle />

  <Navbar.Collapse className="justify-content-end">
    <Navbar.Text>
      log out  : <a href="/">{localStorage.getItem("nameAdmin")}</a>
    </Navbar.Text>
  </Navbar.Collapse>
</Navbar>)
}

export default Navbarcom
