import React from 'react'
import Subtitle from '../components/subtitle'
import Image from 'next/image'
function YellowPages() {
  return (
    <main className="w-screen yellowpages pt-12">
      <Subtitle subtitle="SECCIÓN AMARILLA" classes="border-b-2 border-solid border-black" />
      <div className="min-h-96 w-100 grid grid-cols-11 px-5 md:px-8 py-6 gap-y-5 gap-x-5">
        <div className="h-full col-span-12 lg:col-span-6 xl:col-span-2 flex flex-col justify-start gap-y-4">
          <div className="min-h-80 flex-1 w-full border-[2px] border-solid border-black p-2">
            <div className="font-bold text-center text-xl">ASTRONOMA FILMS</div>
            <div className="w-full flex justify-center">
              <Image src="/Astronoma.svg" alt="Astronomía Films" width={200} height={200} />
            </div>
            <div className="w-full flex justify-between text-sm">
              <b>TEL.</b>
              <b>777-184-19-03</b>
            </div>
            <div className="w-full flex justify-between text-sm">
              <b>Instagram:</b>
              <b>@astronomafilms</b>
            </div>
            <p className='italic text-sm'>
              Página Web: <a href="https://astronomafilms.com">astronomafilms.com</a>
            </p>
            <p className='text-justify'>Somos una casa productora conformada por jóvenes que buscan convertir el cine en un medio accesible, a través de impulsar propuestas y talentos emergentes con alto nivel técnico y creativo. </p>
          </div>
          <div className="w-full border-[2px] border-dashed border-black p-2">
            <div className="w-full border-[2px] border-solid border-black p-2">
              <p>¡ANÚNCIATE!</p>
              <p>@cachoybache</p>
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-5 xl:col-span-2 flex flex-col justify-start gap-y-4">
          <div className="min-h-80 flex-1 w-full border-[2px] border-solid border-black p-2">
            <div className="font-bold text-center text-xl">KHE</div>
            <div className="w-full flex justify-between">
              <b>Instagram:</b>
              <b>@khe.quieres</b>
            </div>
            <div className="w-full flex justify-center">
              <Image src="/Khe.svg" alt="Khe" width={200} height={200} />
            </div>
            <p className="text-light text-justify">
              Taller de cerámica fundado por Jessie Lewis y Mariana Valandrano. Espacio colectivo donde ellas trabajan en sus propias producciones y dan clases y talleres enfocados en técnicas cerámicas. También ofrecen membresías y apoyan artistas que necesitan realizar producciones de cerámica.
            </p>
          </div>
          <div className="min-h-46 w-full border-[2px] border-solid border-black p-2">
            <div className="font-bold text-center text-xl">NESO</div>
            <div className="w-full flex justify-between text-sm">
              <b>Instagram:</b>
              <b>@nesoestudiocreativo</b>
            </div>
            <Image src="/Neso.svg" alt="Khe" width={200} height={200} />
            <p className="text-light text-justify">
              Estudio creativo con enfoque a creación y desarrollo de marca, diseño gráfico y conceptos creativos en general.
            </p>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-6 xl:col-span-3 flex flex-col justify-start gap-y-4">
          <div className="min-h-80 w-full border-[2px] border-solid border-black p-2">
            <div className="w-full grid grid-cols-12">
              <div className="col-span-4">
                <Image src="/BarMini.svg" alt="Bar mini" width={200} height={200} />
              </div>
              <div className="col-span-8">
                <b className='text-2xl'>BAR MINI</b>
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
                <p className="text-xl text-light">
                  María Muñóz/
                </p>
                <p className="text-xl text-light">
                  Roberto Michelsen
                </p>
              </div>
            </div>
            <p className='text-justify'>Proyecto social, gastronómico y recreativo. Cuenta con un horario de lunes a viernes (próximamente fines de semana) de 10am-5pm en el cual se ofrecen ricos desayunos y comidas. Nos gusta pasarla bien y nos gusta que la pasen bien estando con nosotros. </p>
          </div>
          <div className="min-h-40 flex-1 w-full border-[2px] border-solid border-black py-3 p-2 flex flex-col justify-between">
            <div className="font-bold text-center text-3xl">OLYMPIC CREW</div>
            <div>
              <div className="w-full flex justify-between">
                <b>Instagram:</b>
                <b>@olympic.crew</b>
              </div>
              <div className="w-full flex justify-between">
                <b>E-mail:</b>
                <b>hola@olympiccrew.mx</b>
              </div>
              <div className="w-full flex justify-between italic">
                <p className="font-light">Página Web:</p>
                <a href="https://olympiccrew.mx">www.olympiccrew.mx</a>
              </div>
            </div>
            <Image src="/Olypmic.svg" alt="Olympic" width={400} height={200} />
            <p className="text-xl text-light text-center">
              Productora
            </p>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-5 xl:col-span-4 flex flex-col justify-start gap-y-4">
          <div className="min-h-60 w-full border-[2px] border-solid border-black p-2 grid grid-cols-12 gap-x-2">
            <div className="h-full col-span-12 md:col-span-4 flex justify-center items-center">
              <Image src="/Soy.svg" alt="Olympic" width={250} height={250} />
            </div>
            <div className="col-span-12 md:col-span-8">
              <div className="font-bold text-center text-xl">SOY FELIZ ESTUDIO</div>
              <div className="w-full flex justify-between">
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
              <p className='italic text-sm leading-5'>
                Página Web: <a href="https://www.soyfelizstudio.com">www.soyfelizstudio.com</a>
              </p>
              <p className="text-light">
                Llevamos el arte en la piel/ Espacio multidisciplinario que fomenta el crecimiento artístico y creativo, mientras buscamos la felicidad de sus clientes.
              </p>
            </div>
          </div>
          <div className="min-h-60 flex-1 w-full grid grid-cols-12 gap-y-4 gap-x-4">
            <div className="col-span-12 md:col-span-6 border-[2px] border-solid border-black flex flex-col items-center justify-between p-2">
              <Image src="/Terruva.svg" alt="Terruva" width={200} height={200} />
              <div className="font-bold text-center text-3xl">TERRUVA</div>
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
              <p className="text-light">
                En Terruva exploramos los secretos de los vinos naturales a través de experiencias únicas como catas privadas, supper clubs, pop-ups y talleres.
              </p>
            </div>
            <div className="col-span-12 md:col-span-6 border-[2px] border-solid border-black flex flex-col items-center justify-between p-2">
              <Image src="/Veguísima.svg" alt="Terruva" width={200} height={200} />
              <div className="font-bold text-center text-3xl">VEGUÍSIMA</div>
              <div className='w-full'>
                <div className="w-full flex justify-between">
                  <b>TEL.</b>
                  <b>5513576944</b>
                </div>
                <div className="w-full flex justify-between">
                  <b>Instagram:</b>
                  <b>@comeveguisima</b>
                </div>
                <b className="w-full">
                  Pachuca #59, Col. Condesa
                </b>
              </div>
              <p className="text-light">Rolando Vega/ Servicio de comida elaborada con mucho gusto y placer sin utilizar productos de origen animal.
              </p>
            </div>

          </div>
        </div>

      </div>
    </main>
  )
}

export default YellowPages