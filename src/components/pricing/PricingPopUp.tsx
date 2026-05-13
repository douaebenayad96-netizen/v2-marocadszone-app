import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { BiCheck } from "react-icons/bi";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { Close } from "../../assets/icons/Close";
import usePlans from "../../hooks/usePlans";
import { activatePlan, cancelPlan } from "../../services/api/fetchTarification";
import { useAuthStore } from "../../services/store/authStore";
import { cn } from "../../utils/helpers";
import BankDataModal from "../BankDataModal";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "secondary" | "danger" | "pending";
  size?: "default" | "lg";
}

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "secondary" | "outline";
}

const Button = ({
  children,
  className = "",
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-white";
  const variants = {
    default: "bg-[#E17A30] text-white hover:bg-[#C86A28]",
    secondary:
      "bg-orange-100 text-[#E17A30] hover:bg-orange-200 border border-[#E17A30]",
    danger: "border border-red-500 bg-red-50 text-red-500",
    pending: "border border-yellow-500 bg-yellow-50 text-yellow-500",
  };
  const sizes = {
    default: "h-10 py-2 px-4",
    lg: "h-11 px-8",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = "", ...props }: CardProps) => (
  <div
    className={`rounded-lg border border-gray-200 bg-white text-gray-900 shadow-sm ${className}`}
    {...props}
  >
    {children}
  </div>
);

const CardHeader = ({ children, className = "", ...props }: CardProps) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
    {children}
  </div>
);

const CardContent = ({ children, className = "", ...props }: CardProps) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

