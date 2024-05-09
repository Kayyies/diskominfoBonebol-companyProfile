import { MdEmail } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";
import { footerItem } from "@/data/footerItem";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="bg-[#EDF1FD] pt-12">
      <footer className="container mx-auto px-40 footer bg-[#EDF1FD] text-base-content">
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
                  className="text-gray-500 font-medium hover:text-blue-400 transition-all"
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
      <div className="container mx-auto px-40 mt-36 pb-16 flex justify-between items-center">
        <div>
          <p className="text-gray-500 font-semibold text-md pb-5 uppercase">
            Layanan Kami
          </p>
          <div className="flex gap-5 items-center">
            <Image src="/logoFooter1.png" alt="aa" width={150} height={100} />
            <Image src="/logoFooter2.png" alt="aa" width={160} height={100} />
            <Image src="/logoFooter3.png" alt="aa" width={200} height={100} />
          </div>
        </div>
        <div>
          <p className="text-gray-500 font-semibold text-md pb-5 uppercase">
            Portal Resmi Bone Bolango
          </p>
          <Image src="/logoFooter4.png" alt="aa" width={50} height={100} />
        </div>
      </div>
      <p className="container mx-auto text-xs text-center pb-5 text-gray-500">
        Made with love ❤️ by Zulhamd Kayyies Podungge
      </p>
    </div>
  );
}
