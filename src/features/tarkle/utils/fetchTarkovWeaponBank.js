const TARKOV_API_URL = 'https://api.tarkov.dev/graphql'

const WEAPON_BANK_QUERY = `
{
  items(types: gun) {
    id
    name
    shortName
    iconLink
    image512pxLink
    image8xLink
    inspectImageLink
    categories {
      name
    }
    properties {
      ... on ItemPropertiesWeapon {
        caliber
        fireRate
        fireModes
        defaultErgonomics
        defaultRecoilVertical
        defaultRecoilHorizontal
        defaultAmmo {
          shortName
        }
      }
    }
  }
}
`

function toWeaponClass(categories = []) {
  return (
    categories.find(
      ({ name }) => !['Weapon', 'Compound item', 'Item'].includes(name),
    )?.name || 'Unknown'
  )
}

const VARIANT_WORDS = new Set([
  'sniper',
  'infantry',
  'carbine',
  'tactical',
  'compact',
  'assault',
  'rifle',
  'shotgun',
  'pistol',
  'submachine',
  'machine',
  'gun',
  'bolt',
  'action',
])

function normalizeFireModes(value) {
  if (Array.isArray(value)) {
    return value
  }

  if (typeof value === 'string' && value) {
    return [value]
  }

  return []
}

function normalizeModelToken(token) {
  return token
    .replace(/[^a-z0-9]/gi, '')
    .toLowerCase()
    .replace(/(\d+)[a-z]$/, '$1')
}

function toNameFamily(weapon) {
  const raw = `${weapon.shortName} ${weapon.name}`.toLowerCase()

  const tokens = raw
    .split(/\s+/)
    .map(normalizeModelToken)
    .filter((token) => token && !VARIANT_WORDS.has(token) && token.length > 1)

  return tokens.slice(0, 2).join('-') || normalizeModelToken(weapon.shortName)
}

function toCoreStatsKey(weapon) {
  const fireModes = normalizeFireModes(weapon.fireModes)
    .map((mode) => mode.toLowerCase())
    .sort()
    .join('|')

  return [
    weapon.weaponClass,
    weapon.caliber,
    weapon.fireRate,
    fireModes,
    toNameFamily(weapon),
  ].join('::')
}

function pickRepresentative(existing, incoming) {
  const existingScore = existing.shortName.length
  const incomingScore = incoming.shortName.length

  if (incomingScore < existingScore) {
    return incoming
  }

  if (incomingScore === existingScore && incoming.name.length < existing.name.length) {
    return incoming
  }

  return existing
}

export async function fetchTarkovWeapons() {
  const response = await fetch(TARKOV_API_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: WEAPON_BANK_QUERY }),
  })

  if (!response.ok) {
    throw new Error(`Tarkov API request failed: ${response.status}`)
  }

  const payload = await response.json()

  if (payload.errors?.length) {
    throw new Error(payload.errors[0].message || 'Tarkov API returned an error')
  }

  const items = payload.data?.items ?? []

  const mappedWeapons = items
    .filter((item) => item?.id && item?.name)
    .map((item) => ({
      id: item.id,
      name: item.name,
      shortName: item.shortName || item.name,
      imageUrl:
        item.inspectImageLink ||
        item.image512pxLink ||
        item.image8xLink ||
        item.iconLink ||
        '',
      weaponClass: toWeaponClass(item.categories),
      caliber: item.properties?.caliber || 'Unknown',
      fireRate: item.properties?.fireRate ?? 0,
      fireModes: normalizeFireModes(item.properties?.fireModes),
      ergonomics: item.properties?.defaultErgonomics ?? 0,
      recoilVertical: item.properties?.defaultRecoilVertical ?? 0,
      recoilHorizontal: item.properties?.defaultRecoilHorizontal ?? 0,
      defaultAmmo: item.properties?.defaultAmmo?.shortName || 'Unknown',
    }))

  const dedupedWeaponsByKey = new Map()

  mappedWeapons.forEach((weapon) => {
    const dedupeKey = toCoreStatsKey(weapon)
    const existing = dedupedWeaponsByKey.get(dedupeKey)

    if (!existing) {
      dedupedWeaponsByKey.set(dedupeKey, weapon)
      return
    }

    dedupedWeaponsByKey.set(dedupeKey, pickRepresentative(existing, weapon))
  })

  return [...dedupedWeaponsByKey.values()]
}
