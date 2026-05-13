type StepsProgressBarProps = {
  step: number;
  isThere7thStep?: boolean;
};

const StepsProgressBar = ({ step, isThere7thStep }: StepsProgressBarProps) => {
  const calculateWidth = () => {
    // Calculate width based on the step number
    if (isThere7thStep) {
      return `${(step / 6) * 100}%`
    }
    return `${(step / 7) * 100}%`
  }

  return (
    <div className="bg-gray-100 h-[5px] w-full relative transition-all">
      <div
        style={{ width: calculateWidth() }}
        className="bg-blue-500 h-full absolute transition-all"
      ></div>
    </div>
  );
};

export default StepsProgressBar;
