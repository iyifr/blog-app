import Link from "next/link";
import styles from "../styles/Navbar.module.css";

function Navbar() {
  return (
    <div className = "flex items-center space-x-3 mx-auto max-w-7xl">
      <div className="max-h-60 w-1/3 cursor-pointer pt-0">
        <Link href = "/" >
            <img 
            src="https://images-platform.99static.com//TNbMwuUlICajzNyWw9Prp2nuNvc=/204x202:755x753/fit-in/500x500/99designs-contests-attachments/96/96205/attachment_96205491"
            alt="logo"
            className="w-36 
            md:w-36
             lg:w-40 
             xl:w-48 
             object-contain" />
        </Link>
      </div>

      <div className="w-2/3 hidden md:inline-flex justify-start space-x-8 ">
        <h3 className="after:w-0 after:h-[2px] after:bg-orange-500 after:block cursor-pointer
         after:duration-0 hover:after:duration-500 hover:after:w-full">HOME</h3>

        <h3 className="after:w-0 after:h-[2px] after:bg-orange-500 after:block cursor-pointer 
         after:duration-0 hover:after:duration-500 hover:after:w-full ">BLOG</h3>

        <h3 className="after:w-0 after:h-[2px] after:bg-orange-500 after:block cursor-pointer
       after:duration-0 hover:after:duration-700 hover:after:w-full ">PAGES</h3>
        
        <h3 className="after:w-0 after:h-[2px] after:bg-orange-500 after:block cursor-pointer
        after:duration-0 hover:after:duration-700 hover:after:w-full"> ABOUT </h3>

        <h3 className="after:w-0 after:h-[2px] after:bg-orange-500 after:block cursor-pointer
         after:duration-0 hover:after:duration-1000 hover:after:w-full "> CONTACT </h3>
      </div>

      <div className="w-1/3 justify-center">
        kala
      </div>
    </div>
  )
}

export default Navbar
