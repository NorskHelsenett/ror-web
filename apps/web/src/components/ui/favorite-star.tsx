import { cn } from '@/utils/clsxm'
import { Star } from 'lucide-react'

interface FavoriteStarProps {
  className?: string
  favorited?: boolean
}

export const FavoriteStar = ({ className, favorited }: FavoriteStarProps) => {
  return (
    <div className={cn('h-13 w-13 flex items-center justify-center', className)}>
      <Star className={cn(favorited && 'fill-yellow-500', 'h-11 w-11')} />
    </div>
  )
}
