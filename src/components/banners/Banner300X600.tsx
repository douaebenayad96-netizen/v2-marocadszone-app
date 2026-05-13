import { Adsense } from '@ctrl/react-adsense'

const Banner300X600 = () => {
  return (
    <div className="max-w-[320px] w-full h-[600px] bg-gray-200 rounded flex justify-center items-center">
      <Adsense
        client='ca-pub-9831111278447721'
        slot='9493277135'
        style={{ display: "block", width: 300, height: 600 }}
        format=""
        layout=""
        responsive="false"
      />
    </div>
  )
}

export default Banner300X600