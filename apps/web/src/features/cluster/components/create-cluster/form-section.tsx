import { errorTextStyling } from '@/features/cluster/config/create-cluster-styling'
import { FormSectionProps } from '@/features/cluster/types/create-cluster'
import { cn } from '@/utils/clsxm'

export const FormSection = ({ error, children, description, className }: FormSectionProps) => {
  return (
    <section className={cn('w-52', className)}>
      <div>{children}</div>
      {error && <span className={errorTextStyling}>{error}</span>}
      {!error && description && <span>{description}</span>}
    </section>
  )
}
