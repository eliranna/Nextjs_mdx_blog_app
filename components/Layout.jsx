import { useEffect, useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar'
import { spacing } from '../style';

export default function Layout({children}) {

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
      minHeight: "100vh"
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

  const navbar = {
    width: "100%",
    padding: `${spacing.spacing8} 0px`,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  }

  const footer = {
    width: "100%",
    padding: `${spacing.spacing16} 0px`,
  }

  return (
    <div style={isDarkMode ? {...wrapper, ...darkMode} : {...wrapper, ...lightMode}}>
      <Head>
        <title>Cooking Blog</title>
      </Head>
      <div style={main}>
          <div style={navbar}>
            <Navbar isDarkMode={isDarkMode} onDarkModeToggle={handleDarkModeToggle}/>
          </div>
        <div>
          {children}
        </div>
      </div>
      <div style={footer}>

      </div>
    </div>
  )
}