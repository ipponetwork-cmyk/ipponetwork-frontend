import { useState } from 'react'
import { usePwaInstallPrompt } from '../hooks/usePwaInstallPrompt'

const bannerStyle = {
  position: 'fixed',
  bottom: "10%",
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 1100,
  width: 'min(85vw, 420px)',
  padding: '14px 16px',
  background: '#ffffffee',
  border: '1px solid rgba(0,0,0,0.08)',
  borderRadius: '16px',
  boxShadow: '0 12px 30px rgba(0,0,0,0.12)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '12px',
}

const textStyle = {
  margin: 0,
  fontSize: '14px',
  lineHeight: 1.4,
  color: '#111',
  flex: 1,
  textAlign: "start"
}

const buttonStyle = {
  padding: '10px 16px',
  borderRadius: '999px',
  border: 'none',
  background: '#000',
  color: '#fff',
  fontSize: '0.9rem',
  cursor: 'pointer',
}

const closeStyle = {
  marginLeft: '8px',
  border: 'none',
  background: 'transparent',
  color: '#666',
  fontSize: '1rem',
  cursor: 'pointer',
}

function PwaInstallPrompt({ message = 'Install this app for a faster experience.' }) {
  const [visible, setVisible] = useState(true)
  const { isInstallPromptAvailable, promptInstall } = usePwaInstallPrompt()

  if (!isInstallPromptAvailable || !visible) {
    return null
  }

  const handleInstall = async () => {
    const accepted = await promptInstall()
    if (accepted) {
      setVisible(false)
    }
  }

  return (
    <div style={bannerStyle}>
      <p style={textStyle}>{message}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button style={buttonStyle} onClick={handleInstall}>
          Install
        </button>
        <button style={closeStyle} onClick={() => setVisible(false)}>
          ×
        </button>
      </div>
    </div>
  )
}

export default PwaInstallPrompt
