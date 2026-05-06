import { Button } from '@/components/shadcn/button'
import { ExternalLink } from 'lucide-react'

export function ExternalToolButton({
  name,
  type,
  url,
}: {
  name: string
  type: 'argocd' | 'grafana'
  url: string | null | undefined
}) {
  if (!url)
    return (
      <Button variant={type} disabled className='font-bold'>
        <ExternalLink className='w-5 h-5' /> {name}
      </Button>
    )
  return (
    <Button variant={type} className='font-bold' asChild>
      <a href={url} target='_blank' rel='noopener noreferrer' onClick={(e) => e.stopPropagation()}>
        <ExternalLink className='w-5 h-5' /> {name}
      </a>
    </Button>
  )
}
