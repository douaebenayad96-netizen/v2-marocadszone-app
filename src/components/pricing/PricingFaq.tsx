"use client"

import React from "react"
import { BiChevronDown } from "react-icons/bi"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

interface AccordionItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}

const AccordionItem: React.FC<AccordionItemProps> = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="border-b border-gray-200 px-4">
      <button className="flex w-full items-center justify-between py-6 text-left" onClick={onToggle}>
        <span className="text-lg font-medium text-gray-900">{question}</span>
        <BiChevronDown
          className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="pb-6">
          <p className="text-gray-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  )
}

export default function PricingFaq() {
  const { t } = useTranslation()
  const [openIndex, setOpenIndex] = React.useState<number | null>(null)

  const faqData = [
    {
      question: t("faq.items.0.question", { ns: "pricing" }),
      answer: t("faq.items.0.answer", { ns: "pricing" }),
    },
    {
      question: t("faq.items.1.question", { ns: "pricing" }),
      answer: t("faq.items.1.answer", { ns: "pricing" }),
    },
    {
      question: t("faq.items.2.question", { ns: "pricing" }),
      answer: t("faq.items.2.answer", { ns: "pricing" }),
    },
    {
      question: t("faq.items.3.question", { ns: "pricing" }),
      answer: t("faq.items.3.answer", { ns: "pricing" }),
    },
  ]

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-16 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("faq.title", { ns: "pricing" })}</h2>
        <p className="text-gray-600 text-lg">{t("faq.subtitle", { ns: "pricing" })}</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {faqData.map((item, index) => (
          <AccordionItem
            key={index}
            question={item.question}
            answer={item.answer}
            isOpen={openIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>

      <div className="text-center mt-8">
        <p className="text-gray-600 mb-4">{t("faq.other_questions", { ns: "pricing" })}</p>
        <Link
          to="/contact"
          className="inline-flex items-center px-6 py-3 bg-white border border-orange-500 text-orange-600 font-medium rounded-lg hover:bg-orange-50 transition-colors duration-200"
        >
          {t("faq.contact_support", { ns: "pricing" })}
        </Link>
      </div>
    </section>
  )
}

