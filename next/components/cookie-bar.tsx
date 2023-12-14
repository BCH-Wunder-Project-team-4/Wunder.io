import Link from 'next/link';
import Cookies from 'js-cookie';
import { MouseEvent, useEffect, useState } from 'react';
import { Button } from '@/ui/button';
import { useTranslation } from 'react-i18next';

const USER_CONSENT_COOKIE_KEY = 'cookies_consent_is_true';
const USER_CONSENT_COOKIE_EXPIRE_DATE = 365;

const ADVERTISEMENT_COOKIES_KEY = 'advertisement_cookies';
const ADVERTISEMENT_COOKIES_EXPIRE_DATE = 365;

const ANALYTICS_COOKIES_KEY = 'analytics_cookies';
const ANALYTICS_COOKIES_EXPIRE_DATE = 365;

const FUNCTIONAL_COOKIES_KEY = 'functional_cookies';
const FUNCTIONAL_COOKIES_EXPIRE_DATE = 365;

const USER_NECESSARY_COOKIE_KEY = 'necessary_cookies';
const USER_NECESSARY_COOKIE_EXPIRE_DATE = 365;

export const showCookieBar = () => {
  Cookies.set(USER_CONSENT_COOKIE_KEY, 'false', {
    expires: USER_CONSENT_COOKIE_EXPIRE_DATE,
  });
  Cookies.set(ADVERTISEMENT_COOKIES_KEY, 'false', {
    expires: ADVERTISEMENT_COOKIES_EXPIRE_DATE,
  });
  Cookies.set(ANALYTICS_COOKIES_KEY, 'false', {
    expires: ANALYTICS_COOKIES_EXPIRE_DATE,
  });
  Cookies.set(FUNCTIONAL_COOKIES_KEY, 'false', {
    expires: FUNCTIONAL_COOKIES_EXPIRE_DATE,
  });
  const cookieConsentModal = document.getElementById('cookie-consent-modal');
  if (cookieConsentModal) {
    cookieConsentModal.style.display = 'flex';
  }
}

