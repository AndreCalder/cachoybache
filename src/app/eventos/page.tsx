"use client";

import React from "react";
import { getCreativxs, getEvents } from "../api";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

function Eventos() {
  const [events, setEvents] = React.useState<any[]>([]);
  const [creativxs, setCreativxs] = React.useState<any[]>([]);
  const [checkedIndex, setCheckedIndex] = React.useState<number>(-1);
  const [filterId, setFilterId] = React.useState<string>("");

  const getData = async () => {
    const eventsRes = await getEvents(
      checkedIndex == -1 ? undefined : creativxs[checkedIndex]._id.$oid
    );
    const creativxsRes = await getCreativxs();
    setEvents(eventsRes.data.data);
    setCreativxs(creativxsRes.data);
  };

  const check = (index: number) => {
    setCheckedIndex(index);
  };

  React.useEffect(() => {
    getData();
  }, [checkedIndex]);
  return (
    <div className="w-full pt-24 h-svh flex flex-col">
      <div
        className={`w-full min-h-24 px-5 md:px-12 flex items-center justify-start py-8 border-b-4 border-black`}
      >
        <div className="flex flex-col gap-2">
          <p className="font-lighter acumin">ESTA EDICIÓN</p>
          <p className="tracking-[0.3em] font-bold sm:text-3xl acumin italic">
            CALENDARIO DE EVENTOS
          </p>
        </div>
      </div>
      <div className="w-full flex-1 grid grid-cols-12">
        <div className="col-span-12 md:col-span-4 border-b-[2px] md:border-b-0 border-r-0 md:border-r-2 border-black  py-5 px-5 md:pl-12">
          <p className="tracking-[0.3em] font-bold sm:text-3xl acumin italic">
            LXS CREATIVXS
          </p>

          <p className="font-lighter acumin italic">
            Filtra por evento / creativx
          </p>
          <div className="flex items-center space-x-2 py-2">
            <Checkbox
              className="border-black data-[state=checked]:bg-black rounded-none "
              checked={checkedIndex == -1}
              onCheckedChange={(e) => {
                check(-1);
              }}
            />
            <label
              htmlFor="terms"
              className="text-sm font-extralight leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ocrb"
            >
              Todos los eventos
            </label>
          </div>
          {creativxs.map((creativx, index) => (
            <div key={index} className="flex items-center space-x-2 py-2">
              <Checkbox
                className="border-black data-[state=checked]:bg-black rounded-none"
                checked={checkedIndex == index}
                onCheckedChange={(e) => {
                  check(index);
                }}
              />
              <label
                htmlFor="terms"
                className="text-sm font-extralight leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ocrb"
              >
                {creativx.name}
              </label>
            </div>
          ))}
        </div>
        <div className="col-span-12 md:col-span-8 ">
          {events
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            )
            .map((event, index) => (
              <Link
                key={index}
                href={`/eventos/${event._id.$oid}`}
                className="w-full flex items-center px-5 gap-x-4 py-2 border-b-[2px] border-black cursor-pointer"
              >
                <p className="text-[#ED1C1D] font-bold acumin">
                  {new Date(event.date)
                    .toLocaleDateString("es-MX", { day: "2-digit" })
                    .toUpperCase()}
                  <br />
                  {new Date(event.date)
                    .toLocaleDateString("es-MX", { month: "short" })
                    .toUpperCase()}
                </p>
                <p className="text-xl font-bold italic acumin">{event.title}</p>
                <p className="text-xl font-light acumin">{event.location}</p>
                <div className="text-sm text-right text-gray-600">
                  {event.creativxs && event.creativxs.length > 0
                    ? event.creativxs.map((c: any) => c.name).join(", ")
                    : "Por definir.."}
                </div>
              </Link>
            ))}
          {events.length === 0 && (
            <div className="w-full flex items-center justify-center h-full">
              <p className="text-xl font-bold italic acumin">No hay eventos</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Eventos;
