let scriptLoadPromise = null

export function ensureAdSenseScript(clientId) {
  if (!clientId) {
    return Promise.resolve(false)
  }

  if (scriptLoadPromise) {
    return scriptLoadPromise
  }

  const existing = document.querySelector(
    'script[data-tarkle-adsense="true"]',
  )

  if (existing) {
    scriptLoadPromise = Promise.resolve(true)
    return scriptLoadPromise
  }

  scriptLoadPromise = new Promise((resolve) => {
    const script = document.createElement('script')
    script.async = true
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`
    script.crossOrigin = 'anonymous'
    script.setAttribute('data-tarkle-adsense', 'true')

    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)

    document.head.appendChild(script)
  })

  return scriptLoadPromise
}
