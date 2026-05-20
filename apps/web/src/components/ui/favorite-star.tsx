import { addFavoriteItem, removeFavoriteItem } from '@/features/dashboard/utils/dashboard-localstorage'
import { cn } from '@/utils/clsxm'
import { getSavedPreference } from '@/utils/local-storage'
import { Star } from 'lucide-react'
import { useEffect, useState } from 'react'

interface FavoriteStarProps {
  domain: string
  itemId: string
  className?: string
  favorited?: boolean
  scale?:
    | 'scale-0'
    | 'scale-50'
    | 'scale-75'
    | 'scale-90'
    | 'scale-95'
    | 'scale-100'
    | 'scale-105'
    | 'scale-110'
    | 'scale-125'
    | 'scale-150'
    | 'scale-200'
}

function checkIfFavorited(domain: string, itemId: string) {
  const items = getSavedPreference(`${domain}:favorite`, [] as string[])
  return items.includes(itemId)
}

export const FavoriteStar = ({ domain, itemId, className, scale = 'scale-100' }: FavoriteStarProps) => {
  const [favorited, setFavorited] = useState(false)

  useEffect(() => {
    const items = getSavedPreference(`${domain}:favorite`, [] as string[])
    setFavorited(items.includes(itemId))
  }, [domain, itemId])

  function toggleFavoriteLocalstorage(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    e.preventDefault()

    if (favorited) {
      addFavoriteItem(itemId, domain)
      setFavorited(false)
    } else {
      removeFavoriteItem(itemId, domain)
      setFavorited(true)
    }
  }

  return (
    <button
      className={cn('h-13 w-13 flex items-center justify-center', className)}
      onClick={toggleFavoriteLocalstorage}
    >
      <Star className={cn(favorited && 'fill-yellow-500', 'w-full h-full hover:fill-yellow-500', scale)} />
    </button>
  )
}
