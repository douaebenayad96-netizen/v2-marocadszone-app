import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { BiLoaderAlt } from "react-icons/bi"
import { useGetUserInfo, useUpdateUserDes } from "../../services/api/fetchAuth"
import { useAuthStore } from "../../services/store/authStore"
import { UpdateUserInfo } from "../../services/types/auth"
import { Media } from "../../services/types/media"
import CustomToast from "../common/CustomToast"

type FormValues = {
  advantages: string;
  inclu: string;
  descriptions: string;
  media: Media[]

}

const DescriptionProfil = () => {
  const { t } = useTranslation()
  const token = useAuthStore(state => state.token)
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>()
  const { data, refetch, isLoading: isLoadingData, isError } = useGetUserInfo(token as string, false)
  console.log("bbbbbbbbbbbbbb", data)
  const { mutateAsync: updateUser, isLoading } = useUpdateUserDes()
  const inclusJson = data?.inclus; // Assuming inclus is a JSON string
  let inclusArray: string[] = []; // Declare inclusArray here and initialize it

  if (inclusJson) {
    inclusArray = JSON.parse(inclusJson); // Assign parsed array to inclusArray
    console.log(inclusArray); // Output: ["gfdsgf", "dfsgds", "gdsgfd"]
  } else {
    console.log("inclusJson is null or undefined");
  }


  const [inputValues, setInputValues] = useState<string[]>([""]);

  const handleChange = (index: number, value: string) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };

  const handleAddInput = () => {
    setInputValues([...inputValues, ""]);
  };

  const handleSubmit1 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const sentences = inputValues.filter((value) => value.trim() !== "");
    console.log(sentences); // Use sentences for further processing
  };

  useEffect(() => {
    if (token) refetch()
  }, [refetch, token])

  useEffect(() => {
    reset({
      advantages: data?.advantage,
      inclu: data?.inclus ? JSON.parse(data.inclus) : [],
      descriptions: data?.description,
    })
  }, [data, reset])

  const onSubmit = (data: FormValues) => {
    const updateData: UpdateUserInfo = {
      media: data.media,
      advantage: data.advantages,
      inclus_array: inputValues,
      description: data.descriptions,
    }

    updateUser({ token: token as string, user: updateData })
      .then(() => {
        CustomToast(t("informations_mises_&_jour"), "success")
        refetch()
      })
      .catch((err) => {
        CustomToast(t("erreur_lors_de_la_mise_a_jour_des_informations"), "error")
        console.log(err)
      })
  }

  if (isLoadingData || isError) {/*
    return (
      <div className="flex justify-center items-center py-10">
        <BiLoaderAlt className="animate-spin text-primary-blue text-4xl" />
      </div>
    )
    */}

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
    >

      <div className="mb-4">
        <label
          htmlFor="Avantages"
          className="label"
        >
          Avantages
        </label>
        <input
          type="text"
          id="Avantages"
          className={`input ${errors.advantages ? "error" : ""}`}
          placeholder='Avantages'
          {...register("advantages", { required: true })}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="Inclus"
          className="label"
        >
          Inclus </label>
        <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
          {inclusArray.map((item, index) => (
            <li className="mb-1 flex items-center" key={index}> <svg className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>{item}</li>
          ))}
        </ul>
        <form onSubmit={handleSubmit1}>
          {inputValues.map((value, index) => (
            <div key={index}>
              <input
                className={`mb-2 input ${errors.inclu ? 'error' : ''}`}
                type="text"
                value={value} // Set the value dynamically from inputValues array
                onChange={(e) => handleChange(index, e.target.value)}
                placeholder="Enter a sentence"
              />
            </div>
          ))}
          <button className="text-white bg-gradient-to-r from-orange-400 via-red-500 to-orange-600  focus:ring-2 focus:outline-none focus:ring-red-300 dark:focus:ring-orange-800 shadow-lg  dark:shadow-orange-800/80 font-medium rounded-lg text-sm px-5 py-0.5 text-center me-2 mb-2" type="button" onClick={handleAddInput}>
            Ajouter inclus
          </button>
          {/*<button type="submit">Submit</button>*/}
        </form>
        {/*<input
                  type="text"
                  id="first-name"
                  className={`input ${errors.inclu ? "error" : ""}`}
                  placeholder={t('form.votre_prenom')}
                  {...register("inclu", { required: true })}
    />*/}
      </div>
      <div className="mb-4">
        <label
          htmlFor="first-name"
          className="label"
        >
          Description
        </label>
        <textarea
          rows={5}
          id="first-name"
          className={`input ${errors.descriptions ? "error" : ""}`}
          placeholder='Description'
          {...register("descriptions", { required: true })}
        ></textarea>
      </div>
      <div className="w-full md:w-1/2">
      </div>
      <div>

        <button
          type="submit"
          className={`btn-primary ${isLoading ? "loading" : ""}`}
        >
          {
            isLoading ? (
              <div className="flex justify-center items-center">
                <BiLoaderAlt className="animate-spin text-white text-xl" />
                <span className="ml-2">
                  {t('chargement')}
                </span>
              </div>
            ) : (
              <span>
                {t('enregistrer')}
              </span>
            )
          }
        </button>

      </div>
    </form>
  )
}

export default DescriptionProfil