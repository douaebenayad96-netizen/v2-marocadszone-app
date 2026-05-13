import { cn } from "../../utils/helpers"

export type BadgeType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'

type BadgeProps = {
  text: string
  type: BadgeType
  className?: string
}

const Badge = ({ text, type, className }: BadgeProps) => {
  return (
    <div
      className={cn(
        'px-2 py-1 rounded-md text-xs',
        {
          'bg-green-100 text-green-500': type === 'success',
          'bg-red-100 text-red-500': type === 'danger',
          'bg-orange-100 text-orange-500': type === 'warning',
          'bg-blue-100 text-blue-500': type === 'info',
          'bg-gray-100 text-gray-500': type === 'light',
          'bg-black text-white': type === 'dark',
          'bg-purple-100 text-purple-500': type === 'primary',
          'bg-primary-purple-200 text-primary-purple-900': type === 'secondary'
        },
        className
      )}
    >
      {text}
    </div>
  )
}

export default Badge