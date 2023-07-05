import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useContext} from "react";
import {AppContext} from "./App";
import React from 'react';
import {CiDark,CiLight} from 'react-icons/ci'


export const MyNavbar = () =>{
    
    const {isAuth,darkMode,setDarkMode} = useContext(AppContext);
    return (
      <div>
        {darkMode?
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="/">Blog</Navbar.Brand>
            
            
            <Nav>
              <Button variant="outline-light" size='sm' onClick={()=>{setDarkMode(false);localStorage.setItem('dark','false')}}>&nbsp;<CiLight/>&nbsp;</Button>
              <Nav.Link href="/">Home</Nav.Link>
              {isAuth ? <Nav.Link href="/write">Write</Nav.Link>:null}
              {isAuth ? <Nav.Link href="/logout">Logout</Nav.Link>:<Nav.Link href="/login">Login</Nav.Link>}
              <Nav.Link href="/about">About</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        
        :<Navbar bg="light" data-bs-theme="light">
          <Container>
            <Navbar.Brand href="/">Blog</Navbar.Brand>
            
            <Nav>
              <Button variant="outline-dark" size='sm'  onClick={()=>{setDarkMode(true);localStorage.setItem('dark','true')}}>&nbsp;<CiDark/>&nbsp;</Button>
              <Nav.Link href="/">Home</Nav.Link>
              {isAuth ? <Nav.Link href="/write">Write</Nav.Link>:null}
              {isAuth ? <Nav.Link href="/logout">Logout</Nav.Link>:<Nav.Link href="/login">Login</Nav.Link>}
              <Nav.Link href="/about">About</Nav.Link>
            </Nav>
          </Container>
        </Navbar>}
        
      </div>  

    );
}
