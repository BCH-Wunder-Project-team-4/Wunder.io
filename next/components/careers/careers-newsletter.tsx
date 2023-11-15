import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";

import { AuthGate } from "@/components/auth-gate";

import { Button } from "@/ui/button";
import { Checkbox } from "@/ui/checkbox";
import { Input } from "@/ui/careers-form-input";
import { StatusMessage } from "@/ui/status-message";
import { Label } from "@/ui/label";

type Inputs = {
  email: string;
  policy_checkbox: boolean;
};

export function CareersNewsletterForm() {
  const router = useRouter();
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
      alert("Error!");    
    }
  };

  const onErrors = (errors) => console.error(errors);

  if (isSubmitSuccessful) {
    return (
      <StatusMessage level="success" className="mx-auto w-full max-w-3xl">
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
              placeholder="Email"
              {...register("email", {
                required: true,
              })}
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="policy_checkbox"
              {...register("policy_checkbox", {
                required: true,
              })}
            />
            <Label htmlFor="policy_checkbox" className="mb-0">
              {t("I agree to the policy")}
              
            </Label>
          </div>
          <Button type="submit">{t("form-submit")}</Button>
        </>
    </form>
  );
}
