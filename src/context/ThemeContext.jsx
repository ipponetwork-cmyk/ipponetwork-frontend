import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ThemeCtx from './themeCtx'
import { listOfValuesAPI } from '../services/listOfValuesAPI'

const getInitialThemeName = () => {
  return localStorage.getItem('themeName') || 'theme2'
}

const applyThemeColors = (theme) => {
  if (!theme) return
  const root = document.documentElement
  root.style.setProperty('--bg', theme.primarycolor)
  root.style.setProperty('--page-bg', theme.primarycolor)
  root.style.setProperty('--surface', theme.primarycolor)
  root.style.setProperty('--surface-strong', theme.primarycolor)
  root.style.setProperty('--nav-bg', theme.primarycolor)
  root.style.setProperty('--drawer-bg', theme.primarycolor)
  root.style.setProperty('--text', theme.secondarycolor)
  root.style.setProperty('--text-h', theme.secondarycolor)
  root.style.setProperty('--text-muted', theme.secondarycolor)
  root.style.setProperty('--button-bg', theme.secondarycolor)
  root.style.setProperty('--button-text', theme.primarycolor)
  root.style.setProperty('--accent', theme.secondarycolor)
  root.style.setProperty('--accent-bg', `${theme.secondarycolor}33`)
  root.style.setProperty('--accent-border', `${theme.secondarycolor}55`)
}

export function ThemeProvider({ children }) {
  const [themes, setThemes] = useState([])
  const [themeData, setThemeData] = useState(null)
  const [selectedThemeName, setSelectedThemeName] = useState(getInitialThemeName)
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language')
    return savedLanguage || 'en'
  })

  const location = useLocation()
  const excludedPages = ['/', '/verifyotp', '/profilepage']
  const shouldApplyTheme = !excludedPages.includes(location.pathname)

  useEffect(() => {
    const loadThemes = async () => {
      try {
        const response = await listOfValuesAPI.getThemes()
        console.log(response, "themesResponse12563")

        // Handle API response format { data: [...] }
        let fetchedThemes = []
        if (response && Array.isArray(response.data)) {
          fetchedThemes = response.data
        } else if (Array.isArray(response)) {
          fetchedThemes = response
        } else if (response && typeof response === 'object') {
          fetchedThemes = [response]
        }

        if (fetchedThemes.length > 0) {
          const filteredThemes = fetchedThemes.filter((theme) => theme && typeof theme.themename === 'string')
          setThemes(filteredThemes)
          const selected = filteredThemes.find((theme) => theme.themename === selectedThemeName) || filteredThemes[0]
          if (selected) {
            setSelectedThemeName(selected.themename)
            setThemeData(selected)
          }
        }
      } catch (error) {
        console.error('Failed to load themes:', error)
      }
    }

    loadThemes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (themes.length > 0) {
      const selected = themes.find((theme) => theme.themename === selectedThemeName)
      if (selected) {
        setThemeData(selected)
      }
    }
  }, [selectedThemeName, themes])

  useEffect(() => {
    if (shouldApplyTheme) {
      document.documentElement.dataset.theme = selectedThemeName
    }

    if (themeData) {
      applyThemeColors(themeData)
    }

    localStorage.setItem('themeName', selectedThemeName)
  }, [shouldApplyTheme, themeData, selectedThemeName])

  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  const toggleTheme = () => {
    if (themes.length > 0) {
      const currentIndex = themes.findIndex((theme) => theme.themename === selectedThemeName)
      const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % themes.length
      const nextTheme = themes[nextIndex]
      setSelectedThemeName(nextTheme.themename)
    }
  }

  const handleLanguageChange = (lang) => setLanguage(lang)

  const setThemeByName = (themeName) => {
    if (themes.length > 0) {
      const foundTheme = themes.find((theme) => theme.themename === themeName)
      if (foundTheme) {
        setSelectedThemeName(foundTheme.themename)
      }
    }
  }

  return (
    <ThemeCtx.Provider
      value={{
        toggleTheme,
        language,
        setLanguage: handleLanguageChange,
        themeData,
        selectedThemeName,
        themes,
        setThemeByName,
      }}
    >
      {children}
    </ThemeCtx.Provider>
  )
}
