import FacebookIcon from "@/styles/icons/facebook.svg";
import IstagramIcon from "@/styles/icons/instagram.svg";
import LinkedInIcon from "@/styles/icons/linkedin.svg";
import TwitterIcon from "@/styles/icons/twitter.svg";
import YouTubeIcon from "@/styles/icons/youtube.svg";
export function FollowUs(){
    return (
        <div className="py-10">
            <div className="">
                <h1 className="text-center text-primary-500 text-xl">Follow Us</h1>
            </div>
            <div>
                <p className="text-center pb-2 font-semibold">Connect with various social media platforms</p>
            </div>
            <div className="flex items-center justify-around">
                <div>
                   <div className="rounded-full p-5 bg-white">
                   <FacebookIcon className="block h-6 w-6 text-primary-500" />
                   </div>
                   
                </div>
                <div>
                <div className="rounded-full p-5 bg-white">
                <LinkedInIcon className="block h-6 w-6 text-primary-500" />
                </div>
                
                </div>
                <div>
                <div className="rounded-full p-5 bg-white">
                <IstagramIcon className="block h-6 w-6 text-primary-500" />
                    </div>
                    
                </div>
                <div>
                <div className="rounded-full p-5 bg-white">
                <TwitterIcon className="block h-6 w-6 text-primary-500" />
                    </div>
                    
                </div>
                <div>
                <div className="rounded-full p-5 bg-white">
                <YouTubeIcon className="block h-6 w-6 text-primary-500" />
                </div>
                   
                </div>
            </div>
        </div>
    )
}