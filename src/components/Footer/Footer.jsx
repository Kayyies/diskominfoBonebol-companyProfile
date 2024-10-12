import { MdEmail } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";
import { footerItem } from "@/data/footerItem";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="bg-gradient-to-b from-[#F5F4F4] to-[#EDF1FD] pt-12 dark:bg-gradient-to-b dark:from-[#0c1124] dark:via-[#1D2956] dark:to-[#2E418A]">
      <footer className="container footer mx-auto px-40 dark:text-white">
        <aside className="flex flex-col gap-4">
          <Image
            src="/diskominfo.png"
            width={170}
            height={100}
            alt=""
            className="pb-3"
          />
          <p className="flex items-center gap-2">
            <span>
              <MdEmail />
            </span>
            diskominfo@bonebolangokab.go.id
          </p>
          <p className="flex items-center gap-2">
            <span>
              <IoLogoWhatsapp />
            </span>
            +62 813-5456-6895 (Whatsapp)
          </p>
        </aside>
        {footerItem.map((item, index) => (
          <nav key={index}>
            <h6 className="footer-title">{item.title}</h6>
            {item.tautans.map((tautan, index) => (
              <div key={index} className="flex flex-col pb-1">
                <a
                  className="font-medium  transition-all hover:text-blue-400"
                  href={tautan.url}
                >
                  {tautan.name}
                </a>
              </div>
            ))}
          </nav>
        ))}

        {/* bottom image */}
      </footer>
      <div className="text-bluePrimary container mx-auto mt-36 flex items-center justify-between px-40 pb-16 dark:text-white">
        <div>
          <p className="text-md pb-5 font-semibold uppercase ">Layanan Kami</p>
          <div className="flex items-center gap-5">
            <Image src="/logoFooter1.png" alt="aa" width={150} height={100} />
            <Image src="/logoFooter2.png" alt="aa" width={160} height={100} />
            <Image src="/logoFooter3.png" alt="aa" width={200} height={100} />
          </div>
        </div>
        <div>
          <p className="text-md pb-5 font-semibold uppercase">
            Portal Resmi Bone Bolango
          </p>
          <Image src="/logoFooter4.png" alt="aa" width={50} height={100} />
        </div>
      </div>
      <p className="text-bluePrimary container mx-auto pb-5 text-center text-xs dark:text-white">
        Made with love ❤️ by Zulhamd Kayyies Podungge
      </p>
    </div>
  );
}
