import React from 'react'
import Subtitle from '../components/subtitle'

function POS() {
  return (
    <div className="min-h-screen h-fit salespoints pt-12">
      <Subtitle subtitle="ESPACIOS DE VENTA" classes="salespoints border-b-2 border-solid border-yellow-300" />
      <div className="grid grid-cols-12 w-screen py-5 px-5 sm:px-20">
        <div className="col-span-12 sm:col-span-5">
          <p className="text-4xl font-black">
            CDMX
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 tracking-[0.2em]">
            <div className="col-span-1 space-y-4 pr-4">
              <div className="container py-3">
                <p className='w-100 font-bold text-lg items-center leading-4 pb-2'>Exit La Librería</p>
                <p className='w-100 text-sm font-thin text-justify'>Río Pánuco 215, Cuauhtémoc.</p>
                <div className="flex justify-between text-lg font-thin p">
                  <span>0</span>
                  <span>6</span>
                  <span>5</span>
                  <span>0</span>
                  <span>0</span>
                </div>
              </div>
              <div className="container py-3">
                <p className='w-100 font-bold text-lg items-center leading-4 pb-2'>Extra Extra</p>
                <p className='w-100 text-sm font-thin text-justify'>Morena 1312,
                  Narvarte CDMX.</p>
              </div>
              <div className="container py-3">
                <p className='w-100 font-bold text-lg items-center leading-4 pb-2'>La Fiera</p>
                <p className='w-100 text-sm font-thin text-justidy'>Calle París 101,
                  Del Carmen,
                  Coyoacán. 04100
                </p>
              </div>
              <div className="container py-3">
                <p className='w-100 font-bold text-lg items-center leading-4 pb-2'>Casa Bosques</p>
                <p className='w-100 text-sm font-thin text-justify'>
                  Córdoba 25,
                  Roma Norte.
                </p>
                <div className="flex justify-between text-lg font-thin">
                  <span>0</span>
                  <span>6</span>
                  <span>7</span>
                  <span>0</span>
                  <span>0</span>
                </div>
              </div>
            </div>
            <div className="col-span-1 space-y-4 px-4">
              <div className="container py-3">
                <p className='w-100 font-bold text-lg items-center leading-4 pb-2'>Rretiemble</p>
                <p className='w-100 text-sm font-thin text-justify'>Jesús Terán 38A,
                  Tabacalera.
                  CDMX. 06000
                </p>
              </div>
              <div className="container py-3">
                <div className='w-100 font-bold flex justify-between text-lg items-center leading-4 pb-2'>
                  <span>K</span>
                  <span>h</span>
                  <span>e</span>
                </div>
                <p className='w-100 text-sm font-thin text-justify'>
                  Cda. Mazatlán
                  Col. Condesa,
                  Cuauhtémoc.
                </p>
                <div className="flex justify-between text-lg font-thin">
                  <span>0</span>
                  <span>6</span>
                  <span>1</span>
                  <span>7</span>
                  <span>0</span>
                </div>
              </div>
              <div className="container py-3">
                <div className='w-100 font-bold flex justify-between text-lg items-center leading-4 pb-2'>
                  <span>L</span>
                  <span>o</span>
                  <span>l</span>
                  <span>o</span>
                </div>
                <p className='w-100 text-sm font-thin text-justify'>
                  Av. Yucatán 3,
                  Hipódromo,
                  Cuauhtémoc.
                </p>
                <div className="flex justify-between text-lg font-thin">
                  <span>0</span>
                  <span>6</span>
                  <span>1</span>
                  <span>0</span>
                  <span>0</span>
                </div>
              </div>
            </div>
            <div className="col-span-1 space-y-4 px-4">
              <div className="container py-3">
                <p className='w-100 font-bold text-lg items-center leading-4 pb-2'>El Desastre</p>
                <p className='w-100 text-sm font-thin text-justify'>
                  San Francisco 521 A
                  Col. Del Valle Centro
                  Benito Juárez. 03100
                </p>
              </div>
              <div className="container py-3">
                <div className='w-100 font-bold flex justify-between text-lg items-center leading-4 pb-2'>
                  <span>F</span>
                  <span>r</span>
                  <span>e</span>
                  <span>i</span>
                  <span>m</span>
                  <span>s</span>
                </div>
                <p className='w-100 text-sm font-thin text-justify'>
                  Ámsterdam 62,
                  Hipódromo,
                  Cuauhtémoc. 06100
                </p>
              </div>
              <div className="container py-3">
                <p className='w-100 font-bold text-llg items-center leading-4 pb-2'>La Nao</p>
                <p className='w-100 text-sm font-thin text-justify'>
                  Av. Michoacán 75,
                  Hipódromo Condesa,
                  Cuauhtémoc. 06100
                </p>
              </div>
              <div className="container py-3">
                <p className='w-100 font-bold text-lg items-center leading-4 pb-2'>Incendiarias</p>
                <p className='w-100 text-sm font-thin text-justify'>
                  Calle Marsella 60,
                  Juárez, Cuauhtémoc,
                </p>
                <div className="flex justify-between text-lg font-thin">
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
        <div className="col-span-12 sm:col-span-7"></div>
      </div>
    </div>
  )
}

export default POS