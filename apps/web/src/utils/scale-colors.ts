type Color = 'red' | 'orange' | 'amber' | 'yellow' | 'lime' | 'green' | 'emerald' | 'gray'

const colors: Record<Color, string[]> = {
  red: ['bg-red-500', 'dark:bg-red-600'],
  orange: ['bg-orange-500', 'dark:bg-orange-600'],
  amber: ['bg-amber-500', 'dark:bg-amber-600'],
  yellow: ['bg-yellow-500', 'dark:bg-yellow-600'],
  lime: ['bg-lime-500', 'dark:bg-lime-600'],
  green: ['bg-green-400', 'dark:bg-green-500'],
  emerald: ['bg-emerald-500', 'dark:bg-emerald-600'],
  gray: ['bg-gray-500', 'dark:bg-gray-600'],
}

export function positiveColors(percentage: number) {
  const part = 100 / (Object.keys(colors).length - 1)

  if (percentage < part * 1) {
    return colors.red
  } else if (percentage < part * 2) {
    return colors.orange
  } else if (percentage < part * 3) {
    return colors.amber
  } else if (percentage < part * 4) {
    return colors.yellow
  } else if (percentage < part * 5) {
    return colors.lime
  } else if (percentage < part * 6) {
    return colors.green
  } else if (percentage < part * 7) {
    return colors.emerald
  } else {
    return colors.gray
  }
}

export function negativeColors(percentage: number) {
  const part = 100 / (Object.keys(colors).length - 1)

  if (percentage < part * 1) {
    return colors.emerald
  } else if (percentage < part * 2) {
    return colors.green
  } else if (percentage < part * 3) {
    return colors.lime
  } else if (percentage < part * 4) {
    return colors.yellow
  } else if (percentage < part * 5) {
    return colors.amber
  } else if (percentage < part * 6) {
    return colors.orange
  } else if (percentage < part * 7) {
    return colors.red
  } else {
    return colors.gray
  }
}
