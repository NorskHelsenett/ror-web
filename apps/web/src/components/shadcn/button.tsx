import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/clsxm'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-blue-500 dark:bg-blue-600 shadow-xs hover:bg-blue-600 dark:hover:bg-blue-700',
        destructive:
          'bg-red-500 dark:bg-red-600 text-white shadow-xs hover:bg-red-600 dark:hover:bg-red-700 focus-visible:ring-destructive/20',
        green:
          'bg-emerald-500 dark:bg-emerald-600 text-white shadow-xs hover:bg-emerald-600 dark:hover:bg-emerald-700 focus-visible:ring-destructive/20',
        outline: 'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        argocd:
          'border-2 bg-[#4141e1]/10 dark:bg-[#7c93ff]/10 border-[#4141e1] dark:border-[#7c93ff] text-[#4141e1] dark:text-[#7c93ff] shadow-xs hover:bg-[#2c2cc7] hover:text-white dark:hover:text-white dark:hover:bg-[#7c93ff]/20',
        grafana:
          'border-2 bg-[#ff671d]/10 dark:bg-[#ff9142]/10 border-[#ff671d] dark:border-[#ff9142] text-[#ff671d] dark:text-[#ff9142] shadow-xs hover:bg-[#e05009] hover:text-white dark:hover:text-white dark:hover:bg-[#ff9142]/20',
        rorcli:
          'border-2 bg-[#04d607]/10 dark:bg-[#49ce2c]/10 border-[#04d607] dark:border-[#49ce2c] text-[#04d607] dark:text-[#49ce2c] shadow-xs hover:bg-[#04b306] hover:text-white dark:hover:text-white dark:hover:bg-[#49ce2c]/20',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

type ButtonProps = React.ComponentPropsWithoutRef<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return <Comp ref={ref} data-slot='button' className={cn(buttonVariants({ variant, size }), className)} {...props} />
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
