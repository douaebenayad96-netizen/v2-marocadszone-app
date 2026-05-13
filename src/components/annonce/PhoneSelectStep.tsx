import { motion } from 'framer-motion'
import { FileUploader } from 'react-drag-drop-files'
import { FiUpload } from 'react-icons/fi'
import StepSectionHeader from '../common/StepSectionHeader'

type PhotosSelectStepProps = {
  setFile: React.Dispatch<React.SetStateAction<File | null>>
  file: File | null
  setFile2: React.Dispatch<React.SetStateAction<File | null>>
  file2: File | null

}

const PhoneSelectStep = ({ file, setFile, file2, setFile2 }: PhotosSelectStepProps) => {


  const handleChange = (files: File) => {
    setFile(files)
  }
  const handleChange2 = (files2: File) => {
    setFile2(files2)
  }
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <StepSectionHeader
        title={'Upload IRC && KIBS'}
        subtitle={'Post your document'}
      />
      <div className='mb-4'>
        <label
          htmlFor="phone"
          className="label"
        >
          IRC
        </label>
        <div className='w-full bg-gray-50' dir='ltr'>
          <div>
            <FileUploader
              handleChange={handleChange}
              name="file"
              types={['pdf', 'doc', 'docx', 'png', 'jpg', 'jpeg']}
              multiple={false}
              maxFileSize={10000000}
              minFileSize={0}
              clickable
            >
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:bg-gray-200 flex justify-center items-center gap-2 cursor-pointer"
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
            {/* <input
              type="file"
              id="resume"
              className="hidden"
            /> */}
          </div>

          <div className='mb-4'>
            <label
              htmlFor="phone"
              className="label"
            >
              KIBS
            </label>
            <FileUploader
              handleChange={handleChange2}
              name="file2"
              types={['pdf', 'doc', 'docx', 'png', 'jpg', 'jpeg']}
              multiple={false}
              maxFileSize={10000000}
              minFileSize={0}
              clickable
            >
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:bg-gray-200 flex justify-center items-center gap-2 cursor-pointer"
              >
                {
                  file2 ? (
                    <span className="text-primary-green-400">
                      {file2?.name}
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
    </motion.div>
  )
}

export default PhoneSelectStep