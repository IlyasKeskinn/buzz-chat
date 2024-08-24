import { calculateTime } from "@/utils/CalculateTime";
import { useEffect, useRef, useState } from "react";
import MessageStatus from "../common/MessageStatus";
import WaveSurfer from "wavesurfer.js";
import { FaPlay, FaStop } from "react-icons/fa";

const VoiceMessage = ({ user, message }) => {
  const [audioMessage, setAudioMessage] = useState(null);
  const [totalDuration, setTotalDuration] = useState(0);
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0);
  const [playingAudio, setPlayingAudio] = useState(false);
  const [waveform, setWaveform] = useState(null);

  const waveFormRef = useRef(null);

  useEffect(() => {
    const waveSurfer = WaveSurfer.create({
      container: waveFormRef.current,
      waveColor: "#040404",
      progressColor: "#040404",
      barWidth: 2,
      height: 30,
    });

    setWaveform(waveSurfer);

    waveSurfer.on("finish", () => {
      setPlayingAudio(false);
    });

    return () => waveSurfer.destroy();
  }, []);

  useEffect(() => {
    if (waveform) {
      const audio = new Audio(message.message);

      setAudioMessage(audio);

      waveform.load(message.message);

      waveform.on("ready", () => {

        setTotalDuration(waveform.getDuration());
      });
    }
  }, [waveform, message.message]);

  const handlePlayingAudio = () => {
    if (audioMessage) {
      waveform.play();
      setPlayingAudio(true);
    }
  };

  const handleStopAudio = () => {
    if (audioMessage) {
      waveform.stop();
      setPlayingAudio(false);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart("2", "0")} : ${seconds
      .toString()
      .padStart("2", "0")}`;
  };

  useEffect(() => {
    if (setAudioMessage && waveform) {
      const updatePlaybackTime = () => {
        setCurrentPlaybackTime(waveform.getCurrentTime());
      };

      waveform.on("audioprocess", updatePlaybackTime);

      waveform.on("finish", () => {
        setCurrentPlaybackTime(0);
      });

      return () => {
        waveform.un("audioprocess", updatePlaybackTime);
        waveform.un("finish");
      };
    }
  }, [setAudioMessage, waveform]);

  return (
    <div
      className={`flex ${
        message.sender !== user.userInfo._id ? "justify-start" : "justify-end"
      } mb-2`}
    >
      <div className="relative max-w-md p-5">
        <div
          className={`p-1 rounded-xl shadow-lg break-words  ${
            message.sender !== user.userInfo._id
              ? "bg-secondary text-secondary-foreground rounded-bl-none"
              : "bg-primary text-primary-foreground rounded-br-none"
          }`}
        >
          <div className="p-2 rounded-xl">
            <div className="flex items-center gap-4">
              {audioMessage &&
                (!playingAudio ? (
                  <div
                    className="cursor-pointer w-8"
                    onClick={handlePlayingAudio}
                  >
                    <FaPlay className="text-xl" />
                  </div>
                ) : (
                  <div className="cursor-pointer w-8" onClick={handleStopAudio}>
                    <FaStop className="text-xl" />
                  </div>
                ))}
              <div
                className="w-40"
                ref={waveFormRef}
                id="waveformContainer"
              ></div>
              <div className="w-20">
                <span>
                  {!playingAudio
                    ? formatTime(totalDuration)
                    : formatTime(currentPlaybackTime)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-between px-1 gap-8">
            {message.sender === user.userInfo._id && (
              <MessageStatus recipients={message.recipientStatuses} />
            )}
            <div
              className={`text-xs text-gray-500 ${
                message.sender !== user.userInfo._id ? "text-start" : "text-end"
              }`}
            >
              {calculateTime(message.createdAt)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceMessage;
