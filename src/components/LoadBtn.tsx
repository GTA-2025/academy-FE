import { CirclesWithBar } from "react-loader-spinner";

const LoadBtn = ({
  height,
  width,
  color,
}: {
  height: string;
  width: string;
  color: string;
}) => {
  return (
    <CirclesWithBar
      height={height}
      width={width}
      color={"blue"}
      outerCircleColor={color}
      innerCircleColor={color}
      barColor={color}
      ariaLabel="circles-with-bar-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};

export default LoadBtn;
