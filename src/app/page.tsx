"use client";

import Image from "next/image";
import Footer from "./components/footer";
import Header from "./components/header";
import { ArrowUpRight } from "lucide-react";
import React from "react";
import Link from "next/link";
import { getAllEvents, getGalleryById } from "./api";

export default function Home() {
  const [bgImageParams, setBgImageParams] = React.useState({
    width: 1484,
    height: 722,
  });
  const [calendarImage, setCalendarImage] = React.useState(
    "/CalendarBGImage.png"
  );
  const [events, setEvents] = React.useState<any[]>([]);
  const [gallery, setGallery] = React.useState<any>(null);

  React.useEffect(() => {
    if (window.innerWidth <= 768) {
      setCalendarImage("/CalendarBGMobile.png");
      setBgImageParams({ width: 384, height: 362 });
    }
  }, []);

  React.useEffect(() => {
    const load = async () => {
      try {
        const res = await getAllEvents();
        const list = res.data.data || [];
        setEvents(list.slice(0, 4));
      } catch (_) {}
    };
    load();

    const loadGallery = async () => {
      try {
        const res = await getGalleryById("692717d55f3bd41a441f0db7");
        console.log(res.data.data);
        setGallery(res.data.data);
      } catch (_) {}
    };
    loadGallery();
  }, []);

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = String(d.getFullYear()).slice(-2);
      return `${day}.${month}.${year}`;
    } catch {
      return dateStr;
    }
  };
  return (
    <div className="">
      <main className="w-screen px-5 sm:px-20">
        <div className="h-50svh sm:h-lvh w-100 flex items-center justify-center">
          <Image
            src="/CachoyBache.svg"
            alt="Cacho y Bache logo"
            width={460}
            height={220}
          />
        </div>
        <div className="grid grid-cols-12 gap-6 py-12">
          {events[0] && (
            <div className="col-span-12 lg:col-span-6">
              <div
                className="w-full aspect-[2/1] bg-cover bg-center"
                style={{ backgroundImage: `url(${events[0].cover})` }}
              />
              <p className="mt-2 text-sm italic">{events[0].location || ""}</p>
              <Link
                href={`/eventos/${encodeURIComponent(events[0]._id.$oid)}`}
                className="block group"
              >
                <p className="mt-1 font-semibold group-hover:underline flex items-center gap-1">
                  {events[0].title} <ArrowUpRight className="inline h-4 w-4" />
                </p>
              </Link>
            </div>
          )}
          {events[1] && (
            <div className="col-span-12 lg:col-span-6">
              <div
                className="w-full aspect-[2/1] bg-cover bg-center"
                style={{ backgroundImage: `url(${events[1].cover})` }}
              />
              <p className="mt-2 text-sm italic">
                {formatDate(events[1].date)}
              </p>
              <Link
                href={`/eventos/${encodeURIComponent(events[1]._id.$oid)}`}
                className="block group"
              >
                <p className="mt-1 font-semibold group-hover:underline flex items-center gap-1">
                  {events[1].title} <ArrowUpRight className="inline h-4 w-4" />
                </p>
              </Link>
            </div>
          )}

          <div className="col-span-12">
            <Link href="/eventos" className="relative block">
              <div
                className="w-full aspect-[2/1] bg-cover bg-center max-h-[400px]"
                style={{
                  backgroundImage: `url(${
                    events[2]?.cover || "/CalendarBGImage.png"
                  })`,
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-600/80">
                <p className="text-white text-3xl sm:text-4xl font-bold text-center">
                  CALENDARIO DE EVENTOS
                </p>
                <p className="text-white text-xl sm:text-2xl font-light flex items-center">
                  CONOCE A LOS CREATIVXS <ArrowUpRight className="ml-1" />
                </p>
              </div>
            </Link>
          </div>

          {gallery && (
            <div className="col-span-12 lg:col-span-6">
              <div
                className="w-full aspect-[2/1] bg-cover bg-center"
                style={{ backgroundImage: `url(${gallery.cover})` }}
              />
              <p className="mt-2 text-sm italic">{gallery.location || ""}</p>
              <Link href="/galeria" className="block group">
                <p className="mt-1 font-semibold group-hover:underline flex items-center gap-1">
                  {gallery.title} <ArrowUpRight className="inline h-4 w-4" />
                </p>
              </Link>
            </div>
          )}
          {events[3] && (
            <div className="col-span-12 lg:col-span-6">
              <div
                className="w-full aspect-[2/1] bg-cover bg-center"
                style={{ backgroundImage: `url(${events[3].cover})` }}
              />
              <p className="mt-2 text-sm italic">
                {formatDate(events[3].date)}
              </p>
              <Link
                href={`/eventos/${encodeURIComponent(events[3]._id.$oid)}`}
                className="block group"
              >
                <p className="mt-1 font-semibold group-hover:underline flex items-center gap-1">
                  {events[3].title} <ArrowUpRight className="inline h-4 w-4" />
                </p>
              </Link>
            </div>
          )}
        </div>
        {/*
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
          */}
      </main>
    </div>
  );
}
