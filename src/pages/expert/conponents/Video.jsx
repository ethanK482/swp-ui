/* eslint-disable react/prop-types */
import { useRef } from "react";

const VideoPlayer = ({ lesson, isShowTitle=true }) => {
  const videoRef = useRef(null);

  return (
    <>
      <video ref={videoRef} controls>
        <source src={lesson.video_url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="text-left mt-2">
        <span className="text-[18px] font-bold ">
          {isShowTitle && `${lesson.lesson_order}.${lesson.name}`}
        </span>
      </div>
    </>
  );
};

export default VideoPlayer;
