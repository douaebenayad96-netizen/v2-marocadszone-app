import Button from "../ui/Button"

type SectionHeaderProps = {
  title: string
  subtitle: string
  buttonTitle?: string
  to?: string
}

const SectionHeader = ({ title, subtitle, buttonTitle, to }: SectionHeaderProps) => {
  if (!buttonTitle) {
    return (
      <div
        className="flex items-center justify-between select-none"
      >
        <div>
          <h2
            className="text-xl sm:text-3xl md:text-4xl pb-3 text-primary-blue font-bold select-none"
          >
            {title}
          </h2>
          <p
            className="text-primary-blue text-base select-none"
          >
            {subtitle}
          </p>
        </div>
      </div>
    )
  }
  return (
    <div
      className="flex items-center justify-between select-none"
    >
      <div className="max-w-[250px] sm:max-w-none">
        <h2
          className="text-lg sm:text-3xl md:text-4xl py-3 text-primary-blue font-bold capitalize select-none"
        >{title}</h2>
        <p
          className="text-primary-blue text-sm md:text-base select-none"
        >{subtitle}</p>
      </div>
      <div
        className="self-end"
      >
        <Button title={buttonTitle} to={to} />
      </div>
    </div>
  )
}

export default SectionHeader