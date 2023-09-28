import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fontSize, spacing } from '../style';
import DarkModeToggle from './DarkModeToggle'

export default function Navbar({isDarkMode, onDarkModeToggle}) {

    const [inBase, setInBase] = useState(false)
    
    useEffect(() => {
        if (window.location.pathname === '/') {
            setInBase(true)
        }
    })

    const wrapper = {
        display: "flex",
        justifyContent: "space-between",
        maxWidth: "800px",
        width: "100%"
    }

    const navlink = {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        fontSize: fontSize.fontSize2,
            
    }

    const left = {
        display: "flex",
        flexDirection: "row", 
        gap: spacing.spacing12       
    }

    const right = {
    
    }

    return (
        <div style={wrapper}>
            <div style={right}>
                {!inBase && (
                    <div style={navlink}>
                        <Link href={`/`}>
                            Eliran Natan
                        </Link>                
                    </div>
                )}                 
            </div>
            <div style={left}>
                {/*<div style={navlink}>
                    <Link href={`/about`}>
                        About
                    </Link>                
                </div>*/}            
                <div>
                    <DarkModeToggle isDarkMode={isDarkMode} onChange={onDarkModeToggle}/>
                </div>
            </div>
        </div>
    )
}
