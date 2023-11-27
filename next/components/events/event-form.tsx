import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { StatusMessage } from "@/ui/status-message";

type Inputs = {
  name: string;
  email: string;
};

export function EventForm({eventName}) {
  const router = useRouter();
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
      className="mx-auto flex max-w-3xl flex-col gap-5 rounded border border-finnishwinter bg-white p-4 shadow-md transition-all hover:shadow-md"
    >
      
        <>
          <div className="text-center">
            <Label htmlFor="email"></Label>
            <Input 
              type="email"
              id="email"
              className="border"
              placeholder="enter your email"
              {...register("email", {
                required: true,
              })}
            />
          </div>

          <Button type="submit">Register</Button>
        </>
    </form>
  );
}

// 'webform_submission--event'
