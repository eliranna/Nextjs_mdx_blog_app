import { useEffect, useState } from 'react';
import { fontSize, spacing } from '../style';

export default function DarkModeToggle({onChange}) {

    const [isDarkMode, setIsDarkMode] = useState(false);

    // Function to toggle dark mode
    const toggleDarkMode = () => {
      setIsDarkMode(!isDarkMode);
      onChange(!isDarkMode)
    };
  
    useEffect(() => {
      // Listen for changes in the system's color scheme preference
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

      // Update the dark mode state based on the user's preference
      setIsDarkMode(mediaQuery.matches);
  
      // Add an event listener to handle changes in the user's preference
      const handleChange = (e) => {
        setIsDarkMode(e.matches);
      };
  
      mediaQuery.addEventListener('change', handleChange);
  
      // Cleanup the event listener when the component unmounts
      return () => {
        mediaQuery.removeEventListener('change', handleChange);
      };
    }, []);

    const darkModeIcon = {
        width: "25px",
        cursor: "pointer",
        filter: isDarkMode ? "invert(1)" : null,
        transition: "all 0.5s"
    }

    return (
        <button onClick={toggleDarkMode}>
            <img style={darkModeIcon} src="./assets/sun.svg"/>
        </button>
    )
}

