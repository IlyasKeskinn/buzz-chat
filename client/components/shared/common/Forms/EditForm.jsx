"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { useToast } from "@/components/ui/use-toast";
import { signUpSchema } from "@/lib/validator";
import { editUser } from "@/lib/actions/user.actions";
import userAtom from "@/atom/userAtom";
import AvatarEdit from "../../photo/AvatarEdit";

const EditForm = ({ trigger }) => {
  const [user, setUser] = useRecoilState(userAtom);
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: user.userInfo.username,
      bio: user.userInfo.bio,
    },
  });

  const { toast } = useToast();

  const [imgURL, setImgURL] = useState(user.userInfo.avatarURL);
  const [loading, setLoading] = useState(false);

  const handleDialogStateChange = (isOpen) => {
    if (!isOpen) {
      form.reset({
        username: user.userInfo.username,
        bio: user.userInfo.bio,
      });
    }
    setImgURL(user.userInfo.avatarURL);
  };

  async function onSubmit(values) {
    if (loading) return;
    try {
      setLoading(true);
      const updatedUser = await editUser({
        _id: user.userInfo._id,
        username: values.username,
        bio: values.bio,
        avatarURL: imgURL,
      });

      if (updatedUser) {
        localStorage.setItem(
          "user",
          JSON.stringify({ newUser: false, userInfo: updatedUser })
        );
        setUser({ newUser: false, userInfo: updatedUser });
      }
    } catch (err) {
      let message =
        typeof err.response !== "undefined"
          ? err.response.data.error
          : err.message;

      if (message.includes("username is already taken")) {
        form.setError("username", {
          type: "manual",
          message: "This username is already taken!",
        });
      } else {
        toast({
          title: "Uh oh! Something went wrong.",
          description: message,
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog onOpenChange={handleDialogStateChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex items-center justify-between">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="JohnDoe"
                        {...field}
                        className="input-field"
                        autoFocus={false}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <AvatarEdit imgURL={imgURL} setImgURL={setImgURL} />
            </div>
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Bio..."
                      {...field}
                      className="text-field resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col justify-center gap-2">
              <Button
                type="submit"
                disabled={loading}
                className="w-full py-7 rounded-3xl text-xl "
              >
                Update
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditForm;
