import Link from 'next/link'
import Cookies from 'js-cookie'
import { MouseEvent, useEffect, useState } from 'react'
import { Button } from '@/ui/button'
import { useTranslation } from 'react-i18next'

const USER_CONSENT_COOKIE_KEY = 'cookie_consent_is_true'
const USER_CONSENT_COOKIE_EXPIRE_DATE = 365

const CookieConsent = () => {
  const [cookieConsentIsTrue, setCookieConsentIsTrue] = useState(true)
  const { t } = useTranslation();

  useEffect(() => {
    const consentIsTrue = Cookies.get(USER_CONSENT_COOKIE_KEY) === 'true'
    setCookieConsentIsTrue(consentIsTrue)
  }, [])

  const onAccept = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (!cookieConsentIsTrue) {
      Cookies.set(USER_CONSENT_COOKIE_KEY, 'true', {
        expires: USER_CONSENT_COOKIE_EXPIRE_DATE,
      })
      setCookieConsentIsTrue(true)
    }
  }
  const onDecline = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    document.getElementById('cookie-consent-modal').style.display = 'none';
  };

  if (cookieConsentIsTrue) {
    return null
  }

  return (
    <div
      id="cookie-consent-modal"
      className="fixed bottom-0 left-0 right-0 flex items-center justify-center z-50"
    >
      <div className="relative p-2 w-full max-w-9xl text-center">
        <div className="relative bg-martinique rounded-lg shadow">
        <div className="p-2 space-y-4 text-lg text-bold">
          <h3 className='text-mischka'>{t("cookies")}</h3>
        </div>
          <div className="p-2 space-y-4">
            <p className="text-base leading-relaxed text-mischka">
            {t("cookies-info")}
              <Link
                href="/privacy-policy"
                className="text-mellow underline hover:text-blue-800"
              >
                {t("Privacy Policy")}
              </Link>
            </p>
          </div>
          <div className="flex grid-row flex-wrap items-center justify-center gap-4 p-2 border-t border-fog rounded-b">
            <button
              data-modal-hide="cookie-consent-modal"
              type="button"
              className='text-fog'
            >{t("preferences")}
            </button>
            <p className='text-mischka'>{t("or")}</p>
            <Button
              data-modal-hide="cookie-consent-modal"
              type="button"
              onClick={onDecline}
              variant='decline'
              size='sm'
              className='bg-hugs'
            >
              {t("decline-all")}
            </Button>
            <Button
              data-modal-hide="cookie-consent-modal"
              type="button"
              onClick={onAccept}
              variant='accept'
              size='sm'
              className='bg-evergreen'
            >
              {t("accept-all")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CookieConsent