import { useEffect, useMemo, useRef, useState } from 'react'

function ammoMatches(ammo, query) {
  const text = [ammo.name, ammo.shortName, ammo.caliber].join(' ').toLowerCase()
  return text.includes(query.toLowerCase())
}

function AmmoSearchSelect({ ammoBank, selectedAmmoId, onSelectAmmo, disabled, inputId }) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const rootRef = useRef(null)

  const selectedAmmo = useMemo(
    () => ammoBank.find((ammo) => ammo.id === selectedAmmoId),
    [ammoBank, selectedAmmoId],
  )

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

  const displayValue = query || selectedAmmo?.name || ''

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
        placeholder="Search ammo name or caliber..."
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
                <span>{ammo.name}</span>
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
