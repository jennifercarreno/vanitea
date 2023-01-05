import React, { useState, useEffect } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import Link from 'next/link'

// from 'reactstrap';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [sticky, setSticky] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    });

    const handleScroll = () => {
        if (window.scrollY > 180) {
            setSticky(true);
        } else if (window.scrollY < 180) {
            setSticky(false);
        }
    }

    return (
        <nav >
           <Link href="/">
              <div><p>Home</p></div>
           </Link>
           
        </nav>
     );
}

export default Header;