import { Button } from '@/components/shadcn/button'
import { ExternalLink } from 'lucide-react'

function getSafeExternalUrl(url: string | null | undefined): string | null {
  if (!url) return null

  const trimmed = url.trim()
  if (!trimmed) return null

  try {
    const parsed = new URL(trimmed)
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return parsed.toString()
    }
    return null
  } catch {
    return null
  }
}

export function ExternalToolButton({
  name,
  type,
  url,
  size,
  appearance = 'button',
}: {
  name: string
  type: 'argocd' | 'grafana'
  url: string | null | undefined
  size?: 'default' | 'sm'
  appearance?: 'button' | 'text'
}) {
  const safeUrl = getSafeExternalUrl(url)

  if (appearance === 'text') {
    const content = (
      <>
        <ExternalLink className='size-3.5' /> {name}
      </>
    )
    const className = 'inline-flex items-center gap-1.5 whitespace-nowrap text-sm text-muted-foreground'
    return safeUrl ? (
      <a
        href={safeUrl}
        target='_blank'
        rel='noopener noreferrer'
        onClick={(e) => e.stopPropagation()}
        className={`${className} hover:text-foreground hover:underline`}
      >
        {content}
      </a>
    ) : (
      <span className={`${className} opacity-50`} aria-disabled='true'>
        {content}
      </span>
    )
  }

  if (!safeUrl) {
    return (
      <Button variant={type} size={size} disabled className='font-bold'>
        <ExternalLink className='w-5 h-5' /> {name}
      </Button>
    )
  }
  return (
    <Button variant={type} size={size} className='font-bold' asChild>
      <a href={safeUrl} target='_blank' rel='noopener noreferrer' onClick={(e) => e.stopPropagation()}>
        <ExternalLink className='w-5 h-5' /> {name}
      </a>
    </Button>
  )
}
