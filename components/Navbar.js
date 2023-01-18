import Link from "next/link";
import { FaFacebookF, FaTwitter , FaInstagram, FaSearch , FaDribbble} from "react-icons/fa";




function Navbar() {
  return (
    <div className = "flex items-center space-x-3 mx-auto max-w-8xl mb-6">
      <div className="max-h-60 w-1/3 cursor-pointer pt-0">
        <Link href = "/" >
            <img 
            src= "https://images-platform.99static.com//TNbMwuUlICajzNyWw9Prp2nuNvc=/204x202:755x753/fit-in/500x500/99designs-contests-attachments/96/96205/attachment_96205491"
            alt="logo"
            className="w-36 h-40
            md:w-36
             lg:w-40 
             xl:w-48 
             object-contain" />
        </Link>
      </div>

      <div className="w-2/3 hidden md:inline-flex justify-start space-x-8 text-md text-slate-700">
        <h3 className="after:w-0 after:h-[2px] after:bg-lime-600 after:block cursor-pointer
         after:duration-0 hover:after:duration-500 hover:after:w-full">HOME</h3>

        <h3 className="after:w-0 after:h-[2px] after:bg-emerald-300 after:block cursor-pointer 
         after:duration-0 hover:after:duration-500 hover:after:w-full ">TOPICS</h3>

        <h3 className="after:w-0 after:h-[2px] after:bg-blue-500 after:block cursor-pointer
       after:duration-0 hover:after:duration-700 hover:after:w-full ">AUTHORS</h3>
        
        <h3 className="after:w-0 after:h-[2px] after:bg-teal-400 after:block cursor-pointer
        after:duration-0 hover:after:duration-700 hover:after:w-full"> ABOUT</h3>

      </div>

      <div className="w-1/3 inline-flex space-x-5">
        <FaSearch className="mr-5 min-w-[10%]" />
        <FaFacebookF className="hover:text-[#1773ea] min-w-[8.5%] cursor-pointer " />
        <FaTwitter className="hover:text-[#1c96e8] min-w-[8.5%] cursor-pointer"/>
        <FaInstagram className = "hover:text-red-500 min-w-[8.5%] cursor-pointer"/>
        <FaDribbble className="hover:text-orange-400 min-w-[8.5%] cursor-pointer"/>
      </div>
    </div>
  )
}

export default Navbar
