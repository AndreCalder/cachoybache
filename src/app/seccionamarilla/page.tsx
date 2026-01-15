"use client";

import React, { useEffect, useState } from 'react'
import Subtitle from '../components/subtitle'
import Image from 'next/image'
import Link from 'next/link'
import { getSeccionAmarilla } from '../api'
import { FileText } from 'lucide-react'

interface SeccionAmarillaEntry {
  _id: { $oid: string };
  title: string;
  url: string;
}

function YellowPages() {
  const [entries, setEntries] = useState<SeccionAmarillaEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await getSeccionAmarilla();
        setEntries(response.data.data || response.data || []);
      } catch (error) {
        console.error("Error fetching seccion amarilla:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  // If there are entries, show only the PDF section
  if (!loading && entries.length > 0) {
    return (
      <main className="w-screen yellowpages pt-24">
        <Subtitle subtitle="SECCIÓN AMARILLA" classes="border-b-2 border-solid border-black" />
        
        <div className="w-full px-5 md:px-12 py-6 min-h-[calc(100vh-200px)]">
          <div className="w-full border-[2px] border-solid border-black p-6">
            <h2 className="font-bold text-xl mb-6 flex justify-between max-w-xs">
              <span>A</span>
              <span>R</span>
              <span>C</span>
              <span>H</span>
              <span>I</span>
              <span>V</span>
              <span>O</span>
              <span>S</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {entries.map((entry) => (
                <a
                  key={entry._id.$oid}
                  href={entry.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-[2px] border-solid border-black p-4 hover:bg-yellow-50 transition-colors flex flex-col items-center gap-3 group"
                >
                  <div className="w-full aspect-[3/4] bg-gray-100 border border-gray-300 flex items-center justify-center relative overflow-hidden">
                    <iframe
                      src={`${entry.url}#toolbar=0&navpanes=0&scrollbar=0`}
                      className="w-full h-full pointer-events-none"
                      title={entry.title}
                    />
                    <div className="absolute inset-0 bg-transparent group-hover:bg-black/5 transition-colors" />
                  </div>
                  <div className="w-full text-center">
                    <p className="font-bold text-sm truncate" title={entry.title}>
                      {entry.title}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center justify-center gap-1 mt-1">
                      <FileText className="w-3 h-3" />
                      PDF
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Default view with static content (shown when no entries or loading)
  return (
    <main className="w-screen yellowpages pt-24">
      <Subtitle subtitle="SECCIÓN AMARILLA" classes="border-b-2 border-solid border-black" />

      <div className="min-h-80 w-100 grid grid-cols-12 px-5 md:px-12 py-6 gap-6">
        <div className="h-full col-span-12 lg:col-span-6 xl:col-span-2 flex flex-col justify-start gap-y-6">
          <div className="min-h-60 flex-1 w-full border-[2px] border-solid border-black p-4">
            <div className="flex justify-between text-xl font-bold">
              <span>A</span>
              <span>S</span>
              <span>T</span>
              <span>R</span>
              <span>O</span>
              <span>N</span>
              <span>O</span>
              <span>M</span>
              <span>A</span>

            </div>
            <div className="flex justify-between text-xl font-bold">
              <span>F</span>
              <span>I</span>
              <span>L</span>
              <span>M</span>
              <span>S</span>
            </div>
            <div className="w-full flex justify-center">
              <Image className='py-6' src="/Astronoma.svg" alt="Astronomía Films" width={120} height={200} />
            </div>
            <div className="w-full flex justify-between text-xs">
              <b>TEL.</b>
              <b>777-184-19-03</b>
            </div>
            <div className="w-full flex justify-between text-xs">
              <b>Instagram:</b>
              <b>@astronomafilms</b>
            </div>
            <div className="w-full flex justify-between italic text-xs">
              <span>Página Web:</span>
              <a href="https://astronomafilms.com">astronomafilms.com</a>
            </div>
            <p className='text-justify text-xs py-2'>Somos una casa productora conformada por jóvenes que buscan convertir el cine en un medio accesible, a través de impulsar propuestas y talentos emergentes con alto nivel técnico y creativo. </p>
          </div>
          <div className="w-full border-[2px] border-dashed border-black p-4">
            <div className="w-full border-[2px] border-solid border-black p-2">
              <div className='ocrb text-sm flex justify-between'>
                <span>¡A</span>
                <span>N</span>
                <span>Ú</span>
                <span>N</span>
                <span>C</span>
                <span>I</span>
                <span>A</span>
                <span>T</span>
                <span>E!</span>
              </div>
              <div className="flex justify-center">
                <Link href={"https://www.instagram.com/cachoybache/"} className='italic tracking-[0.4em] text-xs w-full text-center'>@cachoybache</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-5 xl:col-span-3 flex flex-col justify-start gap-y-6">
          <div className="min-h-60 flex-1 w-full border-[2px] border-solid border-black p-4">
            <div className="font-bold text-xl flex justify-between">
              <div className="p">K</div>
              <div className="p">H</div>
              <div className="p">E</div>
            </div>
            <div className="w-full flex justify-between">
              <b>Instagram:</b>
              <b>@khe.quieres</b>
            </div>
            <div className="w-full flex justify-center py-6">
              <Image src="/Khe.svg" alt="Khe" width={180} height={180} />
            </div>
            <p className="text-light text-justify text-xs">
              Taller de cerámica fundado por Jessie Lewis y Mariana Valandrano. Espacio colectivo donde ellas trabajan en sus propias producciones y dan clases y talleres enfocados en técnicas cerámicas. También ofrecen membresías y apoyan artistas que necesitan realizar producciones de cerámica.
            </p>
          </div>
          <div className="min-h-46 w-full border-[2px] border-solid border-black p-4">
            <div className="font-bold text-xl w-full flex justify-between">
              <p>N</p>
              <p>E</p>
              <p>S</p>
              <p>O</p>
            </div>
            <div className="w-full flex justify-between text-sm">
              <b>Instagram:</b>
              <b>@nesoestudiocreativo</b>
            </div>
            <div className="w-full flex justify-center py-6">
              <Image src="/Neso.svg" alt="Neso" width={250} height={200} />
            </div>
            <p className="text-light text-justify py-2 text-xs">
              Estudio creativo con enfoque a creación y desarrollo de marca, diseño gráfico y conceptos creativos en general.
            </p>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-6 xl:col-span-3 flex flex-col justify-start gap-y-6">
          <div className="min-h-60 w-full border-[2px] border-solid border-black p-4">
            <div className="w-full grid grid-cols-12 gap-x-4">
              <div className="col-span-4">
                <Image src="/BarMini.svg" alt="Bar mini" width={110} height={110} />
              </div>
              <div className="col-span-8 text-xs">
                <div className='flex justify-between font-extrabold text-xl tracking-[0.5em]'>
                  <span>B</span>
                  <span>A</span>
                  <span>R</span>
                  <span> </span>
                  <span>M</span>
                  <span>I</span>
                  <span>N</span>
                  <span>I</span>
                </div>
                <div className="w-full flex justify-between">
                  <b>TEL.</b>
                  <b>5541902326</b>
                </div>
                <div className="w-full flex justify-between">
                  <b>TEL.</b>
                  <b>5535555075</b>
                </div>
                <div className="w-full flex justify-between">
                  <b>Instagram:</b>
                  <b>@_barmini</b>
                </div>
              </div>
            </div>
            <p className='text-justify py-6 text-xs'><span className='font-bold'>María Muñóz/ Roberto Michelsen/</span> Proyecto social, gastronómico y recreativo. Cuenta con un horario de lunes a viernes (próximamente fines de semana) de 10am-5pm en el cual se ofrecen ricos desayunos y comidas. Nos gusta pasarla bien y nos gusta que la pasen bien estando con nosotros. </p>
          </div>
          <div className="min-h-40 flex-1 w-full border-[2px] border-solid border-black py-3 p-4 flex flex-col justify-between">
            <div className="font-bold flex justify-between text-xl tracking-[0.5em]">
              <span>O</span>
              <span>L</span>
              <span>Y</span>
              <span>M</span>
              <span>P</span>
              <span>I</span>
              <span>C</span>
              <span> </span>
              <span> </span>
              <span>C</span>
              <span>R</span>
              <span>E</span>
              <span>W</span>
            </div>
            <div>
              <div className="w-full flex justify-between text-xs">
                <b>Instagram:</b>
                <b>@olympic.crew</b>
              </div>
              <div className="w-full flex justify-between text-xs">
                <b>E-mail:</b>
                <b>hola@olympiccrew.mx</b>
              </div>
              <div className="w-full flex justify-between italic text-xs">
                <p className="font-light">Página Web:</p>
                <a href="https://olympiccrew.mx">www.olympiccrew.mx</a>
              </div>
            </div>
            <div className="w-full flex justify-center">
              <Image src="/Olypmic.svg" alt="Olympic" width={230} height={150} />
            </div>
            <div className="text-xs text-light w-full flex justify-between">
              <p>P</p>
              <p>r</p>
              <p>o</p>
              <p>d</p>
              <p>u</p>
              <p>c</p>
              <p>t</p>
              <p>o</p>
              <p>r</p>
              <p>a</p>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-5 xl:col-span-4 flex flex-col justify-start gap-y-4">
          <div className="min-h-60 w-full border-[2px] border-solid border-black p-4 grid grid-cols-12 gap-x-4 text-xs">
            <div className="h-full col-span-12 md:col-span-4 flex justify-center items-center">
              <Image src="/Soy.svg" alt="Olympic" width={250} height={250} />
            </div>
            <div className="col-span-12 md:col-span-8 text-xs">
              <div className="font-bold flex justify-between text-center text-xl tracking-[0.5em]">
                <span>S</span>
                <span>O</span>
                <span>Y</span>
                <span> </span>
                <span>F</span>
                <span>E</span>
                <span>L</span>
                <span>I</span>
                <span>Z</span>

              </div>
              <div className="font-bold flex justify-between text-xl">
                <span>E</span>
                <span>S</span>
                <span>T</span>
                <span>U</span>
                <span>D</span>
                <span>I</span>
                <span>O</span>
              </div>
              <div className="w-full flex justify-between text-xs">
                <b>TEL.</b>
                <b>55568244411</b>
              </div>
              <div className="w-full flex justify-between">
                <b>Instagram:</b>
                <b>@zoyfelizestudio</b>
              </div>
              <div className="w-full flex justify-between">
                <b>E-mail:</b>
                <b>contacto@soyfelizstudio.com</b>
              </div>
              <div className="w-full flex justify-between italic text-sm leading-5">
                <span>
                  Página Web:
                </span>
                <a href="https://www.soyfelizstudio.com">www.soyfelizstudio.com</a>
              </div>
              <p className="text-light text-justify py-2 text-xs">
                Llevamos el arte en la piel/ Espacio multidisciplinario que fomenta el crecimiento artístico y creativo, mientras buscamos la felicidad de sus clientes.
              </p>
            </div>
          </div>
          <div className="min-h-60 flex-1 w-full grid grid-cols-12 gap-y-4 gap-x-4">
            <div className="col-span-12 md:col-span-6 border-[2px] border-solid border-black flex flex-col items-center justify-between p-4 text-xs">
              <Image src="/Terruva.svg" alt="Terruva" width={140} height={80} />
              <div className="font-bold text-xl w-full flex justify-between">
                <div className="p">T</div>
                <div className="p">E</div>
                <div className="p">R</div>
                <div className="p">R</div>
                <div className="p">U</div>
                <div className="p">V</div>
                <div className="p">A</div>
              </div>
              <div className='w-full'>
                <div className="w-full flex justify-between">
                  <b>TEL.</b>
                  <b>3313637577</b>
                </div>
                <div className="w-full flex justify-between">
                  <b>Instagram:</b>
                  <b>@terruva_</b>
                </div>
              </div>
              <p className="text-light text-justify text-xs">
                En Terruva exploramos los secretos de los vinos naturales a través de experiencias únicas como catas privadas, supper clubs, pop-ups y talleres.
              </p>
            </div>
            <div className="col-span-12 md:col-span-6 border-[2px] border-solid border-black flex flex-col items-center justify-between p-4 text-xs">
              <Image src="/Veguísima.svg" alt="Terruva" width={100} height={80} />
              <div className="font-bold text-xl w-full flex justify-between py-2">
                <p>V</p>
                <p>E</p>
                <p>G</p>
                <p>U</p>
                <p>Í</p>
                <p>S</p>
                <p>I</p>
                <p>M</p>
                <p>A</p>
              </div>
              <div className='w-full'>
                <div className="w-full flex justify-between">
                  <b>TEL.</b>
                  <b>5513576944</b>
                </div>
                <div className="w-full flex justify-between">
                  <b>Instagram:</b>
                  <b>@comeveguisima</b>
                </div>
                <p className="w-full text-justify tracking-[0.05rem] font-bold">
                  Pachuca #59, Col. Condesa
                </p>
              </div>
              <p className="text-light text-justify text-xs"> <span className='font-bold'>Rolando Vega/ </span>Servicio de comida elaborada con mucho gusto y placer sin utilizar productos de origen animal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default YellowPages
