"use client";
import React from "react";

const Accordion = ({ title, subtitles, onClick }) => {
  return (
    <div className="">
      <div className="join join-vertical w-98 mb-3">
        <div className="collapse collapse-arrow  border border-base-300 bg-base-100">
          <input type="checkbox" name="my-accordion-4" defaultChecked />
          <div className="collapse-title text-md font-bold">{title}</div>
          <div className="collapse-content">
            {subtitles.map((subtitle, index) => (
              <a
                key={index}
                className="flex flex-row py-1 hover:text-blue-500 text-sm cursor-pointer"
                onClick={() => onClick(`section-${index + 1}`)}
              >
                {subtitle}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
