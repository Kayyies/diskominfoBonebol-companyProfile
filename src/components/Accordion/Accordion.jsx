"use client";
import Link from "next/link";
import React from "react";

const Accordion = ({ topic, title, subtitles, onClick, isActive }) => {
  return (
    <div className="xl:w-p8 w-full">
      <div className="collapse collapse-arrow">
        <input type="radio" name="my-accordion-4" defaultChecked={isActive} />
        <div className="text-md collapse-title font-bold">{title}</div>
        <div className="collapse-content">
          {subtitles.map((subtitle, index) => (
            <a
              key={index}
              className="flex cursor-pointer flex-row py-1 text-sm hover:text-[0C62F7]"
              onClick={() => onClick(topic, subtitle)}
            >
              {subtitle}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
