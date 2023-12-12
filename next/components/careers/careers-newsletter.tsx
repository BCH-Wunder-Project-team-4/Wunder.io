import { AuthGate } from "@/components/auth-gate";
import { Button } from "@/ui/button";
import { Checkbox } from "@/ui/checkbox";
import { Input } from "@/ui/careers-form-input";
import { Label } from "@/ui/label";
import { StatusMessage } from "@/ui/status-message";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useState } from "react";

type Inputs = {
  email: string;
  policy_checkbox: boolean;
};

export function CareersNewsletterForm() {
  const router = useRouter();
  const [submissionResponse, setSubmissionResponse] = useState(true);

  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    const response = await fetch(`/api/careers-newsletter`, {
      method: "POST",
      body: JSON.stringify({
        webform_id: "careers_newsletter",
        email: data.email,
        policy_checkbox: data.policy_checkbox,
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

  const onErrors = (errors) => {alert(`email is ${errors.email.type}`)};

  if (isSubmitSuccessful && submissionResponse) {
    return (
      <StatusMessage level="success" className="mx-auto w-full max-w-3xl dark:text-mischka">
        <p className="mb-4">{t("Thank you for subscribing to our newsletter!")}</p>
      </StatusMessage>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onErrors)}
      className="mx-auto mb-4 flex max-w-3xl flex-col gap-5 p-4"
    >
      <>
        <div>
          <Input
            type="email"
            id="email"
            required
            placeholder={t("email")}
            {...register("email", {
              required: true,
            })}
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            required
            id="policy_checkbox"
            {...register("policy_checkbox", {
              required: true,
            })}
          />
          <Label htmlFor="policy_checkbox" className=" max-w-sm text-md px-2">
                    {t('footer-newsletter-terms',)} <Link href='/privacy-policy' className='dark:text-mellow text-hug font-bold'> Privacy Policy </Link>.*
          </Label>
        </div>
        <Button type="submit">{t("form-submit")}</Button>
      </>
    </form>
  );
}
