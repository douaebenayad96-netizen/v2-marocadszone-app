import { cn } from "../../utils/helpers"

type UserInfoBoxProps = {
  className?: string
}

const StarIcon = ({ className }: UserInfoBoxProps) => {
  return (
    <svg 
    className={cn('w-4 h-4 text-yellow-500', className)} 
    fill="currentColor" 
    viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 0L13.09 6.09L20 7.82L15.45 12.01L16.64 19.01L10 15.75L3.36 19.01L4.55 12.01L0 7.82L6.91 6.09L10 0Z"
      />
    </svg>
  )
}

export default StarIcon