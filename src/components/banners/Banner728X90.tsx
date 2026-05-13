import { Adsense } from "@ctrl/react-adsense"

const Banner728X90 = () => {

  return (
    <div className="max-w-[728px] w-full h-[90px] bg-gray-200 rounded flex justify-center items-center">
      <Adsense
        client='ca-pub-9831111278447721'
        slot='8902250199'
        style={{ display: "block", width: 728, height: 90 }}
        format=""
        layout=""
        responsive="false"
      />
    </div>
  )
}

export default Banner728X90