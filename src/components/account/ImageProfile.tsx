import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../../services/store/authStore';
import { useForm } from 'react-hook-form';
import { useGetUserInfo, useUpdateUserCover, useUpdateUserPro } from '../../services/api/fetchAuth';
import CustomToast from '../common/CustomToast';
import { useTranslation } from 'react-i18next';
import { BiSave } from 'react-icons/bi';
import { useFirebaseUpload } from '../../hooks/useFirebaseUpload';
import { STORAGE_FOLDERS } from '../../services/firebase/storageService';
type FormValues = {
  profil: string;
  cover: string;
}
const ImageProfile: React.FC = () => {
  const { t } = useTranslation()
  const token = useAuthStore(state => state.token)
  const { handleSubmit, reset } = useForm<FormValues>()
  const { data, refetch } = useGetUserInfo(token as string, false)
  console.log("bbbbbbbbbbbbbb", data)
  const { mutateAsync: updateUser } = useUpdateUserPro()
  const { mutateAsync: updateUser1 } = useUpdateUserCover()
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const { uploadSingleFile, isUploading } = useFirebaseUpload(STORAGE_FOLDERS.PROFILE_IMAGES);

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    if (image) {
      setCoverImage(image);
    }
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    if (image) {
      setProfileImage(image);
    }
  };


  useEffect(() => {
    if (token) refetch()
  }, [refetch, token])

  useEffect(() => {
    reset({
    })
  }, [data, reset])
  const onSubmit = async () => {
    try {
      if (profileImage) {
        const result = await uploadSingleFile(profileImage);
        const updateData = new FormData();
        updateData.append('image_url', result.url);
        await updateUser({ token: token as string, user: updateData });
        CustomToast(t("informations_mises_&_jour"), "success");
        refetch();
      }

      if (coverImage) {
        const result = await uploadSingleFile(coverImage);
        const updateData1 = new FormData();
        updateData1.append('image_url', result.url);
        await updateUser1({ token: token as string, user: updateData1 });
        refetch();
      }
    } catch (err) {
      CustomToast(t("erreur_lors_de_la_mise_a_jour_des_informations"), "error");
      console.log(err);
    }
  }





  return (
    <div className="relative">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full bg-gray-300 h-64 relative">
          <img
            src={coverImage
              ? URL.createObjectURL(coverImage)
              : (data && data.media && data.media[0] && data.media[0].original_url)
                ? data.media.find(item => item.collection_name === 'cover')?.original_url || 'https://www.societyforphilosophyanddisability.org/wp-content/themes/u-design/assets/images/placeholders/post-placeholder.jpg'
                : 'https://www.societyforphilosophyanddisability.org/wp-content/themes/u-design/assets/images/placeholders/post-placeholder.jpg'}

            alt=""
            className="w-full h-full object-cover"
          />

          <input type="file" accept="image/*" onChange={handleCoverImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
          <div className="absolute bottom-0 left-2 -mb-8 mr-8">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 relative bg-gray-300">
              <img
                src={profileImage
                  ? URL.createObjectURL(profileImage)
                  : (data && data.media && data.media[0] && data.media[0].original_url)
                    ? data.media.find(item => item.collection_name === 'profile')?.original_url || 'https://img.myloview.com/stickers/default-avatar-profile-icon-vector-social-media-user-photo-700-205577532.jpg'
                    : 'https://img.myloview.com/stickers/default-avatar-profile-icon-vector-social-media-user-photo-700-205577532.jpg'}
                alt=""
                className="w-full h-full object-cover"
              />
              <input type="file" accept="image/*" onChange={handleProfileImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
            </div>
          </div>
        </div>

        <div className="flex justify-left py-1" style={{ marginLeft: '9%' }}>
          <button
            type="submit"
            disabled={isUploading}
            className="flex items-center bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-2 px-2 rounded-md shadow-md focus:outline-none"
          >
            <BiSave className="" />
            {isUploading && <span className="ml-1 text-xs">...</span>}
          </button>
        </div>

      </form>
    </div>
  );
};

export default ImageProfile;
