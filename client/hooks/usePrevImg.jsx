import { useToast } from "@/components/ui/use-toast"
import { useState } from "react";

const usePrevImg = (imgURL, setImgURL) => {
  const { toast } = useToast()

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // Set canvas size to match the image size
          canvas.width = img.width;
          canvas.height = img.height;

          // Draw the image onto the canvas
          ctx.drawImage(img, 0, 0);

          // Convert canvas to a Data URL
          const Img = canvas.toDataURL("image/jpeg", 0.7);

          // Update the state with the new image URL
          setImgURL(Img);
        };
      };

      // Start reading the file as a data URL
      reader.readAsDataURL(file);
    } else {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Please select a valid image file.",
      });
    }
  };

  return { handleImageChange };
};

export default usePrevImg;
