"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import Darkmode from '../Darkmode/Darkmode';
import styles from './navbar.module.css'
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

let tr = true



const links_1 = [
    {
        id: 1,
        title: 'Главный',
        url: '/',
        
    },
    {
        id: 2,
        title: 'Дашборд',
        url: tr ? '/dashboard' : '/signup',//change tr for user
    },
    {
        id: 3,
        title: 'Цены',
        url: '/pricing',
    },
];

const links_2 = [
    {
        id: 1,
        title: 'Главный',
        url: '/',
        
    },
    {
        id: 2,
        title: 'Дашборд',
        url: '/dashboard', 
    },
    {
        id: 3,
        title: 'Плохие',
        url: '/dashboard/bad',
    },
    {
        id: 4,
        title: 'Аналитика',
        url: '/dashboard/bad',
    },
    {
        id: 5,
        title: 'Документация',
        url: '/dashboard/documentation',
    },
];

const handleLogout = async () => {
    await signOut({ callbackUrl: 'http://localhost:3000/' }); // Specify the callback URL after logout
  };
  

const Navbar = () => {

    const path = usePathname();
    console.log(path)

    const [login, setLogin] = useState(false)

    const session = useSession();

  const router = useRouter();

  console.log(session)

//   if (session.status === "loading") {
//     setLogin(false);
//   } else if (session.status === "unauthenticated") {
//     setLogin(false);
//   } else if (session.status === "authenticated") {
//     setLogin(true);
//   }
    
    
  return (
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>RTNO</Link>
        <div className={styles.links}>
              {path.startsWith('/dashboard') ? 
                  links_2.map((link) => (
                      <Link href={link.url} key={link.id} className={styles.link}>
                          {link.title}
                      </Link>
                  ))
               :
                  
                      links_1.map((link) => (
                          <Link href={link.url} key={link.id} className={styles.link}>
                              {link.title}
                          </Link>
                      ))
                  }
        </div>
          <div className={styles.right}>
            <Darkmode />
            <button className={styles.logout} onClick={handleLogout}>
              {login ? 'log in' : 'log out'}
            </button>
        </div>
    </div>
  )
}

export default Navbar