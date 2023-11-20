import { FaFacebookF } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdOutlineLocalPhone } from "react-icons/md";
import { FaRegAddressCard } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
export function FollowUs(){
    return (
        <div className="py-10">
            <div>
                <h1 className="text-center py-3 font-bold text-3xl">Follow Us</h1>
            </div>
            <div>
                <p className="text-center pb-2 font-semibold">Connect with various social media platforms</p>
            </div>
            <div className="flex items-center justify-around">
                <div>
                   <div className="rounded-full p-3 bg-stone">
                   <p>
                     <MdOutlineMailOutline></MdOutlineMailOutline>
                   </p>
                   </div>
                   <p>Email</p>
                </div>
                <div>
                <div className="rounded-full p-3 bg-stone">
                <p>
                    <MdOutlineLocalPhone></MdOutlineLocalPhone>
                </p>
                </div>
                <p>
                    Phone
                </p>
                </div>
                <div>
                <div className="rounded-full p-3 bg-stone">
                    <p>
                        <FaRegAddressCard></FaRegAddressCard>
                    </p>
                    </div>
                    <p>Address</p>
                </div>
                <div>
                <div className="rounded-full p-3 bg-stone">
                    <p>
                        <FaTwitter></FaTwitter>
                    </p>
                    </div>
                    <p>Twitter</p>
                </div>
                <div>
                <div className="rounded-full p-3 bg-stone">
                <p>
                    <FaFacebookF></FaFacebookF>
                </p>
                </div>
                   <p>Facebook</p>
                </div>
            </div>
        </div>
    )
}