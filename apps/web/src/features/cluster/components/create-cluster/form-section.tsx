import { errorTextStyling } from '@/features/cluster/config/create-cluster-styling'
import { FormSectionProps } from '@/features/cluster/types/create-cluster'
import { cn } from '@/utils/clsxm'

export const FormSection = ({ title, error, children, className }: FormSectionProps) => {
  return (
    <section className={cn(className, 'flex flex-col items-center')}>
      <h3>{title}</h3>
      <div>{children}</div>
      {error && <span className={errorTextStyling}>{error}</span>}
    </section>
  )
}
