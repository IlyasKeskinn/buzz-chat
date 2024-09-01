"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useRef, useState } from "react";
import { CiCamera } from "react-icons/ci";

const CapturePhoto = ({ open, setOpen, setImgURL }) => {
  let stream = null; // Declare stream in the outer scope
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setLoading(false);
        }
      } catch (error) {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "Error accessing camera",
        });
        setError(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      setLoading(true); // Set loading to true when starting the camera
      startCamera();
    }

    // Cleanup function
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [open]); // Depend on `open` to start/stop the camera

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const imageDataUrl = canvas.toDataURL("image/png");

    setImgURL(imageDataUrl);
    setOpen(false);
  };

  const videoRef = useRef(null);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="sm:max-w-md"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-center">Take photo</DialogTitle>

          <div className="flex justify-center items-center py-8 ">
            <div className="relative h-64 w-64 rounded-full overflow-hidden ">
              {!error ? (
                <>
                  <div className={`${!loading && "hidden"} h-64 w-64`}>
                    <Skeleton className="h-80 w-80 object-cover" />
                    <div className="h-64 w-64 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
                      <p>Camera turns on</p>
                      <Spinner />
                    </div>
                  </div>
                  <video
                    ref={videoRef}
                    className={`scale-x-[-1] h-full w-full object-cover ${
                      loading && "hidden"
                    }`}
                    autoPlay
                  ></video>
                </>
              ) : (
                <div className={`ƒh-64 w-64`}>
                  <Skeleton className="h-80 w-80 object-cover" />
                  <div className="h-64 w-64 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
                    <p>Camera does not turn on</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-center items-center">
            <Button
              disabled={loading}
              variant="ghost"
              className="h-16 w-16 rounded-full border-2 flex justify-center items-center cursor-pointer border-rose-300  hover:bg-rose-50 shadow-lg transition-all duration-300"
              onClick={capturePhoto}
            >
              <CiCamera className="text-3xl font-extrabold" />
            </Button>
          </div>
        </DialogHeader>
        <DialogFooter className="sm:justify-start"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CapturePhoto;
