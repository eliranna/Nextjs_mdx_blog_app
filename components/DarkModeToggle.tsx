import { useEffect, useState } from 'react';
import { fontSize, spacing } from '../style';

export default function DarkModeToggle({isDarkMode, onChange}) {
  
    const darkModeIcon = {
        width: "25px",
        cursor: "pointer",
        filter: isDarkMode ? "invert(1)" : null,
        transition: "all 0.5s"
    }

    return (
        <button onClick={onChange}>
            <img style={darkModeIcon} src="./assets/sun.svg"/>
        </button>
    )
}

