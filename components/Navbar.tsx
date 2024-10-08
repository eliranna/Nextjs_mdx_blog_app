import Link from 'next/link';
import { useEffect, useState } from 'react';
import React from 'react';

export default function Navbar({heb}) {

    const [inBase, setInBase] = useState(false)
    
    useEffect(() => {
        if (window.location.pathname === '/') {
            setInBase(true)
        }
    })

    return (
        <div className='flex max-w-5xl w-full justify-center'>
            <div className='flex'>
                {!inBase && (
                    <div className='text-sm small-caps tracking-widest flex justify-center'>
                        <Link href={`/`} style={{textDecoration: 'none!important'}}>
                            {heb ? 'אלירן נתן' : 'Eliran Natan'}
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
