import { useRef, useState, useEffect } from "react"

/**
 * Custom hook that tracks the scroll position of a scrollable element.
 * It returns a boolean value indicating whether the scroll position is at the top,
 * and a ref to the scrollable element.
 *
 * @returns An object containing the following properties:
 *   - isScrollOnTop: A boolean value indicating whether the scroll position is at the top.
 *   - scrollableNodeRef: A ref to the scrollable element.
 */
const useScrollPosition = () => {
  const [isScrollOnTop, setIsScrollOnTop] = useState(true)
  const scrollableNodeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollableNode = scrollableNodeRef.current
    if (scrollableNode) {
      scrollableNode.addEventListener('scroll', () => {
        if (scrollableNode.scrollTop === 0) {
          setIsScrollOnTop(true)
        } else {
          setIsScrollOnTop(false)
        }
      })
    }

    return () => {
      if (scrollableNode) {
        scrollableNode.removeEventListener('scroll', () => {
          if (scrollableNode.scrollTop === 0) {
            setIsScrollOnTop(true)
          } else {
            setIsScrollOnTop(false)
          }
        })
      }
    }
  }, [scrollableNodeRef])

  return {
    isScrollOnTop,
    scrollableNodeRef
  }
}

export default useScrollPosition