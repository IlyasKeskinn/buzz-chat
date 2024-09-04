import MessageStatus from "../common/MessageStatus";
import WaveSurfer from "wavesurfer.js";
import { calculateTime } from "@/utils/CalculateTime";
import { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import currentChatAtom from "@/atom/currentChatAtom";
import { useRecoilValue } from "recoil";

// Store the current playing WaveSurfer instance in a ref or context
let currentPlayingWaveform = null;

const VoiceMessage = ({ user, message }) => {
  const [audioMessage, setAudioMessage] = useState(null);
  const [totalDuration, setTotalDuration] = useState(0);
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0);
  const [playingAudio, setPlayingAudio] = useState(false);
  const [waveform, setWaveform] = useState(null);
  const [audioRate, setAudioRate] = useState(1);
  const currentChat = useRecoilValue(currentChatAtom);

  useEffect(() => {
    if (waveform) {
      currentPlayingWaveform = null;
      waveform.destroy();
    }
  }, [currentChat]);

  const waveFormRef = useRef(null);

  useEffect(() => {
    const waveSurfer = WaveSurfer.create({
      container: waveFormRef.current,
      waveColor: "#040404",
      progressColor: "#040404",
      barWidth: 2,
      height: 30,
      barGap: 2,
      minPxPerSec: 1,
      fillParent: true,
      dragToSeek: true,
      autoScroll: true,
      autoCenter: true,
      sampleRate: 8000,
    });

    setWaveform(waveSurfer);

    waveSurfer.on("finish", () => {
      setPlayingAudio(false);
    });

    return () => {
      if (waveSurfer) {
        waveSurfer.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (waveform) {
      const audio = new Audio(message.message);
      setAudioMessage(audio);
      waveform.load(message.message);

      waveform.on("ready", () => {
        setTotalDuration(waveform.getDuration());
      });

      return () => {
        if (waveform) {
          waveform.un("ready");
        }
      };
    }
  }, [waveform, message.message]);

  const handlePlayingAudio = () => {
    if (audioMessage && waveform) {
      waveform.play();
      setPlayingAudio(true);
      currentPlayingWaveform = waveform; // Set the current playing waveform
    }
  };

  useEffect(() => {
    if (
      currentPlayingWaveform &&
      currentPlayingWaveform !== waveform &&
      waveform
    ) {
      waveform.stop();
      setPlayingAudio(false);
    }
  }, [currentPlayingWaveform]);

  const handleStopAudio = () => {
    if (audioMessage && waveform) {
      waveform.stop();
      setPlayingAudio(false);
      currentPlayingWaveform = null; // Clear the current playing waveform
    }
  };

  const handleChangeAudioRate = () => {
    if (audioRate === 1) {
      waveform.setPlaybackRate(1.5);
      setAudioRate(1.5);
    } else if (audioRate === 1.5) {
      waveform.setPlaybackRate(2);
      setAudioRate(2);
    } else {
      waveform.setPlaybackRate(1);
      setAudioRate(1);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")} : ${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    if (waveform) {
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
  }, [waveform]);

  return (
    <div
      id={message._id}
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
                    <FaPause className="text-xl" />
                  </div>
                ))}
              <div className="flex flex-col w-52">
                <div className="flex w-52 gap-2">
                  <div
                    className="w-40"
                    ref={waveFormRef}
                    id="waveformContainer"
                  ></div>
                  <div className="flex  justify-center items-center w-10">
                    <button className="px-2" onClick={handleChangeAudioRate}>
                      {audioRate}x
                    </button>
                  </div>
                </div>
                <span className="text-xs">
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
