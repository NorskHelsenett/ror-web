import { errorTextStyling } from '@/features/cluster/config/create-cluster-styling'
import { FormSectionProps } from '@/features/cluster/types/create-cluster'
import { cn } from '@/utils/clsxm'

export const FormSection = ({ title, error, children, className }: FormSectionProps) => {
  return (
    <section className={cn(className, 'flex flex-col items-center')}>
      <h3 className={cn('text-3xl', 'sm:text-3xl', 'md:text-4xl')}>{title}</h3>
      <div className={cn('mt-2', 'sm:mt-4')}>{children}</div>
      {error && <span className={errorTextStyling}>{error}</span>}
    </section>
  )
}
