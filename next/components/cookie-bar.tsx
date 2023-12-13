import Link from 'next/link'
import { MouseEvent } from 'react'

const CookieConsent = () => {
  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log('remember that I accept')
  }

  return (
    <section className="fixed bottom-0 left-0 w-full py-2 md:py-4">
        <div className="flex flex-col items-start px-5 py-3 space-y-2 bg-gray-200 md:flex-row md:space-y-0 md:items-stretch md:space-x-2">
          <div className="flex items-center flex-grow text-gray-900">
            <p className="text-sm font-medium">
              This site uses services that use cookies to deliver better
              experience and analyze traffic. You can learn more about the
              services we use at our{' '}
              <Link href="/privacy-policy">
                <a className="text-sm underline hover:text-lightAccent">
                  privacy policy
                </a>
              </Link>
              .
            </p>
          </div>
          <div className="flex items-center">
            <button
              className="p-3 text-sm font-bold text-white uppercase bg-gray-700 whitespace-nowrap"
              onClick={onClick}
            >
              Got it
            </button>
          </div>
        </div>
    </section>
  )
}

export default CookieConsent