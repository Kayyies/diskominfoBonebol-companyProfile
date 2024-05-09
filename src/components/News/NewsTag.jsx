//assets
import { IoPerson } from "react-icons/io5";
import { PiTagChevronFill } from "react-icons/pi";
import { BsCalendarDateFill } from "react-icons/bs";

export default function NewsTag({ author, category, date }) {
  return (
    <div>
      <div className="flex flex-wrap gap-2 lg:gap-5 text-xs">
        <p className="flex items-center gap-2">
          <span>
            <IoPerson />
          </span>
          {author}
        </p>
        <p className="flex items-center gap-2">
          <span>
            <PiTagChevronFill />
          </span>
          {category}
        </p>
        <p className="flex items-center gap-2">
          <span>
            <BsCalendarDateFill />
          </span>
          {date}
        </p>
      </div>
    </div>
  );
}
