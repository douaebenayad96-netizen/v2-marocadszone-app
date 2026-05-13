import { useLoginModelStore } from "../../services/store/LoginModelStore"

// Self-contained Button component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({ variant = "primary", size = "md", className = "", children, ...props }) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

  const variants = {
    primary: "bg-[#E17A30] text-white hover:bg-[#C86A28] shadow-sm",
    secondary: "bg-orange-100 text-[#E17A30] hover:bg-orange-200 border border-[#E17A30]",
    outline: "border border-[#E17A30] text-[#E17A30] hover:bg-[#E17A30] hover:text-white",
  }

  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 py-2",
    lg: "h-12 px-8 text-lg",
  }

  return (
    <button className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  )
}

// Self-contained Card components
interface CardProps {
  className?: string
  children: React.ReactNode
}

const Card: React.FC<CardProps> = ({ className = "", children }) => (
  <div className={`rounded-xl border border-gray-200 bg-white text-gray-950 shadow-lg ${className}`}>{children}</div>
)

const CardContent: React.FC<CardProps> = ({ className = "", children }) => (
  <div className={`p-8 ${className}`}>{children}</div>
)

const PricingCTACard: React.FC = () => {
  const { openRegisterModel } = useLoginModelStore()

  const handleOpenRegister = () => {
    openRegisterModel()
  }
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <Card className="relative overflow-hidden">
          {/* Background gradient accent */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-white opacity-60" />

          {/* Content */}
          <CardContent className="relative text-center">
            <div className="max-w-2xl mx-auto">
              {/* Main heading */}
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-balance">
                Commencez à vendre dès aujourd'hui
              </h2>

              {/* Description */}
              <p className="text-lg text-gray-600 mb-8 text-pretty leading-relaxed">
                Créez votre compte gratuit et publiez votre première annonce en moins de 2 minutes. Profitez de la
                puissance de MarocAdsZone pour vendre plus, plus vite.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  onClick={handleOpenRegister}
                  variant="primary" size="lg" className="w-full sm:w-auto min-w-[200px]">
                  Créer un compte
                </Button>
                <Button
                  onClick={handleOpenRegister}
                  variant="secondary" size="lg" className="w-full sm:w-auto min-w-[200px]">
                  Déposer une annonce
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#E17A30] rounded-full" />
                    <span>Inscription gratuite</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#E17A30] rounded-full" />
                    <span>Publication en 2 minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#E17A30] rounded-full" />
                    <span>Support 24h/24</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>

          {/* Bottom accent bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#E17A30]" />
        </Card>
      </div>
    </section>
  )
}

export default PricingCTACard
