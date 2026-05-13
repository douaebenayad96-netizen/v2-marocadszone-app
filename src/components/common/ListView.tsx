type ListViewProps<T> = {
  className?: string
  isLoading: boolean
  data: T[] | undefined
  renderItem: (item: T, index: number) => React.ReactNode
  skeletonItem: React.ReactNode
  totalSkeletonItems: number
  doNotShowDataOnLoading?: boolean
  appendFirst?: React.ReactNode
  appendLast?: React.ReactNode
}

const ListView = <T,>({
  className,
  isLoading,
  data,
  renderItem,
  skeletonItem,
  totalSkeletonItems,
  appendFirst,
  appendLast,
  doNotShowDataOnLoading
}: ListViewProps<T>) => {
  return (
    <div
      className={className}
    >
      {appendFirst}

      {
        doNotShowDataOnLoading === true ? null : (
          Array.isArray(data) ? data.map((item, index) => renderItem(item, index)) : null
        )
      }

      {appendLast}

      {
        isLoading && (
          [...Array(totalSkeletonItems)].map((_, index) => (
            <div
              key={index}
            >
              {skeletonItem}
            </div>
          ))
        )
      }

    </div>
  )
}

export default ListView