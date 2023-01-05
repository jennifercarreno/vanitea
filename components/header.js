import React, { useState, useEffect } from 'react';
import { Navbar, Button, Link, Text, useTheme, Input } from "@nextui-org/react";
import { SearchIcon } from "../components/searchicon";
import SearchBar from '../components/searchbar';
import { useSession, signIn, signOut } from "next-auth/react";


export default function Header() {
    const { isLight } = useTheme();
    const { data: session } = useSession();
  
    return (
      
        <Navbar shouldHideOnScroll isBordered={isLight} variant="sticky">
          <Navbar.Brand>
            
            <Text b color="secondary" hideIn="xs">
              LOGO
            </Text>
          </Navbar.Brand>
          <Navbar.Content hideIn="xs" variant="highlight">
          <Navbar.Link href="/">Home</Navbar.Link>

          <Navbar.Link href="/products/" isActive activeColor="secondary">Products</Navbar.Link>

         
          </Navbar.Content>
          <Navbar.Content>
            <Navbar.Link activeColor="secondary" href="#">
              Login
            </Navbar.Link>
            <Navbar.Item>
            {!session ? (
                <>
                  <p>Not signed in</p>
                  <br />
                  <button onClick={() => signIn()}>Sign in</button>
                </>
              ) : (
                
                  <div>
                    <h4>Signed in as {session.user.name}</h4>
                    <button onClick={() => signOut()}>Sign out</button>
                  </div>)}
              {/* <Button color="secondary" auto  as={Link}  href="#">
                Sign Up
              </Button> */}
            </Navbar.Item>
          </Navbar.Content>
        </Navbar>
      
    )
  }

// export default Header;




