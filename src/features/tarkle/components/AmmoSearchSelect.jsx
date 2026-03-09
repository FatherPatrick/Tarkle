import { useEffect, useMemo, useRef, useState } from 'react'

function ammoMatches(ammo, query) {
  const text = [ammo.name, ammo.shortName, ammo.caliber].join(' ').toLowerCase()
  return text.includes(query.toLowerCase())
}

function getBaseAmmoName(ammo) {
  return ammo.shortName?.trim() || ammo.name?.trim() || 'Unknown ammo'
}

function isFlareAmmo(ammo) {
  const text = [ammo.name, ammo.shortName].join(' ').toLowerCase()
  return text.includes('flare') || text.includes('signal')
}

function AmmoSearchSelect({ ammoBank, selectedAmmoId, onSelectAmmo, disabled, inputId }) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const rootRef = useRef(null)

  const selectedAmmo = useMemo(
    () => ammoBank.find((ammo) => ammo.id === selectedAmmoId),
    [ammoBank, selectedAmmoId],
  )

  const ammoLabelById = useMemo(() => {
    const countsByName = new Map()

    ammoBank.forEach((ammo) => {
      const baseName = getBaseAmmoName(ammo).toLowerCase()
      countsByName.set(baseName, (countsByName.get(baseName) || 0) + 1)
    })

    const labels = new Map()

    ammoBank.forEach((ammo) => {
      const baseName = getBaseAmmoName(ammo)
      const duplicateCount = countsByName.get(baseName.toLowerCase()) || 0
      const isFlare = isFlareAmmo(ammo)

      const labelDetails = []

      if (duplicateCount > 1) {
        labelDetails.push(ammo.caliber)
      }

      if (isFlare) {
        labelDetails.push('Flare')
      }

      labels.set(
        ammo.id,
        labelDetails.length ? `${baseName} (${labelDetails.join(', ')})` : baseName,
      )
    })

    return labels
  }, [ammoBank])

  const filteredAmmo = useMemo(() => {
    const trimmedQuery = query.trim()

    if (!trimmedQuery) {
      return ammoBank
    }

    return ammoBank.filter((ammo) => ammoMatches(ammo, trimmedQuery))
  }, [ammoBank, query])

  useEffect(() => {
    function handleClickOutside(event) {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    window.addEventListener('pointerdown', handleClickOutside)
    return () => window.removeEventListener('pointerdown', handleClickOutside)
  }, [])

  const handleInputFocus = () => {
    if (!disabled) {
      setIsOpen(true)
    }
  }

  const handleInputChange = (event) => {
    setQuery(event.target.value)
    onSelectAmmo('')
    setIsOpen(true)
  }

  const handleAmmoPick = (ammoId) => {
    onSelectAmmo(ammoId)
    setIsOpen(false)
    setQuery('')
  }

  const selectedLabel = selectedAmmo ? ammoLabelById.get(selectedAmmo.id) : ''
  const displayValue = query || selectedLabel || ''

  return (
    <div className="weapon-search" ref={rootRef}>
      <input
        id={inputId}
        aria-expanded={isOpen}
        aria-label="Search for ammo"
        className="weapon-search-input"
        disabled={disabled}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        placeholder="Search ammo name..."
        role="combobox"
        type="text"
        value={displayValue}
      />

      {isOpen && !disabled ? (
        <div className="weapon-search-results" role="listbox">
          {filteredAmmo.length ? (
            filteredAmmo.map((ammo) => (
              <button
                className="weapon-search-option ammo-search-option"
                key={ammo.id}
                onClick={() => handleAmmoPick(ammo.id)}
                type="button"
              >
                <span>{ammoLabelById.get(ammo.id)}</span>
              </button>
            ))
          ) : (
            <div className="weapon-search-empty">No ammo matches that search.</div>
          )}
        </div>
      ) : null}
    </div>
  )
}

export default AmmoSearchSelect
