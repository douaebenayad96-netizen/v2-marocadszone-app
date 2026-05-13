import { Rating, Star } from '@smastrom/react-rating'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

import SampleButton from '../ui/SampleButton'
import { useAddReview } from '../../services/api/fetchReview'
import CustomToast from '../common/CustomToast'
import { useAuthStore } from '../../services/store/authStore'

type FormValues = {
  review: string
}

type ReviewFormProps = {
  onSend: () => void
  idPrestataire: number
}

const ReviewForm = ({ onSend, idPrestataire }: ReviewFormProps) => {
  const { t } = useTranslation()
  const [rating, setRating] = useState<0 | 1 | 2 | 3 | 4 | 5>(0)
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>()
  const [errorRating, setErrorRating] = useState(false)
  const { mutateAsync: saveReview, isLoading } = useAddReview()
  const token = useAuthStore(state => state.token)

  const onSubmit = (data: FormValues) => {
    if (!rating) {
      setErrorRating(true)
      return
    }

    if (!token) {
      CustomToast(t('erreur_du_serveur'), 'error')
      return
    }

    if (isLoading) return

    saveReview({
      comment: data.review,
      prestataire_id: idPrestataire,
      rate: rating.toString(),
      token
    }).then(() => {
      reset()
      setRating(0)
      CustomToast(t('profile.reservations.votre_avis_a_bien_ete_envoye'), 'success')
      onSend()
    }).catch(err => {
      console.log(err)
      CustomToast(t('erreur_du_serveur'), 'error')
    })
    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4"
    >
      <div className="flex items-center gap-2">
        <span className="text-sm font-bold text-gray-500 mt-1">
          {t('profile.reservations.choisissez_votre_note')}:
        </span>
        <Rating
          value={rating}
          onChange={(selectedValue: number) => {
            setRating(selectedValue as 1 | 2 | 3 | 4 | 5)
            setErrorRating(false)
          }}
          style={{ maxWidth: 150 }}
          itemStyles={{
            itemShapes: Star,
            activeFillColor: '#ffb700',
            inactiveFillColor: '#fbf1a9'
          }}
        />
      </div>
      {/* error */}
      <span
        className={`text-xs text-red-500 ${errorRating ? 'block' : 'hidden'}`}
      >
        {t('profile.reservations.veuillez_choisir_votre_note_avant_d_envoyer_votre_avis')}
      </span>
      <div className="mt-4">
        <textarea
          {...register('review', {
            required: t('profile.reservations.veuillez_saisir_votre_avis'),
            minLength: {
              value: 10,
              message: t('profile.reservations.veuillez_saisir_au_moins_10_caracteres')
            }
          })}
          className={`w-full h-32 input ${errors.review ? 'error' : ''}`}
          placeholder={t('profile.reservations.votre_avis') + '...'}
        ></textarea>
        {/* error */}
        {errors.review && (
          <span className="text-xs text-red-500">
            {errors.review.message}
          </span>
        )}
      </div>
      <div className="mt-4">
        <SampleButton
          type='submit'
          text={t('profile.reservations.envoyer')}
          isLoading={isLoading}
        />
      </div>
    </form>
  )
}

export default ReviewForm