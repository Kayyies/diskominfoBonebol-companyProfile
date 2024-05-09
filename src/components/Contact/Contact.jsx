import { KontakKami } from "@/data/KontakKami";
import { MdEmail } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";

export default function Contact() {
  return (
    <div className="card w-98 bg-base-100 border border-base-300 mt-10">
      {KontakKami.map((item, index) => (
        <div className="card-body" key={index}>
          <h2 className="card-title">Kontak Kami</h2>
          <p className="flex items-center gap-2">
            <span>
              <MdEmail />
            </span>
            {item.email}
          </p>
          <p className="flex items-center gap-2">
            <span>
              <IoLogoWhatsapp />
            </span>
            {item.phone}
          </p>
        </div>
      ))}
    </div>
  );
}