const Badge = ({
  children,
  className = "",
  variant = "default",
  ...props
}: BadgeProps) => {
  const variants = {
    default: "bg-[#E17A30] text-white hover:bg-[#C86A28]",
    secondary: "bg-orange-100 text-[#E17A30] hover:bg-orange-200",
    outline: "text-gray-900 border border-gray-300 bg-white hover:bg-gray-50",
  };

  return (
    <div
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export function PricingPopUp({
  className = "",
  onClose,
}: {
  className?: string;
  onClose: () => void;
}) {
  const { user, setUser } = useAuthStore();
  const [bankModal, setBankModal] = useState(false);
  const [currentId, setCurrentId] = useState<number>(0);
  const [isYearly, setIsYearly] = useState<boolean>(
    user?.current_active_subscription?.plan?.billing_period === "monthly"
      ? false
      : true
  );

  const planData = usePlans();

  const { mutateAsync: cancelPlanMutate } = useMutation({
    mutationFn: () => cancelPlan(),
    onSuccess: ({ data }) => {
      setUser(data);
    },
  });

  const handleCancellation = () => {
    toast.promise(cancelPlanMutate(), {
      pending: "annulation en cour ...",
      success: "anullation avec sucess",
    });
  };

  const { mutateAsync: activatePlanMutate } = useMutation({
    mutationFn: () => activatePlan(),
    onSuccess: ({ data }) => {
      setUser(data);
    },
  });

  const handleActivation = () => {
    toast.promise(activatePlanMutate(), {
      pending: "activation en cour ...",
      success: "activation avec sucess",
    });
  };
  return (
    <section className={cn("py-8 px-4 bg-white", className)}>
      <span
        className="flex justify-end cursor-pointer hover:text-gray-700"
        onClick={() => onClose()}
      >
        <Close />
      </span>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6 text-balance max-w-3xl mx-auto">
            Publiez des annonces gratuitement ou boostez votre visibilité
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-pretty">
            Choisissez la formule qui correspond le mieux à vos besoins.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span
            className={`text-sm ${
              !isYearly ? "text-gray-900 font-medium" : "text-gray-600"
            }`}
          >
            Mensuel
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isYearly ? "bg-[#E17A30]" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isYearly ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <div className="flex items-center gap-2">
            <span
              className={`text-sm ${
                isYearly ? "text-gray-900 font-medium" : "text-gray-600"
              }`}
            >
              Annuel
            </span>
            <Badge variant="secondary" className="bg-orange-100 text-[#E17A30]">
              Économisez 20%
            </Badge>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {isYearly
            ? planData["yearly"].map((tier, index) => (
                <Card
                  key={tier.name}
                  className={`flex flex-col justify-between relative ${
                    tier.popular ? "ring-2 ring-[#E17A30]" : ""
                  } ${index === 0 ? "border-[#E17A30]" : ""}`}
                >
                  <div>
                    {tier.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-[#E17A30] text-white">
                          Plus Populaire
                        </Badge>
                      </div>
                    )}

                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-semibold text-gray-600">
                          {tier.name}
                        </h3>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-gray-900">
                          {tier.price}
                        </span>
                        <span className="text-gray-600">MAD / mois</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {tier.transactionFee}
                      </p>
                    </CardHeader>
                  </div>

                  <CardContent className=" flex-1 flex flex-col justify-between">
                    <ul className="space-y-3">
                      {tier.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center gap-3"
                        >
                          <BiCheck className="h-4 w-4 text-[#E17A30] flex-shrink-0" />
                          <span className="text-sm text-gray-900">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    {user?.current_active_subscription?.plan?.id === tier.id &&
                    user?.current_active_subscription.status === "active" ? (
                      <Button variant="danger" onClick={handleCancellation}>
                        Cancel Subscription
                      </Button>
                    ) : user?.current_active_subscription?.plan?.id ===
                        tier.id &&
                      user?.current_active_subscription.status ===
                        "cancelled" ? (
                      <Button variant="pending" onClick={handleActivation}>
                        Activer l'abonnement
                      </Button>
                    ) : (
                      <div className="space-y-4">
                        <Button
                          // onClick={() => handleOpenRegister(tier.id)}
                          onClick={() => {
                            setBankModal(!bankModal);
                            setCurrentId(tier.id);
                          }}
                          className="w-full mt-6"
                          variant={tier.buttonVariant}
                          size="lg"
                        >
                          {index === 0
                            ? "Commencer Gratuitement"
                            : index === 1
                            ? "Souscrire Premium"
                            : "Devenir Pro"}
                        </Button>

                        {index === 0 && (
                          <p className="text-xs text-center text-gray-600">
                            Toujours gratuit
                          </p>
                        )}
                      </div>
                    )}
                  </CardContent>

                  {(index === 0 || index === 2) && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#E17A30] rounded-b-lg" />
                  )}
                </Card>
              ))
            : planData["monthly"].map((tier, index) => (
                <Card
                  key={tier.name}
                  className={`flex flex-col justify-between relative ${
                    tier.popular ? "ring-2 ring-[#E17A30]" : ""
                  } ${index === 0 ? "border-[#E17A30]" : ""}`}
                >
                  <div>
                    {tier.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-[#E17A30] text-white">
                          Plus Populaire
                        </Badge>
                      </div>
                    )}

                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-semibold text-gray-600">
                          {tier.name}
                        </h3>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-gray-900">
                          {tier.price}
                        </span>
                        <span className="text-gray-600">MAD / mois</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {tier.transactionFee}
                      </p>
                    </CardHeader>
                  </div>

                  <CardContent className=" flex-1 flex flex-col justify-between">
                    <ul className="space-y-3">
                      {tier.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center gap-3"
                        >
                          <BiCheck className="h-4 w-4 text-[#E17A30] flex-shrink-0" />
                          <span className="text-sm text-gray-900">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {user?.current_active_subscription?.plan?.id === tier.id &&
                    user?.current_active_subscription.status === "active" ? (
                      <Button variant="danger" onClick={handleCancellation}>
                        Cancel Subscription
                      </Button>
                    ) : user?.current_active_subscription?.plan?.id ===
                        tier.id &&
                      user?.current_active_subscription.status ===
                        "cancelled" ? (
                      <Button variant="pending" onClick={handleActivation}>
                        Activer l'abonnement
                      </Button>
                    ) : (
                      <div className="space-y-4">
                        <Button
                          onClick={() => setBankModal(!bankModal)}
                          className="w-full mt-6"
                          variant={tier.buttonVariant}
                          size="lg"
                        >
                          {index === 0
                            ? "Commencer Gratuitement"
                            : index === 1
                            ? "Souscrire Premium"
                            : "Devenir Pro"}
                        </Button>

                        {index === 0 && (
                          <p className="text-xs text-center text-gray-600">
                            Toujours gratuit
                          </p>
                        )}
                      </div>
                    )}
                  </CardContent>

                  {(index === 0 || index === 2) && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#E17A30] rounded-b-lg" />
                  )}
                </Card>
              ))}
        </div>
      </div>
      <AnimatePresence>
        {bankModal && (
          <BankDataModal
            setOpenBank={setBankModal}
            planId={currentId}
            onClose={() => onClose()}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

export default PricingPopUp;
