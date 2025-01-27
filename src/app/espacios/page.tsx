"use client";

import React, { useMemo } from 'react'
import Subtitle from '../components/subtitle'
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

function POS() {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || "",
  });

  const center = useMemo(() => ({
    lat: 19.35468182249694,
    lng: -99.15943535582053
  }), []);

  return (
    <div className="min-h-screen h-fit salespoints pt-24">
      <Subtitle subtitle="ESPACIOS DE VENTA" classes="salespoints border-b-2 border-solid border-yellow-300" />
      <div className="grid grid-cols-12 w-screen py-5 px-5 md:px-12">
        <div className="col-span-12 sm:col-span-6 py-6 flex flex-col justify-center gap-y-6">
          <p className="text-4xl font-black">
            CDMX
          </p>
          <div className="grid grid-cols-12 lg:grid-cols-12 tracking-[0.2em] lg:gap-x-6 xl:gap-x-12 flex-1">
            <div className="col-span-12 lg:col-span-6 xl:col-span-4 gap-y-4 ">
              <div className="container py-3">
                <div className='w-100 font-bold text-xl items-center leading-4 pb-2 flex justify-between'>
                  <span>E</span>
                  <span>x</span>
                  <span>i</span>
                  <span>t</span>
                  <span> </span>
                  <span> </span>
                  <span>L</span>
                  <span>a</span>
                  <span> </span>
                  <span> </span>
                  <span>L</span>
                  <span>i</span>
                  <span>b</span>
                  <span>r</span>
                  <span>e</span>
                  <span>r</span>
                  <span>í</span>
                  <span>a</span>
                </div>
                <p className='w-100 text-xs font-thin text-justify'>Río Pánuco 215, Cuauhtémoc.</p>
                <div className="flex justify-between text-md font-thin p">
                  <span>0</span>
                  <span>6</span>
                  <span>5</span>
                  <span>0</span>
                  <span>0</span>
                </div>
              </div>
              <div className="container py-3">
                <div className='w-100 font-bold text-xl items-center leading-4 pb-2 flex justify-between'>
                  <span>E</span>
                  <span>x</span>
                  <span>t</span>
                  <span>r</span>
                  <span>a</span>
                  <span> </span>
                  <span>E</span>
                  <span>x</span>
                  <span>t</span>
                  <span>r</span>
                  <span>a</span>
                </div>
                <p className='w-100 text-xs font-thin text-justify'>Morena 1312,
                  Narvarte CDMX.</p>
              </div>
              <div className="container py-3">
                <p className='w-100 font-bold text-xl items-center leading-4 pb-2 flex justify-between'>
                  <span>L</span>
                  <span>a</span>
                  <span> </span>
                  <span>F</span>
                  <span>i</span>
                  <span>e</span>
                  <span>r</span>
                  <span>a</span>
                </p>
                <p className='w-100 text-xs font-thin text-justidy'>Calle París 101,
                  Del Carmen,
                  Coyoacán. 04100
                </p>
              </div>
              <div className="container py-3">
                <p className='w-100 font-bold text-xl items-center leading-4 pb-2 flex justify-between'>
                  <span>C</span>
                  <span>a</span>
                  <span>s</span>
                  <span>a</span>
                  <span> </span>
                  <span>B</span>
                  <span>o</span>
                  <span>s</span>
                  <span>q</span>
                  <span>u</span>
                  <span>e</span>
                  <span>s</span>
                </p>
                <p className='w-100 text-xs font-thin text-justify'>
                  Córdoba 25,
                  Roma Norte.
                </p>
                <div className="flex justify-between text-md font-thin">
                  <span>0</span>
                  <span>6</span>
                  <span>7</span>
                  <span>0</span>
                  <span>0</span>
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-6 xl:col-span-4 gap-y-4">
              <div className="container py-3">
                <div className='w-100 font-bold text-xl items-center leading-4 pb-2 flex justify-between'>
                  <span>R</span>
                  <span>r</span>
                  <span>e</span>
                  <span>t</span>
                  <span>i</span>
                  <span>e</span>
                  <span>m</span>
                  <span>b</span>
                  <span>l</span>
                  <span>e</span>
                </div>
                <p className='w-100 text-xs font-thin text-justify'>Jesús Terán 38A,
                  Tabacalera.
                  CDMX. 06000
                </p>
              </div>
              <div className="container py-3">
                <div className='w-100 font-bold flex justify-between text-xl items-center leading-4 pb-2'>
                  <span>K</span>
                  <span>h</span>
                  <span>e</span>
                </div>
                <p className='w-100 text-xs font-thin text-justify'>
                  Cda. Mazatlán
                  Col. Condesa,
                  Cuauhtémoc.
                </p>
                <div className="flex justify-between text-md font-thin">
                  <span>0</span>
                  <span>6</span>
                  <span>1</span>
                  <span>7</span>
                  <span>0</span>
                </div>
              </div>
              <div className="container py-3">
                <div className='w-100 font-bold flex justify-between text-xl items-center leading-4 pb-2'>
                  <span>L</span>
                  <span>o</span>
                  <span>l</span>
                  <span>o</span>
                </div>
                <p className='w-100 text-xs font-thin text-justify'>
                  Av. Yucatán 3,
                  Hipódromo,
                  Cuauhtémoc.
                </p>
                <div className="flex justify-between text-md font-thin">
                  <span>0</span>
                  <span>6</span>
                  <span>1</span>
                  <span>0</span>
                  <span>0</span>
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-6 xl:col-span-4 gap-y-4 ">
              <div className="container py-3">
                <div className='w-100 font-bold flex justify-between text-xl items-center leading-4 pb-2'>
                  <span>E</span>
                  <span>l</span>
                  <span> </span>
                  <span> </span>
                  <span>D</span>
                  <span>e</span>
                  <span>s</span>
                  <span>a</span>
                  <span>s</span>
                  <span>t</span>
                  <span>r</span>
                  <span>e</span>
                </div>
                <p className='w-100 text-xs font-thin text-justify'>
                  San Francisco 521 A
                  Col. Del Valle Centro
                  Benito Juárez. 03100
                </p>
              </div>
              <div className="container py-3">
                <div className='w-100 font-bold flex justify-between text-xl items-center leading-4 pb-2'>
                  <span>F</span>
                  <span>r</span>
                  <span>e</span>
                  <span>i</span>
                  <span>m</span>
                  <span>s</span>
                </div>
                <p className='w-100 text-xs font-thin text-justify'>
                  Ámsterdam 62,
                  Hipódromo,
                  Cuauhtémoc. 06100
                </p>
              </div>
              <div className="container py-3">
                <p className='w-100 font-bold flex justify-between text-xl items-center leading-4 pb-2'>
                  <span>L</span>
                  <span>a</span>
                  <span> </span>
                  <span> </span>
                  <span>N</span>
                  <span>a</span>
                  <span>o</span>
                </p>
                <p className='w-100 text-xs font-thin text-justify'>
                  Av. Michoacán 75,
                  Hipódromo Condesa,
                  Cuauhtémoc. 06100
                </p>
              </div>
              <div className="container py-3">
                <p className='w-100 font-bold flex justify-between text-xl items-center leading-4 pb-2'>
                  <span>I</span>
                  <span>n</span>
                  <span>c</span>
                  <span>e</span>
                  <span>n</span>
                  <span>d</span>
                  <span>i</span>
                  <span>a</span>
                  <span>r</span>
                  <span>i</span>
                  <span>a</span>
                  <span>s</span>
                </p>
                <p className='w-100 text-xs font-thin text-justify'>
                  Calle Marsella 60,
                  Juárez, Cuauhtémoc,
                </p>
                <div className="flex justify-between text-md font-thin">
                  <span>0</span>
                  <span>6</span>
                  <span>0</span>
                  <span>3</span>
                  <span>0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-5 p-5 min-h-80">
          {
            isLoaded && (
              <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
                <Marker position={center} />
              </GoogleMap>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default POS