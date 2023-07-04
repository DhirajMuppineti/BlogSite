import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useContext} from "react";
import {AppContext} from "./App";
import React from 'react';


export const MyNavbar = () =>{
    
    const {isAuth} = useContext(AppContext);
    return (
      <div>
        <Navbar bg="light" data-bs-theme="light">
          <Container>
            <Navbar.Brand href="/">Blog</Navbar.Brand>
            <Nav>
              <Nav.Link href="/">Home</Nav.Link>
              {isAuth ? <Nav.Link href="/write">Write</Nav.Link>:null}
              {isAuth ? <Nav.Link href="/logout">Logout</Nav.Link>:<Nav.Link href="/login">Login</Nav.Link>}
              <Nav.Link href="/about">About</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </div>  

    );
}
