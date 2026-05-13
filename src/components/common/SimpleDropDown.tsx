import { FaChevronDown } from "react-icons/fa"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { DataType } from "../../services/types/select"

type SimpleDropDownProps = {
  text: string
  list: DataType[]
  onChange?: (item: string) => void
  selectedOne?: string
}

const SimpleDropDown = ({ text, list, onChange, selectedOne }: SimpleDropDownProps) => {
  const [showDropDown, setShowDropDown] = useState(false)
  const [selected, setSelected] = useState(list[0])

  const handleSelect = (item: DataType) => {
    setSelected(item)
    setShowDropDown(false)
    if (onChange) onChange(item.value)
  }

  return (
    <div
      className="flex items-center gap-2 relative z-[10]"
    >
      <span
        className="text-sm text-gray-400 hidden sm:block"
      >
        {text}
      </span>
      <span
        onClick={() => setShowDropDown((prev) => !prev)}
        onBlur={() => setShowDropDown(false)}
        tabIndex={0}
        className="text-sm text-gray-900 font-bold flex items-center gap-1 cursor-pointer"
      >
        <span>
          {selectedOne || selected && selected.label}
        </span>
        <FaChevronDown />
      </span>

      {/* dropdown */}
      <AnimatePresence>
        {
          showDropDown && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-8 left-0 w-full bg-white shadow-card-shadow-border rounded-md p-4"
            >
              <div
                className="flex flex-col gap-2"
              >
                {
                  list.map((item, i) => (
                    <button
                      onClick={() => handleSelect(item)}
                      key={i}
                      className="category-filter-link"
                    >
                      {item.label}
                    </button>
                  ))
                }
              </div>
            </motion.div>
          )
        }
      </AnimatePresence>
    </div>
  )
}

export default SimpleDropDown