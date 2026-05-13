import { FaSearch } from "react-icons/fa"
import { useState, useRef, useEffect } from "react"
import { useTranslation } from "react-i18next"

type SearchInputProps = {
  placeholder: string,
  btnText: string
  callback?: (value: string) => void
  valueD?: string
}

const SearchInput = ({ placeholder, btnText, callback, valueD }: SearchInputProps) => {
  const { i18n } = useTranslation()
  const [value, setValue] = useState(valueD || '')
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (valueD) {
      setValue(valueD)
    }
  }, [valueD])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (callback) callback(value)
  }

  return (
    <form
      onSubmit={handleSubmit}
    >
      <div className='flex'>
        <div
          className="relative flex-1 md:flex-initial"
        >
          <input
            ref={ref}
            onChange={(e) => setValue(e.currentTarget.value)}
            value={value}
            type="text"
            className={`border border-gray-300 ${i18n.language === 'ar' ? 'rounded-r-md' : 'rounded-l-md'} p-2 w-full max-w-80 md:w-80 outline-none focus:border-primary-blue transition-all`}
            placeholder={placeholder}
          />
        </div>
        <div className="flex-1 max-w-[150px]">
          <button
            className={`bg-primary-orange border border-primary-orange text-white px-4 py-2 font-bold w-full flex items-center min-h-[42px] justify-center gap-2 transition-all hover:bg-opacity-75 ${i18n.language === 'ar' ? 'rounded-l-md' : 'rounded-r-md'}`}
          >
            <FaSearch />
            <span className="hidden md:inline">{btnText}</span>
          </button>
        </div>
      </div>
    </form>
  )
}

export default SearchInput