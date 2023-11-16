import { Button } from "@/ui/button"
import { Checkbox } from "@/ui/checkbox"
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"
import Link from "next/link";
import { StatusMessage } from "@/ui/status-message";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

type Inputs = {
  news: boolean;
  careers: boolean;
  events: boolean;
  email: string;
  terms: boolean;
};

export const NewsletterForm = () => {
  const { t } = useTranslation()
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    console.log(data);

    if (data.news || data.careers || data.events) {
      const response = await fetch(`/api/footer-newsletter`, {
        method: "POST",
        body: JSON.stringify({
          webform_id: "footer_newsletter",
          news: data.news,
          careers: data.careers,
          events: data.events,
          email: data.email,
          terms: data.terms,
        }),
        headers: {
          "accept-language": router.locale,
        },
      });

      if (!response.ok) {
        alert("Error!");
      }
    }
    else {
      return (
        alert("Error. Choose at least one option.")
      )
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
    <div className="px-6 flex-col">
      <h3 className="text-sm font-bold uppercase tracking-wider py-2"> {t('footer-newsletter-subscribe')}</h3>
      <p className="max-w-sm">{t('footer-newsletter-intro')}</p>
      <p className="py-3">{t('footer-newsletter-interest')}</p>
      <form
        onSubmit={handleSubmit(onSubmit, onErrors)}
        className="flex flex-col"
        name="newsletter">
        <div className="flex flex-row py-2">
          <Checkbox id="news"  {...register("news", {
            required: false,
          })} />
          <Label htmlFor="news" className="px-2 flex align-text-top ">Wunder News</Label>

          <Checkbox id="careers" defaultChecked {...register("careers", {

            required: false,
          })} />
          <Label htmlFor="careers" className="px-2 flex align-text-top ">Careers</Label>

          <Checkbox id="events" {...register("events", {
            required: false,
          })} />
          <Label htmlFor="events" className="px-2 flex align-text-top ">Events</Label>

        </div>
        <div className="flex flex-row gap-4">
          <Input placeholder="Enter your email" required type={"email"} className="max-w-[400px]" {...register("email", {
            required: true,
          })} />
          <Button variant={"primary"} size="md" type={"submit"} >{t("form-submit")}</Button>
        </div>
        <div className="flex flex-row gap-4 pt-4">
          <Checkbox id="terms" required {...register("terms", {
            required: true,
          })} />
          <Label htmlFor="terms" className="px-2  max-w-sm">
            {t('footer-newsletter-terms',)} <Link href='/privacy-policy' className='text-primary-600'> Privacy Policy </Link>.*
          </Label>
        </div>
      </form>
    </div>
  )
}