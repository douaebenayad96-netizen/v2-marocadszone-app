import { Adsense } from "@ctrl/react-adsense";

const Banner970X90 = () => {

  return (
    <div className="max-w-[970px] w-full h-[90px] bg-gray-200 rounded flex justify-center items-center">
      <Adsense
        client='ca-pub-9831111278447721'
        slot='9493277135'
        style={{ display: "block", width: 970, height: 90 }}
        format=""
        layout=""
        responsive="false"
      />
    </div>
  );
};

export default Banner970X90;