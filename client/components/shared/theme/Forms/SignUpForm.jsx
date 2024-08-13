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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { fetchRoutes } from "@/constants";
import { useToast } from "@/components/ui/use-toast";
import { signUpSchema } from "@/lib/validator";
import AvatarEdit from "../../photo/AvatarEdit";
import userAtom from "@/atom/userAtom";
import axios from "axios";

const SignUpForm = () => {
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      bio: "",
    },
  });

  const { toast } = useToast();

  const [imgURL, setImgURL] = useState("");
  const [user, setUser] = useRecoilState(userAtom);

  async function onSubmit(values) {
    try {
      const { data } = await axios.post(fetchRoutes.createUser, {
        email: user.email,
        username: values.username,
        bio: values.bio,
        avatarURL: imgURL,
      });
    } catch (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: error.response.data.error,
        variant: "destructive",
      });
    }
  }

  return (
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
        <Button type="submit" className="w-full py-7 rounded-3xl text-xl">
          Sign Up
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
