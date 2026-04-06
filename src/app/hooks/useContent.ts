import { useReducer, useEffect } from 'react'
import staticContent from '../../content.json'

declare global {
  interface Window {
    __PREVIEW_CONTENT__?: typeof staticContent
  }
}

export function useContent() {
  const [, forceUpdate] = useReducer((n: number) => n + 1, 0)

  useEffect(() => {
    window.addEventListener('preview-content-changed', forceUpdate)
    return () => window.removeEventListener('preview-content-changed', forceUpdate)
  }, [])

  return window.__PREVIEW_CONTENT__ ?? staticContent
}
