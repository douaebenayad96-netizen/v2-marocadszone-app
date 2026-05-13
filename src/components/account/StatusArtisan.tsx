import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BiSave } from 'react-icons/bi';
import { useAuthStore } from '../../services/store/authStore';
import { useForm } from 'react-hook-form';
import { useGetUserInfo, useUpdateUserAv } from '../../services/api/fetchAuth';
import CustomToast from '../common/CustomToast';
import { UpdateUserInfo } from '../../services/types/auth';
import { Media } from '../../services/types/media';
type FormValues = {
  availability: boolean
  online_hours: number
  media: Media[]

}
const StatusArtisan: React.FC = () => {
  const { t } = useTranslation()
  const token = useAuthStore(state => state.token)
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>()
  const { data, refetch, isLoading: isLoadingData, isError } = useGetUserInfo(token as string, false)
  const { mutateAsync: updateUser } = useUpdateUserAv()

  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleToggleChange = () => {
    setIsChecked(prevState => !prevState);
  };
  useEffect(() => {
    if (token) refetch()
  }, [refetch, token])

  useEffect(() => {
    reset({
      availability: data?.availability,
      online_hours: data?.online_hours

    })
  }, [data, reset])

  const onSubmit = (data: FormValues) => {
    const updateData: UpdateUserInfo = {
      media: data.media,
      online_hours: data.online_hours,
      availability: isChecked ? true : false

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
        */
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="inline-flex items-center mb-1 cursor-pointer">
          <input type="checkbox" value="" className="sr-only peer" checked={isChecked} onChange={handleToggleChange} />
          <div className={`relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-white dark:peer-focus:ring-gray-800 rounded-full peer ${isChecked ? 'bg-green-700' : 'bg-red-500'} peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600`} />
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{isChecked ? 'Active' : 'Inactive'}</span>
          {isChecked && <input className={`ml-2 px-1 py-0.5 border rounded-sm border-gray-300 focus:outline-none focus:ring focus:ring-gray-300 ${errors.online_hours ? "error" : ""}`}
            placeholder='online_hours'
            {...register("online_hours", { required: true })} type="number" />}
        </label>
        <button type="submit" className="ml-5 px-1 py-1 bg-green-600 hover:bg-gray-400 text-white font-bold rounded">
          <BiSave className="mr-2" />
        </button>
      </form>
    </>
  );
};



export default StatusArtisan;
