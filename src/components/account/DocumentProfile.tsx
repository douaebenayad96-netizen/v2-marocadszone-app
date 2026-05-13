import { useEffect, useState } from "react"
import { FileUploader } from "react-drag-drop-files"
import { FiUpload } from "react-icons/fi"
import { useGetUserInfo, useUpdateUserDoc } from "../../services/api/fetchAuth"
import { useForm } from "react-hook-form"
import { useAuthStore } from "../../services/store/authStore"
import { Media } from "../../services/types/media"
type FormValues = {
  ircs: Media;
  kibss: Media;
}
function DocumentProfile() {
  const token = useAuthStore(state => state.token)
  const { handleSubmit, reset } = useForm<FormValues>()
  const { data, refetch } = useGetUserInfo(token as string, false)
  console.log("bbbbbbbbbbbbbb", data)
  const { mutateAsync: updateUser } = useUpdateUserDoc()
  const [file, setFile] = useState<File | null>(null)
  const [file1, setFile1] = useState<File | null>(null)
  const handleChange = (files: File) => {
    setFile(files)
  }
  const handleChange1 = (files1: File) => {
    setFile1(files1)
  }


  useEffect(() => {
    if (token) refetch()
  }, [refetch, token])

  useEffect(() => {
    reset({
      ircs: data?.irc,
      kibss: data?.kibs,
    })
  }, [data, reset])
  const onSubmit = () => {
    const updateData = new FormData()
    updateData.append('irc', file as Blob)
    updateData.append('kibs', file1 as Blob)

    console.log('update here', updateData)
    updateUser({ token: token as string, user: updateData })
      .then(() => {
        "informations_mises_&_jour"
        refetch()
      })
      .catch((err) => {
        "erreur_lors_de_la_mise_a_jour_des_informations"
        console.log(err)
      })
  }



  return (
    <div className="flex flex-col md:gap-5 md:flex-row md:items-center">
      <form onSubmit={handleSubmit(onSubmit)} >
        <h4 className="title-h4">
          Document
        </h4>
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="label"
          >
            Upload our document
          </label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              {data && (
                <div className="flex flex-col items-center">
                  {data?.media.filter(item => item.collection_name === 'IRC').map((item) => {
                    const imageMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
                    return (
                      <div key={item.id}>
                        {imageMimeTypes.includes(item.mime_type) ? (
                          <img src={item.original_url} alt="Uploaded Media" style={{ maxWidth: '100%', maxHeight: '200px', border: '2px solid black' }} />
                        ) : item.mime_type === 'application/pdf' ? (
                          <>
                            <iframe src={item.original_url} ></iframe>
                          </>

                        ) : null}
                      </div>
                    );
                  })}

                </div>
              )}
            </div>
            <div>
              {data && (
                <div className="flex flex-col items-center">
                  {data?.media.filter(item => item.collection_name === 'KBIS').map((item) => {
                    const imageMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
                    return (
                      <div key={item.id}>
                        {imageMimeTypes.includes(item.mime_type) ? (
                          <img src={item.original_url} alt="Uploaded Media" style={{
                            maxWidth: '100%',
                            maxHeight: '200px',
                            border: '2px solid black'
                          }} />
                        ) : item.mime_type === 'application/pdf' ? (
                          <iframe src={item.original_url} ></iframe>
                        ) : null}
                      </div>
                    );
                  })}

                </div>
              )}
            </div>
          </div>
          <div
            className="flex flex-col md:flex-row md:gap-2 mt-3"
          >
            <br />
            <div className="mb-4">
              <FileUploader
                handleChange={handleChange}
                name="file"
                types={['pdf', 'doc', 'docx', 'png', 'jpg']}
                multiple={false}
                maxFileSize={10000000}
                minFileSize={0}
                clickable
              >
                <div
                  className="border-2 border-dashed w-300  border-gray-300 rounded-lg p-8 hover:bg-gray-200 flex justify-center items-center gap-2 cursor-pointer"
                >
                  {
                    file ? (
                      <span className="text-primary-green-400">
                        {file?.name}
                      </span>
                    )
                      : (
                        <div
                          className="flex items-center gap-2"
                        >
                          <span className="text-gray-500 font-medium"
                          >
                            Drag & drop ou cliquez pour ajouter votre IRC
                          </span>
                          <span className="text-primary-green-400">
                            <FiUpload />
                          </span>
                        </div>
                      )
                  }
                </div>
              </FileUploader>
            </div>


            <div className="mb-4">
              <FileUploader
                handleChange={handleChange1}
                name="file1"
                types={['pdf', 'doc', 'docx', 'png', 'jpg']}
                multiple={false}
                maxFileSize={10000000}
                minFileSize={0}
                clickable
              >
                <div
                  className="border-2 border-dashed w-300  border-gray-300 rounded-lg p-8 hover:bg-gray-200 flex justify-center items-center gap-2 cursor-pointer"
                >
                  {
                    file1 ? (
                      <span className="text-primary-green-400">
                        {file1?.name}
                      </span>
                    )
                      : (
                        <div
                          className="flex items-center gap-2"
                        >
                          <span className="text-gray-500 font-medium"
                          >
                            Drag & drop ou cliquez pour ajouter votre KIBS
                          </span>
                          <span className="text-primary-green-400">
                            <FiUpload />
                          </span>
                        </div>
                      )
                  }
                </div>
              </FileUploader>
            </div>
          </div>
        </div>
        <div>

          <button
            type="submit"
            className={`btn-primary`}
          >

            <span>
              enregistrer
            </span>
          </button>


        </div>
      </form>




    </div>
  )
}

export default DocumentProfile