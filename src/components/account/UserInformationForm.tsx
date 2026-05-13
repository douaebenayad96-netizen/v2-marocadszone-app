import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { BiLoaderAlt } from "react-icons/bi";
import Select from "react-select";
import {
  useGetUserInfo,
  useUpdateUserInfo,
} from "../../services/api/fetchAuth";
import { useFetchCity } from "../../services/api/fetchCity";
import { useAuthStore } from "../../services/store/authStore";
import { Media } from "../../services/types/media";
import { SelectType } from "../../services/types/select";
import { handleStylesWithErrors } from "../../utils/style";
import CustomToast from "../common/CustomToast";

type FormValues = {
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  city: SelectType | null;
  zipCode: string;
  Speacialite: SelectType | null;
  profession: SelectType | null;
  media: Media[];
};

const UserInformationForm = () => {
  const { t } = useTranslation();
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<FormValues>();
  const {
    data,
    refetch,
    isLoading: isLoadingData,
    isError,
  } = useGetUserInfo(token as string, !!token);
  const { mutateAsync: updateUser, isLoading } = useUpdateUserInfo();
  const { data: citiesDataList, isLoading: isLoadingCities } = useFetchCity();

  useEffect(() => {
    reset({
      firstName: data?.first_name || "",
      lastName: data?.last_name || "",
      address: data?.description || "",
      phone: data?.phone_number || "",
      city: data?.city_id
        ? { value: data?.city_id, label: data?.city_label || "City" }
        : null,
      zipCode: "",
    });
  }, [data, reset]);

  const onSubmit = (formData: FormValues) => {
    const updateData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      description: formData.address,
      phone_number: formData.phone,
      city_id: formData.city?.value,
    };

    console.log("📤 Sending update data:", updateData);
    console.log(
      "🔑 Using token:",
      token ? `${token.substring(0, 20)}...` : "No token"
    );

    updateUser({ token: token as string, user: updateData as any })
      .then((response) => {
        console.log("✅ Update successful:", response);
        CustomToast(t("informations_mises_&_jour"), "success");
        refetch();
      })
      .catch((err) => {
        console.error("❌ Update error:", err);
        console.error("Error response:", err.response?.data);
        console.error("Error status:", err.response?.status);
        CustomToast(
          t("erreur_lors_de_la_mise_a_jour_des_informations"),
          "error"
        );
      });
  };

  if (isLoadingData) {
    return (
      <div className="flex justify-center items-center py-10">
        <BiLoaderAlt className="animate-spin text-primary-blue text-4xl" />
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col md:gap-5 md:flex-row md:items-center">
        <div className="w-full md:w-1/2">
          <div className="mb-4">
            <div className="flex flex-col md:flex-row md:gap-2">
              <div className="w-full mb-4 md:mb-0">
                <label htmlFor="first-name" className="label">
                  {t("form.prenom")}
                </label>
                <input
                  type="text"
                  id="first-name"
                  className={`input ${errors.firstName ? "error" : ""}`}
                  placeholder={t("form.votre_prenom")}
                  {...register("firstName", { required: true })}
                />
              </div>
              <div className="w-full">
                <label htmlFor="last-name" className="label">
                  {t("form.nom")}
                </label>
                <input
                  type="text"
                  id="last-name"
                  className={`input ${errors.lastName ? "error" : ""}`}
                  placeholder={t("form.votre_nom")}
                  {...register("lastName", { required: true })}
                />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="label">
              {t("form.email")}
            </label>
            <input
              type="email"
              id="email"
              className="input"
              placeholder="example@gmail.com"
              value={data?.email}
              disabled
            />
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <div className="mb-4">
            <label htmlFor="phone" className="label">
              {t("phone")}
            </label>
            <input
              type="tel"
              id="phone"
              className={`input`}
              placeholder="06 12 34 56 78"
              {...register("phone", { required: false })}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="city" className="label">
              {t("ville")}
            </label>
            {/* <input
              type="text"
              id="city"
              className={`input ${errors.city ? "error" : ""}`}
              placeholder={t('votre_ville')}
              {...register("city", { required: true })}
            /> */}
            <Controller
              name="city"
              control={control}
              rules={{
                required: t("la_ville_est_obligatoire"),
                minLength: {
                  value: 2,
                  message: t("la_ville_doit_contenir_au_moins_2_caracteres"),
                },
              }}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder={t("votre_ville")}
                  options={citiesDataList?.map((city) => ({
                    value: city.id,
                    label: city.label,
                  }))}
                  isLoading={isLoadingCities}
                  {...handleStylesWithErrors(errors.city ? true : false)}
                />
              )}
            />
          </div>
        </div>
      </div>
      <div>
        <button
          type="submit"
          className={`btn-primary ${isLoading ? "loading" : ""}`}
        >
          {isLoading ? (
            <div className="flex justify-center items-center">
              <BiLoaderAlt className="animate-spin text-white text-xl" />
              <span className="ml-2">{t("chargement")}</span>
            </div>
          ) : (
            <span>{t("enregistrer")}</span>
          )}
        </button>
      </div>
    </form>
  );
};

export default UserInformationForm;
