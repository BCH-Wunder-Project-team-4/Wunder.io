import Link from 'next/link'
import Cookies from 'js-cookie'
import { MouseEvent, useCallback, useEffect, useState } from 'react'
import { Button } from '@/ui/button'
import Chevron from "@/styles/icons/chevron-down.svg";

const USER_CONSENT_COOKIE_KEY = 'cookie_consent_is_true'
const USER_CONSENT_COOKIE_EXPIRE_DATE = 365

const CookieConsent = () => {
  const [cookieConsentIsTrue, setCookieConsentIsTrue] = useState(true)

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
      data-modal-backdrop="static"
      className="fixed bottom-0 left-0 right-0 flex items-center justify-center z-50"
    >
      <div className="relative p-2 w-full max-w-7xl text-center ">
        <div className="relative dark:bg-martinique  bg-white rounded-lg shadow">
          <div className="p-4 md:p-5 space-y-4">
            <p className="text-base leading-relaxed dark:text-mischka text-steelgray">
              We use services that use cookies to deliver a better user
              experience, and to analyze traffic. Learn more about the
              services we use at our{' '}
              <Link
                href="/privacy-policy"
                className="dark:text-fog text-primary-600 underline hover:text-blue-800"
              >
                privacy policy
              </Link>
              {' '} page.
            </p>
          </div>
          <div className="flex grid-row flex-wrap items-center justify-center gap-4 p-2 border-t border-fog rounded-b">
            <Button
              data-modal-hide="cookie-consent-modal"
              type="button"
              size='sm'
              variant='tertiary'
            >
              <Chevron className= "h-6 w-6" /> Preferences
            </Button>
            <Button
              data-modal-hide="cookie-consent-modal"
              type="button"
              onClick={onDecline}
              variant='decline'
              size='sm'
              className='bg-hugs'
            >
              Decline all
            </Button>
            <Button
              data-modal-hide="cookie-consent-modal"
              type="button"
              onClick={onAccept}
              variant='accept'
              size='sm'
              className='bg-evergreen'
            >
              Accept all
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}


export default CookieConsent