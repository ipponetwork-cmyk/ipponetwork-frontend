import { useContext } from 'react'
import ThemeCtx from './themeCtx'

const useTheme = () => useContext(ThemeCtx)

export default useTheme
