import React from 'react'
import { useTheme } from "next-themes";
import dynamic from 'next/dynamic';

const FiSun = dynamic(() => import('react-icons/fi').then((mod) => mod.FiSun), {
  ssr: false,
});

const FaMoon = dynamic(() => import('react-icons/fa').then((mod) => mod.FaMoon), {
  ssr: false,
});

const Button = () => {
    const { theme, setTheme } = useTheme();

    return (
      <button
        onClick={() => theme == "dark" ? setTheme('light') : setTheme("dark")}
        className=' text-white px-8 py-2 text-2xl md:text-4xl rounded-lg'>
        {theme === 'dark' ? <FiSun /> : <FaMoon />}
      </button>
    )
}

export default Button