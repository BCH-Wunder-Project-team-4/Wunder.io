import { Button } from "@/ui/button";
import { Input } from "@/ui/careers-form-input";
import { Label } from "@/ui/label";
import { StatusMessage } from "@/ui/status-message";
import { Textarea } from "@/ui/textarea";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  phoneNumber: number;
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
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        message: data.message,
        subject: data.subject,
        phone_number: data.phoneNumber,
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
      className="mx-auto mb-4 flex max-w-3xl flex-col gap-5  p-4  transition-all"
    >

      <>
        <div className="flex justify-between gap-4" data-aos="fade" >
          <div className="w-1/2">
            <Label htmlFor="firstName"></Label>

            <Input
              type="text"
              id="firstName"
              placeholder="First Name"
              {...register("firstName", {
                required: true,
              })}
            />
          </div>
          <div className="w-1/2">
            <Label htmlFor="lastName"></Label>

            <Input
              type="text"
              id="lastName"
              placeholder="Last Name"
              {...register("lastName", {
                required: true,
              })}
            />
          </div>
        </div>
        <div className="flex justify-between gap-4" data-aos="fade">
          <div className="w-1/2">
            <Label htmlFor="email"></Label>

            <Input
              type="email"
              id="email"
              placeholder="Email"
              {...register("email", {
                required: true,
              })}
            />
          </div>
          <div className="w-1/2">
            <Label htmlFor="phoneNumber"></Label>

            <Input
              type="number"
              id="phoneNumber"
              placeholder="Phone"
              {...register("phoneNumber", {
                required: true,
              })}
            />
          </div>
        </div>
        <div data-aos="fade">
          <Label htmlFor="subject" ></Label>

          <Input
            type="text"
            id="subject"
            placeholder="Subject"
            {...register("subject", {
              required: true,
            })}
          />
        </div>
        <div data-aos="fade">
          <Label htmlFor="message"></Label>
          <Textarea
            id="message"
            placeholder="Write Something ..."
            {...register("message", {
              required: true,
            })}
          />
        </div>

        <Button type="submit" data-aos="fade">{t("form-submit")}</Button>
      </>
    </form>
  );
}