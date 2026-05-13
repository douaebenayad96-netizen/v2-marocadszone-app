import React, { useState } from "react"
import { CardsType } from "../../services/types/checkout"
import { detectCardType, formatNumber } from "../../utils/helpers"


const CreditCardForm = () => {
  const [cardType, setCardType] = useState<CardsType | null>(null)
  const [cardNumber, setCardNumber] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value as string
    // not allow to enter letters
    if (inputValue.match(/[a-zA-Z]/)) {
      e.preventDefault()
      return
    }
    const formattedValue = formatNumber(inputValue.replace(/\s/g, ''))
    setCardNumber(formattedValue)

    // Detect and update card type
    const detectedCardType = detectCardType(formattedValue)
    setCardType(detectedCardType)
  }

  console.log(cardType)
  return (
    <div className="px-4 md:px-8 py-4 border-y border-gray-200">
      <div className="mb-4 max-w-[500px]">
        <label htmlFor="card-number" className="text-base font-bold text-gray-800">
          Card Number
        </label>
        <input
          placeholder="1234 1234 1234 1234"
          className="w-full h-10 p-[2px] outline-none border border-gray-400 rounded-sm px-4 mt-1"
          type="tel"
          maxLength={19}
          value={cardNumber}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex gap-2">
        <div className="mb-4 max-w-[250px]">
          <label htmlFor="card-number" className="text-base font-bold text-gray-800">
            Expiration Date
          </label>
          <input
            placeholder="MM/YY"
            className="w-full h-10 p-[2px] outline-none border border-gray-400 rounded-sm px-4 mt-1"
            type="text"
          />
        </div>
        <div className="mb-4 max-w-[250px]">
          <label htmlFor="card-number" className="text-base font-bold text-gray-800">
            CVV
          </label>
          <input
            placeholder="123"
            className="w-full h-10 p-[2px] outline-none border border-gray-400 rounded-sm px-4 mt-1"
            type="tel"
          />
        </div>
      </div>
      <div className="mb-4 max-w-[500px]">
        <label htmlFor="card-number" className="text-base font-bold text-gray-800">
          Card Holder Name
        </label>
        <input
          placeholder="nom et prénom"
          className="w-full h-10 p-[2px] outline-none border border-gray-400 rounded-sm px-4 mt-1"
          type="text" />
      </div>
    </div>
  )
}

export default CreditCardForm