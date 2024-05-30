/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";

const VideoPlayer = ({ lesson, isShowTitle=true, isNav=false }) => {
  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [lesson]);
  return (
    <>
      <video style={isNav ?  {maxWidth:"75%"} : {}} ref={videoRef} controls>
        <source src={lesson?.video_url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="text-left mt-2">
        <span className="text-[18px] font-bold ">
          {isShowTitle && `${lesson?.lesson_order}.${lesson?.name}`}
        </span>
      </div>
    </>
  );
};

export default VideoPlayer;
