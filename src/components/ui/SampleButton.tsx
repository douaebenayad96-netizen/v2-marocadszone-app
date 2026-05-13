import { BiLoaderAlt } from "react-icons/bi"

type SampleButtonProps = {
  text: string
  icon?: React.ReactNode
  callback?: () => void
  type?: 'button' | 'submit' | 'reset'
  isLoading?: boolean
  iconPosition?: 'left' | 'right'
}

const SampleButton = ({ text, icon, callback, type = "button", isLoading, iconPosition = 'left' }: SampleButtonProps) => {
  return (
    <button
      onClick={callback}
      className={`btn-secondary-white w-full ${isLoading ? 'loading' : ''}`}
      type={type}
      disabled={isLoading}
    >
      {
        iconPosition === 'left' && icon
      }
      <span
      >{text}</span>
      {
        iconPosition === 'right' && icon
      }
      {isLoading && (
        <BiLoaderAlt className="animate-spin text-primary-blue-all-900 text-xl" />
      )}
    </button>
  )
}

export default SampleButton