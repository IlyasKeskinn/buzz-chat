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
import { useToast } from "@/components/ui/use-toast";
import { signUpSchema } from "@/lib/validator";
import { useRouter } from "next/navigation";
import userAtom from "@/atom/userAtom";
import createUser from "@/lib/actions/user.actions";
import AvatarEdit from "../../photo/AvatarEdit";
import { Spinner } from "@/components/ui/spinner";

const SignUpForm = () => {
  const router = useRouter();
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
  const [loading, setLoading] = useState(false);

  async function onSubmit(values) {
    if (loading) return;
    try {
      setLoading(true);
      const createdUser = await createUser({
        email: user.userInfo.email,
        username: values.username,
        bio: values.bio,
        avatarURL: imgURL,
      });

      if (createdUser) {
        localStorage.setItem(
          "user",
          JSON.stringify({ newUser: false, userInfo: createdUser })
        );
        setUser({ newUser: false, userInfo: createdUser });
        router.push("/");
      }
    } catch (err) {
      let message =
        typeof err.response !== "undefined"
          ? err.response.data.error
          : err.message;

      toast({
        title: "Uh oh! Something went wrong.",
        description: message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
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
        <div className="flex flex-col justify-center gap-2">
          <Button
            type="submit"
            disabled={loading}
            className="w-full py-7 rounded-3xl text-xl "
          >
            Sign Up
            {loading && <Spinner color="fuchsia-50" />}
          </Button>
          {loading && (
            <p className="text-center text-xs font-light">
              Profile is being prepared...
            </p>
          )}
        </div>
      </form>
    </Form>
  );
};

export default SignUpForm;
