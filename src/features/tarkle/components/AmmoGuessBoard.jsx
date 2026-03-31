const AMMO_COLUMNS = [
  { key: 'name', label: 'Ammo' },
  { key: 'caliber', label: 'Caliber' },
  { key: 'damage', label: 'Damage' },
  { key: 'penetrationPower', label: 'Pen' },
  { key: 'armorDamage', label: 'Armor Dmg' },
  { key: 'fragmentationChance', label: 'Frag %' },
]

const NUMERIC_COLUMNS = new Set([
  'damage',
  'penetrationPower',
  'armorDamage',
  'fragmentationChance',
])

function formatValue(columnKey, ammo) {
  if (columnKey === 'name') {
    return ammo.shortName
  }

  if (columnKey === 'fragmentationChance') {
    return `${Math.round(ammo.fragmentationChance * 100)}%`
  }

  return ammo[columnKey] ?? 'Unknown'
}

function AmmoGuessBoard({ attempts, showImages = false }) {
  const withHint = (attempt, columnKey, value) => {
    if (!NUMERIC_COLUMNS.has(columnKey)) {
      return value
    }

    const hint = attempt.numericHints?.[columnKey]
    const cellState = attempt.evaluation[columnKey]

    if (!hint || hint === 'match' || cellState === 'correct') {
      return value
    }

    const arrow = hint === 'up' ? '^' : 'v'
    return `${value} ${arrow}`
  }

  return (
    <div className="ammo-board" aria-label="Ammo comparison board">
      <div className="ammo-board-header">
        {AMMO_COLUMNS.map((column) => (
          <span key={column.key}>{column.label}</span>
        ))}
      </div>

      {attempts.map((attempt) => {
        if (attempt.isEmpty) {
          return (
            <div className="ammo-board-row ammo-board-row--empty" key={attempt.id}>
              {AMMO_COLUMNS.map((column) => (
                <span className="weapon-cell weapon-cell--empty" key={`${attempt.id}-${column.key}`}>
                  -
                </span>
              ))}
            </div>
          )
        }

        return (
          <div className="ammo-board-row" key={attempt.id}>
            {AMMO_COLUMNS.map((column) => {
              const value = withHint(attempt, column.key, formatValue(column.key, attempt.ammo))

              if (column.key === 'name') {
                return (
                  <span
                    className={`weapon-cell weapon-cell--${attempt.evaluation[column.key]}`}
                    key={`${attempt.id}-${column.key}`}
                  >
                    <span className="weapon-name-cell">
                      {showImages ? (
                        <img
                          alt=""
                          className="weapon-name-thumb"
                          loading="lazy"
                          src={attempt.ammo.imageUrl}
                        />
                      ) : null}
                      <span>{value}</span>
                    </span>
                  </span>
                )
              }

              return (
                <span
                  className={`weapon-cell weapon-cell--${attempt.evaluation[column.key]}`}
                  key={`${attempt.id}-${column.key}`}
                >
                  {value}
                </span>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default AmmoGuessBoard
