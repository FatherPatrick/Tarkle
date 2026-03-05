import { useEffect, useRef, useState } from 'react'
import { ADS_ENABLED, ADSENSE_CLIENT_ID } from './adsConfig'
import { ensureAdSenseScript } from './ensureAdSenseScript'

function AdSlot({ slot, label = 'Advertisement', minHeight = 120 }) {
  const adRef = useRef(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    let active = true

    async function load() {
      if (!ADS_ENABLED || !ADSENSE_CLIENT_ID || !slot) {
        return
      }

      const loaded = await ensureAdSenseScript(ADSENSE_CLIENT_ID)
      if (active && loaded) {
        setIsReady(true)
      }
    }

    load()

    return () => {
      active = false
    }
  }, [slot])

  useEffect(() => {
    if (!isReady || !adRef.current) {
      return
    }

    if (adRef.current.getAttribute('data-ad-status')) {
      return
    }

    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {
      // Ignore transient ad-init errors while scaffolding.
    }
  }, [isReady])

  if (!ADS_ENABLED || !ADSENSE_CLIENT_ID || !slot) {
    return (
      <aside className="ad-slot ad-slot--placeholder" style={{ minHeight }}>
        <span className="ad-slot-label">{label}</span>
        <span className="ad-slot-copy">Ad placeholder</span>
      </aside>
    )
  }

  return (
    <aside className="ad-slot" style={{ minHeight }}>
      <span className="ad-slot-label">{label}</span>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  )
}

export default AdSlot
