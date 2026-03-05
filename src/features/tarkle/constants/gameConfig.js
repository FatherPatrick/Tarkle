export const MAX_ATTEMPTS = 6
export const FIRE_RATE_CLOSE_RANGE = 75

export const FALLBACK_WEAPON_BANK = [
  {
    id: 'm4a1',
    name: 'Colt M4A1 5.56x45 assault rifle',
    shortName: 'M4A1',
    imageUrl: 'https://assets.tarkov.dev/5447a9cd4bdc2dbd208b4567-image.webp',
    weaponClass: 'Assault rifle',
    caliber: 'Caliber556x45NATO',
    fireRate: 800,
    fireModes: ['Single fire', 'Full auto'],
    ergonomics: 50,
    recoilVertical: 79,
    recoilHorizontal: 244,
    defaultAmmo: 'M855',
  },
  {
    id: 'ak74n',
    name: 'Kalashnikov AK-74N 5.45x39 assault rifle',
    shortName: 'AK-74N',
    imageUrl: 'https://assets.tarkov.dev/5644bd2b4bdc2d3b4c8b4572-image.webp',
    weaponClass: 'Assault rifle',
    caliber: 'Caliber545x39',
    fireRate: 650,
    fireModes: ['Single fire', 'Full auto'],
    ergonomics: 47,
    recoilVertical: 98,
    recoilHorizontal: 300,
    defaultAmmo: 'PS',
  },
  {
    id: 'mp133',
    name: 'MP-133 12ga pump-action shotgun',
    shortName: 'MP-133',
    imageUrl: 'https://assets.tarkov.dev/54491c4f4bdc2db1078b4568-image.webp',
    weaponClass: 'Shotgun',
    caliber: 'Caliber12g',
    fireRate: 30,
    fireModes: ['Single fire'],
    ergonomics: 45,
    recoilVertical: 420,
    recoilHorizontal: 120,
    defaultAmmo: '7mm',
  },
  {
    id: 'sv98',
    name: 'SV-98 7.62x54R bolt-action sniper rifle',
    shortName: 'SV-98',
    imageUrl: 'https://assets.tarkov.dev/55801eed4bdc2d89578b4588-image.webp',
    weaponClass: 'Sniper rifle',
    caliber: 'Caliber762x54R',
    fireRate: 30,
    fireModes: ['Single fire'],
    ergonomics: 34,
    recoilVertical: 280,
    recoilHorizontal: 85,
    defaultAmmo: 'LPS',
  },
  {
    id: 'sa58',
    name: 'DS Arms SA-58 7.62x51 assault rifle',
    shortName: 'SA-58',
    imageUrl: 'https://assets.tarkov.dev/5aafa857e5b5b0001848090-image.webp',
    weaponClass: 'Assault rifle',
    caliber: 'Caliber762x51',
    fireRate: 700,
    fireModes: ['Single fire', 'Full auto'],
    ergonomics: 42,
    recoilVertical: 115,
    recoilHorizontal: 346,
    defaultAmmo: 'M80',
  },
]

export function getRandomSolution(bank = FALLBACK_WEAPON_BANK) {
  if (!bank.length) {
    return FALLBACK_WEAPON_BANK[0]
  }

  const randomIndex = Math.floor(Math.random() * bank.length)
  return bank[randomIndex]
}
