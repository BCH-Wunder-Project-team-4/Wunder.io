import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";

import { Button } from "@/ui/button";
import { Label } from "@/ui/label";
import { StatusMessage } from "@/ui/status-message";
import { Textarea } from "@/ui/textarea";

type Inputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export function ContactForm() {
  const router = useRouter();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => { 
    const response = await fetch(`/api/contact`, {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        message: data.message,
        subject: data.subject,
      }),
      // This will record the submission with the right language:
      headers: {
        "accept-language": router.locale,
      },
    });

    if (!response.ok) {
      alert("Error!");    
    }
  };

  const onErrors = (errors) => console.error(errors);

  if (isSubmitSuccessful) {
    return (
      <StatusMessage level="success" className="mx-auto w-full max-w-3xl">
        <p className="mb-4">{t("form-thank-you-message")}</p>
        <Button type="button" onClick={() => reset()}>
          {t("form-send-another-message")}
        </Button>
      </StatusMessage>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onErrors)}
      className="mx-auto mb-4 flex max-w-3xl flex-col gap-5 rounded border border-finnishwinter bg-white p-4 shadow-md transition-all hover:shadow-md"
    >
      
        <>
          <div className="flex justify-between">
          <div className="w-1/2">
            <Label htmlFor="name"></Label>
            <input
              className="border w-11/12 p-1"
              type="text"
              id="name"
              placeholder="first name"
              {...register("name", {
                required: true,
              })}
            />
          </div>
          <div className="w-1/2">
            <Label htmlFor="name"></Label>
            <input
              className="border w-11/12 p-1 float-right"
              type="text"
              id="name"
              placeholder="last name"
              {...register("name", {
                required: true,
              })}
            />
          </div>
          </div>
          <div className="flex justify-between">
          <div className="w-1/2">
            <Label htmlFor="email"></Label>
            <input
              className="border w-11/12 p-1"
              type="email"
              id="email"
              placeholder="email"
              {...register("email", {
                required: true,
              })}
            />
          </div>
          <div className="w-1/2">
            <Label htmlFor="email"></Label>
            <input
              className="border w-11/12 p-1 float-right"
              type="email"
              id="email"
              placeholder="phone"
              {...register("email", {
                required: true,
              })}
            />
          </div>
          </div>
          <div>
            <Label htmlFor="subject"></Label>
            <input
              className="border w-full p-1"
              type="text"
              id="subject"
              placeholder="company"
              {...register("subject", {
                required: true,
              })}
            />
          </div>
          <div>
            <Label htmlFor="message"></Label>
            <Textarea
              id="message"
              placeholder="write something ..."
              {...register("message", {
                required: true,
              })}
            />
          </div>

          <Button type="submit">{t("form-submit")}</Button>
        </>
    </form>
  );
}
