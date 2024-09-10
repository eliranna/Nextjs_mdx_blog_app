import Link from 'next/link';
import { useEffect, useState } from 'react';
import React from 'react';
import DarkModeToggle from './DarkModeToggle'

export default function Navbar() {

    const [inBase, setInBase] = useState(false)
    
    useEffect(() => {
        if (window.location.pathname === '/') {
            setInBase(true)
        }
    })

    const onDarkModeToggle =()=> {

    }

    return (
        <div className='flex max-w-5xl w-full '>
            <div className='flex'>
                {!inBase && (
                    <div className='text-sm small-caps tracking-widest flex' style={{textDecoration: 'none!important'}}>
                        <Link href={`/`} style={{textDecoration: 'none!important'}}>
                            Eliran Natan
                        </Link>                
                    </div>
                )}                 
            </div>
            <div className='flex'>
                {/*<div style={navlink}>
                    <Link href={`/about`}>
                        About
                    </Link>                
                </div>*/}
            </div>
        </div>
    )
}
