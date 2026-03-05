const STAT_COLUMNS = [
  { key: 'name', label: 'Weapon' },
  { key: 'weaponClass', label: 'Class' },
  { key: 'caliber', label: 'Caliber' },
  { key: 'fireModes', label: 'Fire Mode' },
  { key: 'fireRate', label: 'RPM' },
]

const NUMERIC_COLUMNS = new Set(['fireRate'])

function formatValue(columnKey, weapon) {
  if (columnKey === 'name') {
    return weapon.shortName
  }

  if (columnKey === 'fireModes') {
    return weapon.fireModes.join(', ') || 'Unknown'
  }

  if (columnKey === 'fireRate') {
    return weapon.fireRate ? `${weapon.fireRate}` : 'Unknown'
  }

  return weapon[columnKey] || 'Unknown'
}

function WeaponGuessBoard({ attempts }) {
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
    <div className="weapon-board" aria-label="Weapon comparison board">
      <div className="weapon-board-header">
        {STAT_COLUMNS.map((column) => (
          <span key={column.key}>{column.label}</span>
        ))}
      </div>

      {attempts.map((attempt) => {
        if (attempt.isEmpty) {
          return (
            <div className="weapon-board-row weapon-board-row--empty" key={attempt.id}>
              {STAT_COLUMNS.map((column) => (
                <span className="weapon-cell weapon-cell--empty" key={`${attempt.id}-${column.key}`}>
                  -
                </span>
              ))}
            </div>
          )
        }

        return (
          <div className="weapon-board-row" key={attempt.id}>
            {STAT_COLUMNS.map((column) => {
              const value = withHint(
                attempt,
                column.key,
                formatValue(column.key, attempt.weapon),
              )

              if (column.key === 'name') {
                return (
                  <span
                    className={`weapon-cell weapon-cell--${attempt.evaluation[column.key]}`}
                    key={`${attempt.id}-${column.key}`}
                  >
                    <span className="weapon-name-cell">
                      <img
                        alt=""
                        className="weapon-name-thumb"
                        loading="lazy"
                        src={attempt.weapon.imageUrl}
                      />
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

export default WeaponGuessBoard
