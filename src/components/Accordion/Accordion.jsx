"use client";
import React from "react";

const Accordion = ({ title, subtitles, onClick, isActive }) => {
    return (
        <div className="w-full xl:w-p8">
            <div className="collapse collapse-arrow">
                <input type="checkbox" name="my-accordion-4" defaultChecked={isActive} />
                <div className="collapse-title text-md font-bold">{title}</div>
                <div className="collapse-content">
                    {subtitles.map((subtitle, index) => (
                        <a
                            key={index}
                            className="flex flex-row py-1 hover:text-[0C62F7] text-sm cursor-pointer"
                            onClick={() => onClick(`section-${index + 1}`)}
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
