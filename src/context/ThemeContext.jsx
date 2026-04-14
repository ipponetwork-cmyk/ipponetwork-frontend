import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ThemeCtx from './themeCtx'

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    return savedTheme ? JSON.parse(savedTheme) : false
  })

  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language')
    return savedLanguage || 'en'
  })

  const location = useLocation()

  // Pages that should not apply theme
  const excludedPages = ['/', '/verifyotp', '/profilepage']

  const shouldApplyTheme = !excludedPages.includes(location.pathname)

  useEffect(() => {
    if (shouldApplyTheme) {
      document.documentElement.dataset.theme = isDark ? 'dark' : 'light'
    } else {
      // Reset to light theme for excluded pages
      document.documentElement.dataset.theme = 'light'
    }
    localStorage.setItem('theme', JSON.stringify(isDark))
  }, [isDark, shouldApplyTheme])

  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  const toggleTheme = () => setIsDark((prev) => !prev)

  const handleLanguageChange = (lang) => setLanguage(lang)

  return (
    <ThemeCtx.Provider value={{ isDark, toggleTheme, language, setLanguage: handleLanguageChange }}>
      {children}
    </ThemeCtx.Provider>
  )
}
