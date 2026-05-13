import { Adsense } from "@ctrl/react-adsense"

const Banner300X250 = () => {

  return (
    <div className="max-w-[320px] w-full h-[250px] bg-gray-200 rounded flex justify-center items-center">
      <Adsense
        client='ca-pub-9831111278447721'
        slot='6878775985'
        style={{ display: "block", width: 300, height: 250 }}
        format=""
        layout=""
        responsive="false"
      />
    </div>
  )
}

export default Banner300X250