const CookieConsent = () => {
  const [cookieConsentIsTrue, setCookieConsentIsTrue] = useState(true);
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);
  const [analyticsPreference, setAnalyticsPreference] = useState(false);
  const [advertisementPreference, setAdvertisementPreference] = useState(false);
  const [functionalPreference, setFunctionalPreference] = useState(false);
  const { t } = useTranslation();
  
  useEffect(() => {
    const consentIsTrue = Cookies.get(USER_CONSENT_COOKIE_KEY) === 'true';
    setCookieConsentIsTrue(consentIsTrue);
  }, []);
  
  const onAccept = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if (!cookieConsentIsTrue) {
      Cookies.set(USER_CONSENT_COOKIE_KEY, 'true', {
        expires: USER_CONSENT_COOKIE_EXPIRE_DATE,
      });
      Cookies.set(ADVERTISEMENT_COOKIES_KEY, 'true', {
        expires: ADVERTISEMENT_COOKIES_EXPIRE_DATE,
      });
      Cookies.set(ANALYTICS_COOKIES_KEY, 'true', {
        expires: ANALYTICS_COOKIES_EXPIRE_DATE,
      });
      Cookies.set(FUNCTIONAL_COOKIES_KEY, 'true', {
        expires: FUNCTIONAL_COOKIES_EXPIRE_DATE,
      });
      Cookies.set(USER_NECESSARY_COOKIE_KEY, 'true', {
        expires: USER_NECESSARY_COOKIE_EXPIRE_DATE,
      });
    }
    document.getElementById('cookie-consent-modal').style.display = 'none';
  };
  
  const onNecessary = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    Cookies.set(USER_CONSENT_COOKIE_KEY, 'true', {
      expires: USER_CONSENT_COOKIE_EXPIRE_DATE,
    });
    Cookies.set(ADVERTISEMENT_COOKIES_KEY, 'false', {
      expires: ADVERTISEMENT_COOKIES_EXPIRE_DATE,
    });
    Cookies.set(ANALYTICS_COOKIES_KEY, 'false', {
      expires: ANALYTICS_COOKIES_EXPIRE_DATE,
    });
    Cookies.set(FUNCTIONAL_COOKIES_KEY, 'false', {
      expires: FUNCTIONAL_COOKIES_EXPIRE_DATE,
    });
    Cookies.set(USER_NECESSARY_COOKIE_KEY, 'true', {
      expires: USER_NECESSARY_COOKIE_EXPIRE_DATE,
    });
    
    document.getElementById('cookie-consent-modal').style.display = 'none';
  };
  
  const showPreferences = () => {
    setShowPreferencesModal(prevState => !prevState);
  };
  
  const savePreferences = () => {
    setShowPreferencesModal(false);
    document.getElementById('cookie-consent-modal').style.display = 'none';
    Cookies.set(USER_CONSENT_COOKIE_KEY, 'true', {
      expires: USER_CONSENT_COOKIE_EXPIRE_DATE,
    });
    Cookies.set(USER_NECESSARY_COOKIE_KEY, 'true', {
      expires: USER_NECESSARY_COOKIE_EXPIRE_DATE,
    });
    Cookies.set(ANALYTICS_COOKIES_KEY, analyticsPreference ? 'true' : 'false', {
      expires: ANALYTICS_COOKIES_EXPIRE_DATE,
    });
    Cookies.set(ADVERTISEMENT_COOKIES_KEY, advertisementPreference ? 'true' : 'false', {
      expires: ADVERTISEMENT_COOKIES_EXPIRE_DATE,
    });
    Cookies.set(FUNCTIONAL_COOKIES_KEY, functionalPreference ? 'true' : 'false', {
      expires: FUNCTIONAL_COOKIES_EXPIRE_DATE,
    });
  };
  
  if (cookieConsentIsTrue) {
    return null;
  }
  
  return (
    <>
    <div
      id="cookie-consent-modal"
      className="fixed bottom-0 left-0 right-0 flex items-center justify-center z-50"
      >
      <div className="transition-opacity duration-300 relative p-2 w-full max-w-9xl text-center">
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
            {showPreferencesModal && (
              <div
                id="cookie-preferences-modal"
                className="transition-opacity duration-300 border-t border-fog relative flex items-center justify-center z-50"
              >
                <div className="relative p-2 w-full max-w-9xl text-center">
                  <div className="relative bg-martinique rounded-lg shadow backdrop-blur-sm opacity-95">
                    <div className="p-2 space-y-4">
                      <p className="text-base leading-relaxed text-mischka">
                        {t("cookie-preferences-info")}
                      </p>
                      <div className="flex items-center justify-center gap-4 p-2 rounded-b">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="analyticsSwitch"
                      checked={analyticsPreference}
                      onChange={() => setAnalyticsPreference((prev) => !prev)}
                    />
                    <label htmlFor="analyticsSwitch">{t("Analytics")}</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="advertisementSwitch"
                      checked={advertisementPreference}
                      onChange={() => setAdvertisementPreference((prev) => !prev)}
                    />
                    <label htmlFor="advertisementSwitch">{t("Advertisement")}</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="functionalSwitch"
                      checked={functionalPreference}
                      onChange={() => setFunctionalPreference((prev) => !prev)}
                    />
                    <label htmlFor="functionalSwitch">{t("Functional")}</label>
                  </div>
                </div>
              </div>
                    <div className="flex grid-row flex-wrap items-center justify-center gap-4 p-2 rounded-b">
                      <Button
                        type="button"
                        onClick={savePreferences}
                        variant='accept'
                        size='sm'
                        className='bg-evergreen'
                      >
                        {t("preferences")}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          <div className="flex grid-row flex-wrap items-center justify-center gap-4 p-2 border-t border-fog rounded-b">
            <button
              data-modal-hide="cookie-consent-modal"
              type="button"
              className='text-fog underline'
              onClick={showPreferences}
            >{t("preferences")}
            </button>
            <Button
              data-modal-hide="cookie-consent-modal"
              type="button"
              onClick={onNecessary}
              variant='decline'
              size='sm'
              className='bg-martinique'
            >
              {t("necessary")}
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
    </>
  )
}

export default CookieConsent