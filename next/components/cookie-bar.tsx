import Link from 'next/link'
import Cookies from 'js-cookie'
import { MouseEvent, useCallback, useEffect, useState } from 'react'
import { Button } from '@/ui/button'

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
      className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center z-50 bg-opacity-15 bg-black backdrop-blur-sm "
    >
      <div className="relative p-4 w-full max-w-2xl text-center">
        <div className="relative bg-steelgray rounded-lg shadow bg-opacity-95">
          <div className="flex items-center justify-center p-4 md:p-5 border-b border-fog rounded-t">
            <h3 className="text-xl font-semibold text-finnishwinter">
              Cookie Consent
            </h3>
          </div>
          <div className="p-4 md:p-5 space-y-4">
            <p className="text-base leading-relaxed text-finnishwinter">
              We use services that use cookies to deliver a better user
              experience, and to analyze traffic. You can learn more about the
              services we use at our{' '}
              <Link
                href="/privacy-policy"
                className="text-fog underline hover:text-blue-800"
              >
                privacy policy
              </Link>
              {' '} page.
            </p>
          </div>
          <div className="flex items-center justify-center gap-4 p-4 md:p-5 border-t border-fog rounded-b">
            <Button
              data-modal-hide="cookie-consent-modal"
              type="button"
              onClick={onDecline}
              className='bg-steelgray'
            >
              Decline
            </Button>
            <Button
              data-modal-hide="cookie-consent-modal"
              type="button"
              onClick={onAccept}
            >
              I accept
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}


export default CookieConsent