export const vmActionsColors: Record<string, 'red' | 'emerald' | 'gray' | 'orange' | 'blue'> = {
  powerOff: 'red',
  powerOn: 'emerald',
  undefined: 'gray',
  restart: 'orange',
  suspend: 'blue',
  delete: 'red',
}

export const vmCardColors: Record<string, 'red' | 'emerald' | 'gray'> = {
  poweredOff: 'red',
  poweredOn: 'emerald',
  undefined: 'gray',
}

export const vmCardPowerStatus: Record<string, [string, string]> = {
  poweredOff: ['bg-red-500', 'text-red-900'],
  poweredOn: ['bg-emerald-500', 'text-emerald-900'],
  undefined: ['bg-gray-300', 'text-gray-900'],
}

export const pillPowerStatusColors: Record<string, 'red' | 'emerald' | 'gray'> = {
  Off: 'red',
  On: 'emerald',
  Undefined: 'gray',
}

export const getDiskColors = (count: number) => {
  const colors = [
    'bg-blue-500',
    'bg-pink-500',
    'bg-cyan-500',
    'bg-violet-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-red-500',
    'bg-indigo-500',
    'bg-teal-500',
    'bg-lime-500',
    'bg-amber-500',
    'bg-rose-500',
    'bg-emerald-500',
  ]
  return Array.from({ length: count }, (_, i) => colors[i % colors.length])
}
