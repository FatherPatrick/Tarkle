export const MAX_AMMO_ATTEMPTS = 6
export const AMMO_CLOSE_RANGE = {
  damage: 6,
  penetrationPower: 4,
  armorDamage: 8,
  fragmentationChance: 0.1,
}

export const FALLBACK_AMMO_BANK = [
  {
    id: '54527a984bdc2d4e668b4567',
    name: '5.56x45mm M855',
    shortName: 'M855',
    imageUrl: 'https://assets.tarkov.dev/54527a984bdc2d4e668b4567-512.webp',
    caliber: 'Caliber556x45NATO',
    damage: 54,
    penetrationPower: 31,
    armorDamage: 37,
    fragmentationChance: 0.5,
    projectileCount: 1,
  },
  {
    id: '5d6e6806a4b936088465b17e',
    name: '5.45x39mm BT gs',
    shortName: 'BT',
    imageUrl: 'https://assets.tarkov.dev/5d6e6806a4b936088465b17e-512.webp',
    caliber: 'Caliber545x39',
    damage: 42,
    penetrationPower: 40,
    armorDamage: 49,
    fragmentationChance: 0.16,
    projectileCount: 1,
  },
  {
    id: '5a26ac0ec4a28200741e1e18',
    name: '7.62x39mm PS gzh',
    shortName: 'PS',
    imageUrl: 'https://assets.tarkov.dev/5a26ac0ec4a28200741e1e18-512.webp',
    caliber: 'Caliber762x39',
    damage: 57,
    penetrationPower: 35,
    armorDamage: 52,
    fragmentationChance: 0.25,
    projectileCount: 1,
  },
  {
    id: '59e4d24686f7741776641ac7',
    name: '7.62x54mm R LPS gzh',
    shortName: 'LPS',
    imageUrl: 'https://assets.tarkov.dev/59e4d24686f7741776641ac7-512.webp',
    caliber: 'Caliber762x54R',
    damage: 81,
    penetrationPower: 42,
    armorDamage: 78,
    fragmentationChance: 0.18,
    projectileCount: 1,
  },
  {
    id: '5efb0da7a29a85116f6ea05f',
    name: '.45 ACP AP',
    shortName: '.45 AP',
    imageUrl: 'https://assets.tarkov.dev/5efb0da7a29a85116f6ea05f-512.webp',
    caliber: 'Caliber1143x23ACP',
    damage: 66,
    penetrationPower: 38,
    armorDamage: 60,
    fragmentationChance: 0.01,
    projectileCount: 1,
  },
]

export function getRandomAmmoSolution(bank = FALLBACK_AMMO_BANK) {
  if (!bank.length) {
    return FALLBACK_AMMO_BANK[0]
  }

  const randomIndex = Math.floor(Math.random() * bank.length)
  return bank[randomIndex]
}
