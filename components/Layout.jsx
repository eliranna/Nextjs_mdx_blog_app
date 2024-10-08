import { useEffect, useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar'
import { spacing } from '../style';

export default function Layout({heb, children}) {

  const [isDarkMode, setIsDarkMode] = useState(null);

  useEffect(() => {
    const initialDarkModeValue = JSON.parse(localStorage.getItem("darkMode"))
    setIsDarkMode(initialDarkModeValue)
    setBodyColor(initialDarkModeValue)
  }, [])

  const setBodyColor = (isDarkMode) => {
    document.body.style.backgroundColor = isDarkMode ? '#111111' : 'white';
  }

  const wrapper = {
      minHeight: "100vh",
      fontFamily: heb ? 'Ariana' : 'Crimson Text'
  }

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode)
    setBodyColor(!isDarkMode)
    localStorage.setItem("darkMode", !isDarkMode)
  }

  const darkMode = {
    backgroundColor: "#111111",
    color: "white",
    transition: "all 0.5s"
  }
  
  const lightMode = {
    backgroundColor: "white",
    color: "#111111",
    transition: "all 0.5s"
  }

  const main = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: spacing.spacing4,
  }

  const footer = {
    width: "100%",
    padding: `${spacing.spacing16} 0px`,
  }

  return (
    <div style={wrapper} dir={heb? 'rtl' : 'ltr'}>
      <div style={main}>
          <div className='w-full flex justify-center pt-12'>
            <Navbar heb={heb}/>
          </div>
        <div>
          {children}
        </div>
      </div>
      <div style={footer}>
             <div className='flex justify-center text-xs'>
            © {heb ? 'אלירן נתן. כל הזכויות שמורות.' : 'Eliran Natan. All rights reserved. Art is AI-generated.'}
            </div>
      </div>
    </div>
  )
}