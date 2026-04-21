import { useCallback, useEffect, useRef, useState } from 'react'

let deferredPrompt = null
let isListenerAttached = false

function attachPwaPromptListener() {
  if (typeof window === 'undefined' || isListenerAttached) return

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault()
    deferredPrompt = event
  })
  window.addEventListener('appinstalled', () => {
    deferredPrompt = null
  })
  isListenerAttached = true
}

// Attach as early as possible (module load time)
attachPwaPromptListener()

export function usePwaInstallPrompt() {
  // Lazy initializer reads the module-level variable at first render —
  // no effect needed to sync initial state.
  const [promptEvent, setPromptEvent] = useState(() => deferredPrompt)
  const appInstalledRef = useRef(null)

  useEffect(() => {
    // Called from event callbacks only — never synchronously inside the body.
    const handlePrompt = (event) => {
      event.preventDefault()
      deferredPrompt = event
      setPromptEvent(event)
    }

    const handleAppInstalled = () => {
      deferredPrompt = null
      setPromptEvent(null)
    }

    window.addEventListener('beforeinstallprompt', handlePrompt)
    window.addEventListener('appinstalled', handleAppInstalled)
    appInstalledRef.current = handleAppInstalled

    return () => {
      window.removeEventListener('beforeinstallprompt', handlePrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const promptInstall = useCallback(async () => {
    if (!deferredPrompt) return false

    try {
      deferredPrompt.prompt()
      const choiceResult = await deferredPrompt.userChoice
      const accepted = choiceResult.outcome === 'accepted'
      deferredPrompt = null
      setPromptEvent(null)
      return accepted
    } catch (error) {
      console.error('Error showing install prompt:', error)
      deferredPrompt = null
      setPromptEvent(null)
      return false
    }
  }, [])

  return {
    isInstallPromptAvailable: Boolean(promptEvent),
    promptInstall,
  }
}