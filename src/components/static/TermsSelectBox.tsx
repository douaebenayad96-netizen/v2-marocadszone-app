export type Tab =
  | "Mettre à Jour les Informations Personnelles"
  | "Mise à Jour des Documents IRC KIBS"
  | "Actualiser la Localisation"
  | "Mise à Jour des Descriptions des Avantages Inclus"
  | "Mise à Jour de la Galerie"
  | "Modifier le Mot de Passe"

type TermsSelectBoxProps = {
  activeTab: Tab
  setActiveTab: (tab: Tab) => void
}

const TermsSelectBox = ({ activeTab, setActiveTab }: TermsSelectBoxProps) => {
  return (
    <div>
      <ul
        id="terms-select-box"
        className="md:sticky top-[90px] w-full md:w-[300px] shadow-card-sm bg-white rounded-md p-4 flex flex-col gap-1 font-medium"
      >
        <li
          onClick={() => setActiveTab("Mettre à Jour les Informations Personnelles")}
          className={` top-[90px] w-full md:w-[270px] shadow-card-sm bg-white rounded-md p-2 flex flex-col gap-1 font-medium mb-2 ${activeTab === "Mettre à Jour les Informations Personnelles" ? "text-orange-600" : ""
            }`}
        >
          <button>Mettre à Jour les Infos Personnelles</button>
        </li>
        <li
          onClick={() => setActiveTab("Mise à Jour des Documents IRC KIBS")}
          className={`  top-[90px] w-full md:w-[270px] shadow-card-sm bg-white rounded-md p-4 flex flex-col gap-1 font-medium mb-2 ${activeTab === "Mise à Jour des Documents IRC KIBS" ? "text-orange-600" : ""
            }`}
        >
          <button>Mise à Jour des Documents IRC KIBS</button>
        </li>
        <li
          onClick={() => setActiveTab("Actualiser la Localisation")}
          className={` top-[90px] w-full md:w-[270px] shadow-card-sm bg-white rounded-md p-4 flex flex-col gap-1 font-medium mb-2 ${activeTab === "Actualiser la Localisation" ? "text-orange-600" : ""
            }`}
        >
          <button>Actualiser la Localisation</button>
        </li>
        <li
          onClick={() => setActiveTab("Mise à Jour des Descriptions des Avantages Inclus")}
          className={` top-[90px] w-full md:w-[270px] shadow-card-sm bg-white rounded-md p-4 flex flex-col gap-1 font-medium mb-2 ${activeTab === "Mise à Jour des Descriptions des Avantages Inclus" ? "text-orange-600" : ""
            }`}
        >
          <button> Mise à Jour des Descriptions des Avantages Inclus</button>
        </li>
        <li
          onClick={() => setActiveTab("Mise à Jour de la Galerie")}
          className={` top-[90px] w-full md:w-[270px] shadow-card-sm bg-white rounded-md p-4 flex flex-col gap-1 font-medium mb-2 ${activeTab === "Mise à Jour de la Galerie" ? "text-orange-600" : ""
            }`}
        >
          <button> Mise à Jour de la Galerie</button>
        </li>
        <li
          onClick={() => setActiveTab("Modifier le Mot de Passe")}
          className={` top-[90px] w-full md:w-[270px] shadow-card-sm bg-white rounded-md p-4 flex flex-col gap-1 font-medium mb-2 ${activeTab === "Modifier le Mot de Passe" ? "text-orange-600" : ""
            }`}
        >
          <button> Modifier le Mot de Passe</button>
        </li>
      </ul>


    </div>
  )
}

export default TermsSelectBox