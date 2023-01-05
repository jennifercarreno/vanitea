import React, { useState, useEffect } from 'react';
import { Navbar, Button, Link, Text, useTheme, Input } from "@nextui-org/react";
import { SearchIcon } from "../components/searchicon";
import SearchBar from '../components/searchbar';



// import {
//     Collapse,
//     Navbar,
//     NavbarToggler,
//     NavbarBrand,
//     Nav,
//     NavItem,
//     NavLink,
// } from 'reactstrap';
// import Link from 'next/link'

// from 'reactstrap';

// const Header = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [sticky, setSticky] = useState(false);
//     const toggle = () => setIsOpen(!isOpen);

//     useEffect(() => {
//         window.addEventListener('scroll', handleScroll);
//     });

//     const handleScroll = () => {
//         if (window.scrollY > 180) {
//             setSticky(true);
//         } else if (window.scrollY < 180) {
//             setSticky(false);
//         }
//     }

//     return (
//         <nav >
//            <Link href="/">
//               <div><p>Home</p></div>
//            </Link>
           
//         </nav>
//      );
// }
export default function Header() {
    const { isLight } = useTheme();
  
    return (
      
        <Navbar shouldHideOnScroll isBordered={isLight} variant="sticky">
          <Navbar.Brand>
            
            <Text b color="inherit" hideIn="xs">
              LOGO
            </Text>
          </Navbar.Brand>
          <Navbar.Content hideIn="xs" variant="highlight">
          <Navbar.Link href="/">Home</Navbar.Link>

          <Navbar.Link href="/products/" isActive>Products</Navbar.Link>

         
          </Navbar.Content>
          <Navbar.Content>
            <Navbar.Link color="inherit" href="#">
              Login
            </Navbar.Link>
            <Navbar.Item>
              <Button auto flat as={Link} href="#">
                Sign Up
              </Button>
            </Navbar.Item>
          </Navbar.Content>
        </Navbar>
      
    )
  }

// export default Header;




