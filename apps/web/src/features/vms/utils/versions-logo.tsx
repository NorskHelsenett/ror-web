import { BsWindows } from 'react-icons/bs'
import { FaLinux } from 'react-icons/fa'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/shadcn/tooltip'

export const ConvertToVersionLogo = (version: string) => {
  switch (version) {
    case 'Windows':
      return <BsWindows size={20} />
    case 'Linux':
      return <FaLinux size={20} />
    default:
      return version
  }
}

export const VersionLogoWithTooltip = ({ version }: { version: string }) => {
  return (
    <span className='flex items-center justify-center gap-1'>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className='px-2 py-1 rounded text-sm text-muted-foreground'>{ConvertToVersionLogo(version)}</span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{version}</p>
        </TooltipContent>
      </Tooltip>
    </span>
  )
}
