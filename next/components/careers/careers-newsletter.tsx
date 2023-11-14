import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";

import { AuthGate } from "@/components/auth-gate";

import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { StatusMessage } from "@/ui/status-message";

type Inputs = {
  name: string;
  email: string;
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
        name: data.name,
        email: data.email,
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
              type="text"
              id="name"
              placeholder="Your name"
              {...register("name", {
                required: true,
              })}
            />
          </div>
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

          <Button type="submit">{t("form-submit")}</Button>
        </>
    </form>
  );
}
