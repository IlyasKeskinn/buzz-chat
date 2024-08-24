import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import { FaStop } from "react-icons/fa";
import { LuSendHorizonal } from "react-icons/lu";
import { IoIosPause } from "react-icons/io";
import { HiOutlineMicrophone } from "react-icons/hi2";
import WaveSurfer from "wavesurfer.js";

const CaptureAudio = ({
  setShowCaptureAudio,
  sendVoiceMessage,
  voiceLoading,
  setVoiceLoading,
}) => {
  const { theme } = useTheme();
  const [isRecording, setRecording] = useState(true);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [waweForm, setWaweForm] = useState(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0);
  const [audioTotalDuration, setAudioTotalDuration] = useState(0);
  const [recordedAudioBlob, setRecorderAudioBlob] = useState(null);

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const waweFormRef = useRef(null);

  useEffect(() => {
    const waveSurfer = WaveSurfer.create({
      container: "#waveForm",
      waveColor: "#FBB823",
      progressColor: "#FBB823",
      barWidth: 2,
      height: 30,
    });

    setWaweForm(waveSurfer);

    waveSurfer.on("finish", () => {
      setIsPlayingAudio(false);
    });

    return () => waveSurfer.destroy();
  }, []);

  useEffect(() => {
    if (waweForm) handleStartRecording();
  }, [waweForm]);

  useEffect(() => {
    let interval;

    if (isRecording) {
      interval = setInterval(() => {
        setRecordingDuration((prevDuration) => {
          setAudioTotalDuration(prevDuration + 1);
          return prevDuration + 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRecording]);

  useEffect(() => {
    if (recordedAudio) {
      const updatePlaybackTime = () => {
        setCurrentPlaybackTime(waweForm.getCurrentTime());
      };
      waweForm.on("audioprocess", updatePlaybackTime);

      waweForm.on("finish", () => {
        setCurrentPlaybackTime(0);
      });

      return () => {
        waweForm.un("audioprocess", updatePlaybackTime);
        waweForm.un("finish");
      };
    }
  }, [recordedAudio, waweForm]);

  const handleStartRecording = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      setAudioTotalDuration(0);
      setRecordingDuration(0);
      setCurrentPlaybackTime(0);
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const mediaRecorder = new MediaRecorder(stream);

        mediaRecorderRef.current = mediaRecorder;
        audioRef.current.srcObject = stream;

        let audioChunks = [];

        mediaRecorder.ondataavailable = (e) => {
          audioChunks.push(e.data);
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, {
            type: "audio/mp3",
          });
          const audioUrl = URL.createObjectURL(audioBlob);

          const audio = new Audio(audioUrl);

          setRecordedAudio(audio);
          setRecorderAudioBlob(audioBlob);

          waweForm.load(audioUrl);
        };

        mediaRecorder.start();

        setRecording(true);
      } catch (err) {
        console.error("Mic:", err);
      }
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      waweForm.stop();
    }
  };

  const handlePlayingAudio = () => {
    if (audioRef.current) {
      setCurrentPlaybackTime(0);
      waweForm.play();
      setIsPlayingAudio(true);
    }
  };

  const handleStopAudio = () => {
    if (audioRef.current) {
      waweForm.stop();
      setIsPlayingAudio(false);
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

  const handleDeleteVoice = () => {
    if (recordedAudio) {
      recordedAudio.pause();
    }
    setRecordedAudio(null);
    setShowCaptureAudio(false);
    setVoiceLoading(false);
  };

  const handleSendVocie = () => {
    if (voiceLoading) return;
    sendVoiceMessage(recordedAudioBlob);
    handleDeleteVoice();
  };

  return (
    <>
      <div
        className="rounded-full h-12 w-12 flex justify-center items-center cursor-pointer hover:bg-gray-200/30 transition-colors duration-200"
        onClick={handleDeleteVoice}
      >
        <MdOutlineDeleteOutline className="text-2xl" />
      </div>
      <div className="w-full rounded-lg h-14 flex items-center">
        <div className="px-2 w-full h-14">
          <div
            className={`flex gap-4 h-14 items-center border border-bee/10 rounded-xl ${
              theme === "light" ? "bg-muted/80" : "bg-muted/10"
            }`}
          >
            <div className="w-full ">
              <div className="px-4">
                <div>
                  <div className="flex items-center gap-4">
                    {recordedAudio &&
                      (!isPlayingAudio ? (
                        <div
                          className="cursor-pointer"
                          onClick={handlePlayingAudio}
                        >
                          <FaPlay className="text-xl" />
                        </div>
                      ) : (
                        <div
                          className="cursor-pointer"
                          onClick={handleStopAudio}
                        >
                          <FaStop className="text-xl" />
                        </div>
                      ))}
                    <div
                      ref={waweFormRef}
                      className="w-full"
                      id="waveForm"
                      hidden={isRecording}
                    ></div>

                    {recordedAudio && (
                      <div className="flex items-center gap-4 w-32 text-sm">
                        {isPlayingAudio ? (
                          <div>
                            <span>{formatTime(currentPlaybackTime)}</span>
                          </div>
                        ) : (
                          <div>
                            <span>{formatTime(audioTotalDuration)}</span>
                          </div>
                        )}
                      </div>
                    )}
                    {recordedAudio && (
                      <div
                        disabled={true}
                        className="p-2 rounded-full bg-primary cursor-pointer"
                        onClick={handleSendVocie}
                      >
                        <LuSendHorizonal className="text-xl" />
                      </div>
                    )}
                  </div>
                  <audio ref={audioRef} hidden />
                </div>
                {isRecording && (
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4 w-full">
                      <div>
                        <HiOutlineMicrophone className="text-xl text-red-400 animate-pulse" />
                      </div>
                      <div className="text-red-400 animate-pulse flex items-center gap-2">
                        <p className="">Recording</p>
                        <span>{recordingDuration}s</span>
                      </div>
                    </div>
                    <div
                      className="p-2 rounded-full bg-primary cursor-pointer"
                      onClick={handleStopRecording}
                    >
                      <IoIosPause className="text-xl" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CaptureAudio;
