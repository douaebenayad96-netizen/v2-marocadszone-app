import { BiMailSend, BiPhone } from "react-icons/bi"
import { BsTicket } from "react-icons/bs"
import { LuBuilding2 } from "react-icons/lu"

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
    primary: "bg-[#E17A30] text-white hover:bg-[#C86A28]",
    secondary: "bg-orange-100 text-[#E17A30] hover:bg-orange-200",
    outline: "border border-[#E17A30] text-[#E17A30] hover:bg-[#E17A30] hover:text-white",
  }

  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 py-2",
    lg: "h-11 px-8",
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
  <div className={`rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm ${className}`}>{children}</div>
)

const CardHeader: React.FC<CardProps> = ({ className = "", children }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
)

const CardContent: React.FC<CardProps> = ({ className = "", children }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
)

interface ContactMethod {
  icon: React.ReactNode
  title: string
  description: string
  action?: {
    label: string
    href?: string
    onClick?: () => void
  }
}

const PricingCustomerSupport: React.FC = () => {
  const contactMethods: ContactMethod[] = [
    {
      icon: <BiPhone className="h-6 w-6" />,
      title: "Téléphone",
      description: "+212 6 12 34 56 78",
      action: {
        label: "Appeler",
        href: "tel:+212612345678",
      },
    },
    {
      icon: <BiMailSend className="h-6 w-6" />,
      title: "Email",
      description: "support@marocadszone.com",
      action: {
        label: "Envoyer un email",
        href: "mailto:support@marocadszone.com",
      },
    },
    {
      icon: <BsTicket className="h-6 w-6" />,
      title: "Ticket support",
      description: "Créez un ticket",
      action: {
        label: "Créer un ticket",
        href: "/contact",
      },
    },
    {
      icon: <LuBuilding2 className="h-6 w-6" />,
      title: "Bureau",
      description: "Ouvert 7j/7 – 24h/24",
      action: {
        label: "Nous localiser",
        href: "#",
      },
    },
  ]

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Service Client 7j/7 – 24h/24</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Notre équipe vous accompagne à tout moment. Que vous soyez vendeur particulier ou pro, nous sommes là pour
            répondre à toutes vos questions.
          </p>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactMethods.map((method, index) => (
            <Card key={index} className="text-center hover:shadow-md transition-shadow duration-200">
              <CardHeader>
                <div className="w-12 h-12 bg-[#E17A30] rounded-lg flex items-center justify-center text-white mx-auto mb-4">
                  {method.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{method.title}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{method.description}</p>
                {method.action && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={method.action.onClick}
                    {...(method.action.href && {
                      onClick: () => window.open(method.action!.href, "_blank"),
                    })}
                    className="w-full"
                  >
                    {method.action.label}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PricingCustomerSupport
