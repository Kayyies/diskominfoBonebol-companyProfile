"use client";

import React from "react";
import { DokumenText } from "@/data/DokumenText";

export default function Table({ activeSection }) {
  // Find the corresponding content based on the active section
  console.log("Active Section in Table:", activeSection);

  // Find the corresponding content based on the active section
  const activeContent = DokumenText.find(
    (section) => section.id === activeSection
  );

  console.log("Active Content in Table:", activeContent);

  if (!activeContent) {
    console.log("No Active Content");
    return null; // or render a default state
  }

  return (
    <div className="overflow-x-auto container">
      <h1 className="font-bold text-4xl mb-10">{activeContent.title}</h1>
      <table className="table table-md">
        <thead>
          <tr>
            <th>No</th>
            <th>Judul</th>
            <th>Publisher</th>
            <th>Tahun</th>
            <th>Tanggal Arsip</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {activeContent.content.map((item, i) => (
            <tr key={i} className="hover">
              <th className="text-xs">{i + 1}</th>
              <td className="line-clamp-2 overflow-hidden text-xs">
                {item.tableTitle}
              </td>
              <td className="text-xs">{item.tablePublisher}</td>
              <td className="text-xs">{item.tableYear}</td>
              <td className="text-xs">{item.tableDate}</td>
              <td>
                <a href={item.file} className="btn btn-xs btn-active">
                  Unduh
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
