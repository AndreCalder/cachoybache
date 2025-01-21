"use client";

import Image from "next/image";
import Footer from "./components/footer";
import Header from "./components/header";
import { ArrowUpRight } from "lucide-react";
import React from "react";

export default function Home() {

  const [bgImageParams, setBgImageParams] = React.useState({width: 1484, height: 722})
  const [calendarImage, setCalendarImage] = React.useState("/CalendarBGImage.png");
  
  React.useEffect(() => {
    if (window.innerWidth <= 768) {
      setCalendarImage("/CalendarBGMobile.png")
      setBgImageParams({width:384, height: 362 })
  }
  }, [])
  return (
    <div className="pt-16">
      <main className="w-screen px-5 sm:px-20">
        <div className="h-50svh sm:h-lvh w-100 flex items-center justify-center">
          <Image
            src="/CachoyBache.svg"
            alt="Cacho y Bache logo"
            width={543}
            height={252}
          />
        </div>
        <div id="calendarBanner" className="w-100 h-fit relative z-10">
          <Image
            className="z-10"
            src={calendarImage}
            alt="Calendario"
            width={bgImageParams.width}
            height={bgImageParams.height}
          />
          <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center">
            <p className="text-white text-4xl font-bold">
              CALENDARIO DE EVENTOS
            </p>
            <p className="text-white text-2xl font-light flex items-center">
              CONOCE A LOS CREATIVXS
              <ArrowUpRight />
            </p>
          </div>
        </div>
      </main>

    </div>
  );
}
