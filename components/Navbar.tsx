import Link from 'next/link';
import { useEffect, useState } from 'react';
import React from 'react';

export default function Navbar() {

    const [inBase, setInBase] = useState(false)
    
    useEffect(() => {
        if (window.location.pathname === '/') {
            setInBase(true)
        }
    })

    return (
        <div className='flex justify-between'>
            <div>
                {!inBase && (
                    <div className='text-md small-caps tracking-widest'>
                        <Link href={`/`}>
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
                {/*       
                <div>
                    <DarkModeToggle isDarkMode={isDarkMode} onChange={onDarkModeToggle}/>
                </div>
                */}
            </div>
        </div>
    )
}
