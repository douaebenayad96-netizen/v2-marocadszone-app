import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

const faqData = [
  {
    question: "What is Artisan ?",
    answer:
      "Artisan is a platform that allows you to create a website for your business in a few minutes. You can create a website for your business without any coding knowledge.",
  },
  {
    question: "How to create a website with Artisan ?",
    answer:
      "You can create a website with Artisan in a few minutes. You can create a website by following the steps below. 1. Create an account on Artisan. 2. Choose a template for your website. 3. Edit the template according to your needs. 4. Publish your website.",
  },
  {
    question: "How to edit a website with Artisan ?",
    answer:
      "You can edit your website with Artisan in a few minutes. You can edit your website by following the steps below. 1. Go to the Artisan dashboard. 2. Choose a website that you want to edit. 3. Edit the website according to your needs. 4. Publish your website.",
  },
  {
    question: "How to publish a website with Artisan ?",
    answer:
      "You can publish your website with Artisan in a few minutes. You can publish your website by following the steps below. 1. Go to the Artisan dashboard. 2. Choose a website that you want to publish. 3. Publish your website.",
  },
  {
    question: "How to delete a website with Artisan ?",
    answer:
      "You can delete your website with Artisan in a few minutes. You can delete your website by following the steps below. 1. Go to the Artisan dashboard. 2. Choose a website that you want to delete. 3. Delete your website.",
  },
  {
    question: "How to contact Artisan ?",
    answer:
      "You can contact Artisan in a few minutes. You can contact Artisan by following the steps below. 1. Go to the Artisan dashboard. 2. Click the contact button. 3. Fill the contact form. 4. Send the contact form.",
  }
]

const FaqList = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const handleToggle = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index))
  }
  return (
    <div>
      {faqData.map((item, index) => (
        <div
          key={index}
          className="flex rounded-md transition-all items-start flex-col justify-between cursor-pointer p-4 w-full"
        >
          <div
            onClick={() => handleToggle(index)}
            className="flex items-center w-full transition-all"
          >
            <div
              className={`flex items-center justify-center transition-all w-10 h-10 rounded-full mr-4 text-xl ${openIndex === index
                ? "bg-primary-blue-all-900 text-white"
                : "bg-gray-100 text-primary-blue-all-900"
                }`}
            >
              <div className="relative">
                <span
                  className={`w-5 h-[3px] rounded-full transition-all absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 ${openIndex === index
                    ? "bg-gray-100"
                    : "bg-primary-blue-all-900"
                    } `}
                ></span>
                <span
                  className={`w-5 h-[3px] rounded-full transition-all absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 ${openIndex === index
                    ? "rotate-90 bg-gray-100"
                    : "rotate-0 bg-primary-blue-all-900"
                    } `}
                ></span>
              </div>
            </div>
            <div>
              <p className="text-primary-blue-all-900 text-base font-semibold w-full">
                {item.question}
              </p>
            </div>
          </div>
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <p className="text-gray-500 text-base mt-2 pl-[56px]">
                  {item.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

export default FaqList