import { useState } from 'react'
// import useTheme from './context/useTheme'
import CommonDialog from './components/CommonDialog'


function App() {
  const [dialogOpen, setDialogOpen] = useState(false)
  // const { isDark, toggleTheme } = useTheme()

  const handleCloseDialog = () => {
    setDialogOpen(false)
  }

  return (
    <>
      {/* <ThemeToggle onClick={toggleTheme}>
        {isDark ? '☀ Light' : '☾ Dark'}
      </ThemeToggle> */}

      <CommonDialog
        open={dialogOpen}
        title="Common Dialog"
        onClose={handleCloseDialog}
      >
        <p>
          This is a reusable dialog component. You can wrap any content inside
          it.
        </p>
      </CommonDialog>
    </>
  )
}

export default App
