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
      throw new Error("Error. Choose at least one option.");

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
      <h3 className="text-2xl font-bold uppercase tracking-wider py-2"> {t('footer-newsletter-subscribe')}</h3>
      <p className="max-w-sm text-md">{t('footer-newsletter-intro')}</p>
      <p className="py-3 text-md">{t('footer-newsletter-interest')}</p>
      <form
        onSubmit={handleSubmit(onSubmit, onErrors)}
        className="flex flex-col"
        name="newsletter">
        <div className="flex flex-row py-2">
          <input type="checkbox" id="news" className="peer h-5 w-5 shrink-0 rounded border border-graysuit
      disabled:cursor-not-allowed disabled:border-graysuit text-red-600 bg-gray-100" {...register("news", {
            required: false,
          })} />
          <Label htmlFor="news" className="px-2 flex align-text-top text-md">Wunder News</Label>

          <input type="checkbox" id="careers"  {...register("careers", {

            required: false,
          })} />
          <Label htmlFor="careers" className="px-2 flex align-text-top text-md">Careers</Label>

          <input type="checkbox" id="events" {...register("events", {
            required: false,
          })} />
          <Label htmlFor="events" className="px-2 flex align-text-top text-">Events</Label>

        </div>
        <div className="flex flex-row gap-4">
          <Input placeholder="Enter your email" required type={"email"} className="max-w-[400px] bg-transparent border-b-2 autofill:active:bg-transparent" {...register("email", {
            required: true,
          })} />
          <Button variant={"secondary"} className="hover:bg-finnishwinter hover:text-primary-800" size="md" type={"submit"} >{t("form-submit")}</Button>
        </div>
        <div className="flex flex-row gap-4 pt-4">
          <Checkbox id="terms" required {...register("terms", {
            required: true,
          })} />
          <Label htmlFor="terms" className="px-2  max-w-sm text-md">
            {t('footer-newsletter-terms',)} <Link href='/privacy-policy' className='text-mellow'> Privacy Policy </Link>.*
          </Label>
        </div>
      </form>
    </div>
  )
}