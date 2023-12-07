import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { StatusMessage } from "@/ui/status-message";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

type Inputs = {
  name: string;
  email: string;
};

export function EventForm({ eventName }) {
  const router = useRouter();
  const [submissionResponse, setSubmissionResponse] = useState(true);
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    const response = await fetch(`/api/event`, {
      method: "POST",
      body: JSON.stringify({
        name: eventName,
        email: data.email,
      }),
      // This will record the submission with the right language:
      headers: {
        "accept-language": router.locale,
      },
    });

    if (!response.ok) {
      alert("This email has already been submitted.");
      setSubmissionResponse(false);
    }
    if (response.ok) {
      setSubmissionResponse(true);
    }
  };

  const onErrors = (errors) => {
    alert(`email is ${errors.email.type}`);
  };

  if (isSubmitSuccessful && submissionResponse) {
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
      className="mx-auto flex max-w-3xl flex-col gap-5 rounded border border-finnishwinter bg-white dark:bg-martinique dark:border-scapaflow p-4 shadow-md transition-all hover:shadow-md"
    >
      <>
        <div className="text-center">
          <h3 className="text-left text-heading-sm mb-4 text-steelgray dark:text-mischka">
            Sign up for the event
          </h3>
          <Label htmlFor="email"></Label>
          <Input
            type="email"
            id="email"
            className="border dark:text-steelgray"
            placeholder="Enter your email"
            {...register("email", {
              required: true,
            })}
          />
        </div>

        <Button
          className="dark:hover:bg-steelgray dark:hover:border-steelgray dark:hover:text-white"
          type="submit"
        >
          Register
        </Button>
      </>
    </form>
  );
}

// 'webform_submission--event'
