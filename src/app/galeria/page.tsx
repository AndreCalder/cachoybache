"use client";

import { getGalleryById } from "@/app/api";
import { Card } from "@/components/ui/card";
import { MoveLeftIcon, MoveRightIcon, XIcon } from "lucide-react";
import React from "react";
import Image from "next/image";

function Galeria() {
  const [galleryData, setGalleryData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [lightBoxActive, setLightBoxActive] = React.useState(false);
  const [activeMedia, setActiveMedia] = React.useState(0);

  const getGalleryData = async () => {
    const res = await getGalleryById("692717d55f3bd41a441f0db7".toString());
    setGalleryData(res.data.data);
  };

  React.useEffect(() => {
    getGalleryData();
    setLoading(false);

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightBoxActive(false);
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <div className="w-full pt-24 h-svh flex flex-col">
      {galleryData != null && galleryData.images?.length > 0 && (
        <div
          className={`fixed top-0 bottom-0 left-0 right-0 bg-black/50 z-50 flex justify-center items-center ${
            !lightBoxActive ? "hidden" : ""
          }`}
        >
          <XIcon
            className="w-10 h-10 cursor-pointer text-white fixed top-5 right-5"
            onClick={() => setLightBoxActive(false)}
          />
          <div className="flex z-50 items-center gap-5">
            <MoveLeftIcon
              className="w-10 h-10 cursor-pointer text-white"
              onClick={() => {
                if (activeMedia > 0) {
                  setActiveMedia(activeMedia - 1);
                } else {
                  setActiveMedia(galleryData.images.length - 1);
                }
              }}
            />
            <div className="bg-transparent p-5">
              {
                <Image
                  src={galleryData.images[activeMedia].url}
                  alt="activeImage"
                  width={600}
                  height={500}
                />
              }
            </div>
            <MoveRightIcon
              className="w-10 h-10 cursor-pointer text-white"
              onClick={() => {
                if (activeMedia < galleryData.images.length - 1) {
                  setActiveMedia(activeMedia + 1);
                } else {
                  setActiveMedia(0);
                }
              }}
            />
          </div>
        </div>
      )}
      {!loading && galleryData != null && (
        <>
          <div
            className={`w-full min-h-24 px-5 md:px-12 flex items-center justify-start py-8 border-b-4 border-black`}
          >
            <div className="flex flex-col gap-2">
              <p className="tracking-[0.3em] font-bold sm:text-3xl acumin italic">
                {galleryData.title}
              </p>
              {galleryData.date && (
                <p className="text-sm text-gray-600">{galleryData.date}</p>
              )}
              {galleryData.location && (
                <p className="text-sm text-gray-600">
                  📍 {galleryData.location}
                </p>
              )}
              {galleryData.creativxs && galleryData.creativxs.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm font-semibold ocrb">Creativxs:</p>
                  <p className="text-sm text-gray-600">
                    {galleryData.creativxs.map((c: any) => c.name).join(", ")}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="w-full h-96 overflow-y-scroll grid grid-cols-12">
            {galleryData?.images?.map((media: any, index: number) => (
              <div
                key={index}
                className="col-span-12 md:col-span-4 lg:col-span-3 gap-y-4 flex flex-col p-5 items-center justify-center cursor-pointer"
              >
                <div
                  onClick={() => {
                    setActiveMedia(index);
                    setLightBoxActive(true);
                  }}
                  className="h-40 w-full rounded-md"
                  style={{
                    backgroundImage: `url(${media.url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Galeria;
