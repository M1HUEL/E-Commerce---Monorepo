import { cva, type VariantProps } from 'class-variance-authority'
import { type ButtonHTMLAttributes } from 'react'

import { cn } from './lib.js'

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
        ghost: 'bg-transparent text-gray-900 hover:bg-gray-100',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
)

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>

export function Button({ variant, className, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant }), className)} {...props} />
  )
}
