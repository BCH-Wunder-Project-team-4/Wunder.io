import FacebookIcon from "@/styles/icons/facebook.svg";
import IstagramIcon from "@/styles/icons/instagram.svg";
import LinkedInIcon from "@/styles/icons/linkedin.svg";
import TwitterIcon from "@/styles/icons/twitter.svg";
import YouTubeIcon from "@/styles/icons/youtube.svg";
import { useState } from "react";
export function FollowUs(){
    const [pageUrl, setPageUrl] = useState<string>("wunder.io");
    return (
        <div className="py-10">
            <div className="">
                <h1 className="text-center text-primary-500 font-bold text-2xl">Follow Us</h1>
            </div>
            <div>
                <p className="text-center text-sm pb-2 font-semibold">Connect with various social media platforms</p>
            </div>
            <div className="flex items-center justify-around">
                <div>
                   <div className="rounded-full p-5 bg-white">
                   <a href={`https://www.facebook.com/${pageUrl}`} target="_blank" ><FacebookIcon className="block h-6 w-6 text-primary-500" /></a>
                   </div>
                   
                </div>
                <div>
                <div className="rounded-full p-5 bg-white">
                <a href={`https://www.linkedin.com/company/${pageUrl}`} target="_blank"><LinkedInIcon className="block h-6 w-6 text-primary-500" /></a>
                </div>
                
                </div>
                <div>
                <div className="rounded-full p-5 bg-white">
                <a href={`https://www.instagram.com/${pageUrl}`} target="_blank"><IstagramIcon className="block h-6 w-6 text-primary-500" /></a>
                    </div>
                    
                </div>
                <div>
                <div className="rounded-full p-5 bg-white">
                <a href={`https://www.twitter.com/${pageUrl.replace(/\./g, '_')}`} target="_blank"><TwitterIcon className="block h-6 w-6 text-primary-500" /></a>
                    </div>
                    
                </div>
                <div>
                <div className="rounded-full p-5 bg-white">
                <a href={`https://www.youtube.com/@${pageUrl.replace(/\.io/g, '1585')}`} target="_blank"><YouTubeIcon className="block h-6 w-6 text-primary-500" /></a>
                </div>
                   
                </div>
            </div>
        </div>
    )
}