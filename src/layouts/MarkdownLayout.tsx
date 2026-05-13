import { cn } from "../utils/helpers"


type MarkdownLayoutProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  children: React.ReactNode
  className?: string
}

const MarkdownLayout = (props: MarkdownLayoutProps) => {
  return (
    <div
      {...props}
      className={cn(
        'prose-sm prose prose-headings:text-primary-purple-800 prose-strong:text-gray-700',
        props.className
      )}
    >
      {props.children}
    </div>
  )
}

export default MarkdownLayout