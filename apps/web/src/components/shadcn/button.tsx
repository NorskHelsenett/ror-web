import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/clsxm'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          'border border-action-blue-border bg-action-blue text-action-blue-foreground shadow-xs hover:bg-action-blue-hover',
        destructive:
          'border border-[light-dark(#c47e86,#88464e)] bg-[light-dark(#fff0f2,#321e24)] text-[light-dark(#942c3b,#ffb4bc)] shadow-xs hover:bg-[light-dark(#ffe0e5,#482a33)] focus-visible:ring-destructive/20',
        green:
          'border border-[light-dark(#70a88d,#39775f)] bg-[light-dark(#edf8f1,#192e26)] text-[light-dark(#236344,#9de2bf)] shadow-xs hover:bg-[light-dark(#d9efdf,#244336)]',
        outline:
          'border border-[light-dark(#9ba5b3,#626b78)] bg-[light-dark(#f4f6f9,#252a32)] text-[light-dark(#374151,#d3dae4)] shadow-xs hover:bg-[light-dark(#e5e9ef,#343c48)]',
        secondary:
          'border border-[light-dark(#9ba5b3,#626b78)] bg-[light-dark(#f4f6f9,#252a32)] text-[light-dark(#374151,#d3dae4)] shadow-xs hover:bg-[light-dark(#e5e9ef,#343c48)]',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        argocd:
          'border border-[light-dark(#929bd0,#626eb0)] bg-[light-dark(#f0f1ff,#242640)] text-[light-dark(#434e95,#bac4ff)] shadow-xs hover:bg-[light-dark(#e1e4ff,#343959)]',
        grafana:
          'border border-[light-dark(#c18b63,#a76840)] bg-[light-dark(#fff3e9,#35271f)] text-[light-dark(#8a481c,#ffbf91)] shadow-xs hover:bg-[light-dark(#ffe5cf,#4b3629)]',
        rorcli:
          'border border-[light-dark(#85a975,#558a46)] bg-[light-dark(#f0f7ea,#22301e)] text-[light-dark(#39652a,#b3e39f)] shadow-xs hover:bg-[light-dark(#dfedD3,#31442a)]',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    compoundVariants: [
      {
        size: 'icon',
        className:
          'border-transparent bg-transparent text-foreground shadow-none hover:bg-accent hover:text-accent-foreground',
      },
    ],
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
