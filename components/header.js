import React, { useState, useEffect } from 'react';
import { Navbar, Button, Link, Text, useTheme, Input, Dropdown, Avatar, Image } from "@nextui-org/react";
import { useSession, signIn, signOut } from "next-auth/react";


export default function Header() {
    const { isLight } = useTheme();
    const { data: session } = useSession();
    const [activeColor, setActiveColor] = React.useState("secondary")
    return (
      
        <Navbar shouldHideOnScroll isBordered={isLight} variant="sticky">
          <Navbar.Brand>
            
            <Image src="https://img.icons8.com/pastel-glyph/512/makeup.png" width="50px"></Image>
          </Navbar.Brand>
          <Navbar.Content hideIn="xs" variant="highlight" color="secondary" auto ghost>
          <Navbar.Link href="/">Home</Navbar.Link>

          <Navbar.Link href="/products/"  activeColor="secondary">Products</Navbar.Link>
          <Navbar.Link href="/reviews/"  activeColor="secondary">Reviews</Navbar.Link>


         
          </Navbar.Content>
          <Navbar.Content>
            <Navbar.Item>
            {!session ? (
                <>
                  <p>Not signed in</p>
                  <br />
                  <button onClick={() => signIn()}>Sign in</button>
                </>
              ) : (
                
                  <div>
                  <Dropdown placement="bottom-right">
                  <Navbar.Item>
                    <Dropdown.Trigger>
                      <Avatar
                        bordered
                        as="button"
                        color="secondary"
                        size="md"
                        src={session.user.image}
                      />
                    </Dropdown.Trigger>
                  </Navbar.Item>

                  <Dropdown.Menu
              aria-label="User menu actions"
              color="secondary"
              onAction={(actionKey) => console.log({ actionKey })}
              >
                <Dropdown.Item key="profile" css={{ height: "$18" }}>
                <Text b color="inherit" css={{ d: "flex" }}>
                  Signed in as
                </Text>
                <Text b color="inherit" css={{ d: "flex" }}>
                  {session.user.name}
                </Text>
              </Dropdown.Item>

              <Dropdown.Item key="settings" withDivider >
               <a href='/users'>My Profile</a> 
              </Dropdown.Item>

              <Dropdown.Item key="logout" withDivider  >
                <Button onClick={() => signOut()} color="error">
                  Log out
                </Button>
              </Dropdown.Item>

              </Dropdown.Menu>
                  </Dropdown>
                  </div>

                  )}
              
            </Navbar.Item>
          </Navbar.Content>
        </Navbar>
      
    )
  }

// export default Header;




