const TARKOV_API_URL = 'https://api.tarkov.dev/graphql'

const AMMO_BANK_QUERY = `
{
  items(types: ammo) {
    id
    name
    shortName
    iconLink
    image512pxLink
    properties {
      __typename
      ... on ItemPropertiesAmmo {
        caliber
        damage
        penetrationPower
        armorDamage
        fragmentationChance
        projectileCount
      }
    }
  }
}
`

function sanitizeAmmoStats(value, fallback = 0) {
  return Number.isFinite(value) ? value : fallback
}

export async function fetchTarkovAmmoBank() {
  const response = await fetch(TARKOV_API_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: AMMO_BANK_QUERY }),
  })

  if (!response.ok) {
    throw new Error(`Tarkov API request failed: ${response.status}`)
  }

  const payload = await response.json()

  if (payload.errors?.length) {
    throw new Error(payload.errors[0].message || 'Tarkov API returned an error')
  }

  const items = payload.data?.items ?? []

  return items
    .filter(
      (item) =>
        item?.id &&
        item?.name &&
        item.properties?.__typename === 'ItemPropertiesAmmo',
    )
    .map((item) => ({
      id: item.id,
      name: item.name,
      shortName: item.shortName || item.name,
      imageUrl: item.image512pxLink || item.iconLink || '',
      caliber: item.properties?.caliber || 'Unknown',
      damage: sanitizeAmmoStats(item.properties?.damage),
      penetrationPower: sanitizeAmmoStats(item.properties?.penetrationPower),
      armorDamage: sanitizeAmmoStats(item.properties?.armorDamage),
      fragmentationChance: sanitizeAmmoStats(item.properties?.fragmentationChance),
      projectileCount: sanitizeAmmoStats(item.properties?.projectileCount, 1),
    }))
}
