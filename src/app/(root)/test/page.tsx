"use client";
import React, { useState } from "react";

const CardSlider = () => {
  return (
    <div>
      <iframe src="/assets/bonebol-sepekan.pdf" width="100%" height="500px">
        PDF tidak dapat ditampilkan.
        <a
          href="/assets/bonebol-sepekan.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Klik di sini
        </a>{" "}
        untuk mengunduh dokumen.
      </iframe>
    </div>
  );
};

export default CardSlider;
