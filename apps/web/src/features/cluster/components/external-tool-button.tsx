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
}: {
  name: string
  type: 'argocd' | 'grafana'
  url: string | null | undefined
}) {
  const safeUrl = getSafeExternalUrl(url)

  if (!safeUrl) {
    return (
      <Button variant={type} disabled className='font-bold'>
        <ExternalLink className='w-5 h-5' /> {name}
      </Button>
    )
  }
  return (
    <Button variant={type} className='font-bold' asChild>
      <a href={safeUrl} target='_blank' rel='noopener noreferrer' onClick={(e) => e.stopPropagation()}>
        <ExternalLink className='w-5 h-5' /> {name}
      </a>
    </Button>
  )
}
