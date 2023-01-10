import Link from "next/link";
import styles from "../styles/Navbar.module.css";

function Navbar() {
  return (
    <div className = "flex items-center space-x-5mx-0">
      <div className="max-h-60 w-1/3 cursor-pointer pt-0">
        <Link href = "/" >
            <img 
            src="https://images-platform.99static.com//TNbMwuUlICajzNyWw9Prp2nuNvc=/204x202:755x753/fit-in/500x500/99designs-contests-attachments/96/96205/attachment_96205491"
            alt="logo"
            className="w-36 h-24 
            md:w-36 md:h-32
             lg:w-40 lg:h-40
             xl:w-48 xl:h-48 
             object-contain" />
        </Link>
      </div>

      <div className="w-2/3 hidden md:inline-flex justify-center space-x-8 ">
        <h3 className="">HOME</h3>
        <h3 className="">BLOG</h3>
        <h3 className="">PAGES</h3>
        <h3 className="">ABOUT</h3>
        <h3 className="">CONTACT</h3>
      </div>

      <div className="w-1/3 justify-center">
        kala
      </div>
    </div>
  )
}

export default Navbar
