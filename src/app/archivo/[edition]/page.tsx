"use client";

import { getEdition } from "@/app/api";
import Subtitle from "@/app/components/subtitle";
import { MoveLeftIcon, MoveRightIcon, X, XIcon } from "lucide-react";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";

function Edition() {
  const params = useParams();
  const { edition } = params;
  const searchParams = useSearchParams();

  const portada = searchParams.get("portada")?.toString();

  const [editionData, setEditionData] = React.useState<any>(null);

  const allImages = [
    {
      src: "/ediciones/primeraedición/1.png",
      w: 160,
      h: 214,
    },
    {
      src: "/ediciones/primeraedición/2.png",
      w: 162,
      h: 214,
    },
    {
      src: "/ediciones/primeraedición/3.png",
      w: 160,
      h: 214,
    },
    {
      src: "/ediciones/primeraedición/4.png",
      w: 321,
      h: 214,
    },
    {
      src: "/ediciones/primeraedición/5.png",
      w: 160,
      h: 214,
    },
    {
      src: "/ediciones/primeraedición/6.png",
      w: 160,
      h: 214,
    },
    {
      src: "/ediciones/primeraedición/7.png",
      w: 160,
      h: 214,
    },
    {
      src: "/ediciones/primeraedición/8.png",
      w: 160,
      h: 214,
    },
    {
      src: "/ediciones/primeraedición/9.png",
      w: 160,
      h: 214,
    },
    {
      src: "/ediciones/primeraedición/10.png",
      w: 160,
      h: 214,
    },
    {
      src: "/ediciones/primeraedición/11.png",
      w: 160,
      h: 214,
    },
    {
      src: "/ediciones/primeraedición/12.png",
      w: 160,
      h: 214,
    },
    {
      src: "/ediciones/primeraedición/13.png",
      w: 160,
      h: 214,
    },
    {
      src: "/ediciones/primeraedición/14.png",
      w: 160,
      h: 214,
    },
    {
      src: "/ediciones/primeraedición/15.png",
      w: 160,
      h: 214,
    },
    {
      src: "/ediciones/primeraedición/16.png",
      w: 160,
      h: 214,
    },
    {
      src: "/ediciones/primeraedición/17.png",
      w: 160,
      h: 214,
    },
    {
      src: "/ediciones/primeraedición/18.png",
      w: 160,
      h: 214,
    },
    {
      src: "/ediciones/primeraedición/19.png",
      w: 160,
      h: 214,
    },
    {
      src: "/ediciones/primeraedición/20.png",
      w: 160,
      h: 214,
    },
    {
      src: "/ediciones/primeraedición/21.png",
      w: 160,
      h: 214,
    },
    {
      src: "/ediciones/primeraedición/22.png",
      w: 160,
      h: 214,
    },
    {
      src: "/ediciones/primeraedición/23.png",
      w: 160,
      h: 214,
    },
    {
      src: "/ediciones/primeraedición/24.png",
      w: 160,
      h: 214,
    },
    {
      src: "/ediciones/primeraedición/25.png",
      w: 160,
      h: 214,
    },
    {
      src: "/ediciones/primeraedición/26.png",
      w: 160,
      h: 214,
    },
    {
      src: "/ediciones/primeraedición/27.png",
      w: 160,
      h: 214,
    },
    {
      src: "/ediciones/primeraedición/28.png",
      w: 160,
      h: 214,
    },
    {
      src: "/ediciones/primeraedición/29.png",
      w: 160,
      h: 214,
    },
    {
      src: "/ediciones/primeraedición/30.png",
      w: 160,
      h: 214,
    },
    {
      src: "/ediciones/primeraedición/31.png",
      w: 160,
      h: 214,
    },
    {
      src: "/ediciones/primeraedición/32.png",
      w: 160,
      h: 214,
    },
  ];

  const [lightBoxActive, setLightBoxActive] = React.useState<boolean>(false);
  const [activeImage, setActiveImage] = React.useState<number>(0);

  const handleImageClick = (image: number) => {
    setActiveImage(image);
    setLightBoxActive(true);
  };

  const getData = async () => {
    if (edition) {
      const res = await getEdition(edition.toString());
      setEditionData(res.data);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <main className="w-screen pt-24">
      {editionData && (
        <>
          <Subtitle
            subtitle="ARCHIVO"
            classes="border-b-2 border-solid border-black"
          />
          {editionData.gallery && (
            <div
              className={`fixed top-0 bottom-0 left-0 right-0 bg-black/50 z-50 flex justify-center items-center ${
                !lightBoxActive ? "hidden" : ""
              }`}
            >
              {lightBoxActive && (
                <div className="flex z-50 items-center gap-5">
                  <MoveLeftIcon
                    className="w-10 h-10 cursor-pointer text-white"
                    onClick={() => {
                      if (activeImage > 0) {
                        setActiveImage(activeImage - 1);
                      } else {
                        setActiveImage(editionData.gallery.length - 1);
                      }
                    }}
                  />

                  <div className="w-full md:w-[603px] h-fit min-h-64 bg-black p-5 grid grid-cols-12 relative">
                    <XIcon
                      className="w-6 h-6 cursor-pointer text-white absolute top-5 right-5"
                      onClick={() => setLightBoxActive(false)}
                    />
                    <div className="col-span-12 md:col-span-7">
                      <Image
                        src={editionData.gallery[activeImage].url}
                        alt="activeImage"
                        width={300}
                        height={300}
                      />
                    </div>
                    <div className="col-span-12 md:col-span-5 flex flex-col justify-end">
                      <h1 className="text-sm text-white font-light italic">
                        {editionData.gallery[activeImage].title}
                      </h1>
                      <p className="text-xs text-white">
                        / Fotografía por{" "}
                        {editionData.gallery[activeImage].author}
                      </p>
                      <p className="text-xs text-white">
                        // Sección "{editionData.gallery[activeImage].section}"
                      </p>
                    </div>
                  </div>
                  <MoveRightIcon
                    className="w-10 h-10 cursor-pointer text-white"
                    onClick={() => {
                      if (activeImage < editionData.gallery.length - 1) {
                        setActiveImage(activeImage + 1);
                      } else {
                        setActiveImage(0);
                      }
                    }}
                  />
                </div>
              )}
            </div>
          )}
          <div className="w-full px-5 md:px-12 flex items-center gap-5 py-6">
            <p className="text-2xl font-bold tracking-[0.6rem]">
              {editionData.subtitle.toUpperCase()}
            </p>
            <div className="flex-1 h-[2px] bg-black"></div>
            <p className="text-2xl font-bold tracking-[0.6rem]">
              {editionData.title.toUpperCase()}
            </p>
          </div>
          {portada != null && (
            <div className="w-full grid grid-cols-12 md:px-12 pb-6 gap-2">
              <div
                className="col-span-12 lg:col-span-4 min-h-60 flex items-center justify-center py-3"
                style={{ backgroundColor: editionData.covers[portada].bgColor }}
              >
                <Image
                  className="h-fit"
                  src={editionData.covers[portada].url}
                  alt={portada}
                  width={200}
                  height={300}
                />
              </div>
              {editionData.gallery.length > 0 && (
                <div className="col-span-12 lg:col-span-8 flex flex-wrap justify-between gap-2">
                  {editionData.gallery
                    .slice(0, 11)
                    .map((image: { url: any }, index: number) => {
                      return (
                        <img
                          className={`h-[126px] cursor-pointer transition-all object-contain hover:scale-105 aspect-auto`}
                          src={image.url || ""}
                          alt={`image-${index}`}
                          onClick={() => handleImageClick(index)}
                          key={index}
                        />
                      );
                    })}
                </div>
              )}
              {editionData.gallery.length > 11 && (
                <div className="col-span-12 flex flex-wrap justify-between gap-2">
                  {editionData.gallery
                    .slice(11)
                    .map((image: { url: any }, index: number) => {
                      return (
                        <img
                          className={`h-[126px] cursor-pointer transition-all object-contain hover:scale-105 aspect-auto`}
                          src={image.url || ""}
                          alt={`image-${index}`}
                          onClick={() => handleImageClick(index)}
                          key={index}
                        />
                      );
                    })}
                </div>
              )}
            </div>
          )}
          <div className="w-full flex flex-col px-5 py-3 gap-y-1 md:px-12 min-h-40">
            <p className="text-3xl font-bold italic">PORTADAS</p>
            <p className="italic">{editionData.credits}</p>
          </div>
        </>
      )}
    </main>
  );
}

export default Edition;
