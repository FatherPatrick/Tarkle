import { useEffect, useMemo, useRef, useState } from 'react'

function weaponMatches(weapon, query) {
  const text = [
    weapon.name,
    weapon.shortName,
    weapon.weaponClass,
    weapon.caliber,
    weapon.defaultAmmo,
  ]
    .join(' ')
    .toLowerCase()

  return text.includes(query.toLowerCase())
}

function WeaponSearchSelect({
  weapons,
  selectedWeaponId,
  onSelectWeapon,
  disabled,
  inputId,
  showImages = false,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const rootRef = useRef(null)

  const selectedWeapon = useMemo(
    () => weapons.find((weapon) => weapon.id === selectedWeaponId),
    [weapons, selectedWeaponId],
  )

  const filteredWeapons = useMemo(() => {
    const trimmedQuery = query.trim()

    if (!trimmedQuery) {
      return weapons
    }

    return weapons.filter((weapon) => weaponMatches(weapon, trimmedQuery))
  }, [weapons, query])

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
    onSelectWeapon('')
    setIsOpen(true)
  }

  const handleWeaponPick = (weaponId) => {
    onSelectWeapon(weaponId)
    setIsOpen(false)
    setQuery('')
  }

  const displayValue = query || selectedWeapon?.name || ''

  return (
    <div className="weapon-search" ref={rootRef}>
      <input
        id={inputId}
        aria-expanded={isOpen}
        aria-label="Search for a weapon"
        className="weapon-search-input"
        disabled={disabled}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        placeholder="Search weapon name, class, caliber..."
        role="combobox"
        type="text"
        value={displayValue}
      />

      {isOpen && !disabled ? (
        <div className="weapon-search-results" role="listbox">
          {filteredWeapons.length ? (
            filteredWeapons.map((weapon) => (
              <button
                className={`weapon-search-option${showImages ? '' : ' weapon-search-option--text-only'}`}
                key={weapon.id}
                onClick={() => handleWeaponPick(weapon.id)}
                type="button"
              >
                {showImages ? (
                  <img
                    alt=""
                    className="weapon-search-thumb"
                    loading="lazy"
                    src={weapon.imageUrl}
                  />
                ) : null}
                <span>{weapon.name}</span>
              </button>
            ))
          ) : (
            <div className="weapon-search-empty">No weapons match that search.</div>
          )}
        </div>
      ) : null}
    </div>
  )
}

export default WeaponSearchSelect
