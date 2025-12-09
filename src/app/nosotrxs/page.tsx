import React from "react";
import Subtitle from "../components/subtitle";
import Image from "next/image";

function Page() {
  const credits = [
    {
      name: "Natalia",
      lastname: "Ortega",
    },
    {
      name: "Emilio",
      lastname: "Galicia",
    },
    {
      name: "Isabel",
      lastname: "Barba",
    },
    {
      name: "Daniela",
      lastname: "Zorrilla",
    },
    {
      name: "Fernanda",
      lastname: "Zorrilla",
    },
    {
      name: "Mariana",
      lastname: "Guerrero",
    },
    {
      name: "Paulina",
      lastname: "López",
    },
  ];
  return (
    <main className="w-screen min-h-svh flex flex-col aboutus pt-24">
      <Subtitle
        subtitle="NOSOTRXS"
        classes="border-b-2 border-solid border-black"
      />
      <div className="w-100 flex-1 grid grid-cols-12 px-5 md:px-12 pt-6 gap-x-8">
        <div className="col-span-12 md:col-span-5 flex flex-col justify-center gap-y-8  py-6">
          <p className="text-xs font-light ocrb">(Cacho y bache)</p>
          <div>
            <p className="text-6xl font-[900]">Def.</p>
            <p className="text-4xl font-md">Mx.</p>
          </div>
          <p className="text-lg text-justify font-[400]">
            &emsp; &emsp;Concepto proveniente del creer que hay muchos “algo”
            que nos conectan:{" "}
            <b>experiencias, sentimientos, sabores, sueños y pesadillas</b>.
            También del aceptar que hay mucho que nos ve y como sociedad, no
            vemos. Y cómo no, proveniente igual del recordar que en el camino
            hay una constante, los señalamientos de vialidad rara vez incluyen
            los baches.
          </p>
          <p className="text-md text-justify">
            Dentro de la generalización del término{" "}
            <span className="italic">creativx</span>. Más allá de un medio que
            excluye o separa, queremos re(unir) y ser hoy, mañana y por supuesto
            pasado también una revista de, para y por creativxs. Espacio,
            enfoque, luz y voz. Proponemos, mostrarnos y demostrarnos para que
            los símbolos en las calles sí abarquen realidades. Materializar el
            gozo. Rebotar y tejer una telaraña. Nombrarnos bien porque existimos
            complejxs.
          </p>
        </div>
        <div className="col-span-12 md:col-span-7 grid grid-cols-12 gap-8">
          <div className="hidden min-h-80 md:grid col-span-12 xl:col-span-7 grid-rows-10">
            <div className="row-span-3 relative">
              <Image
                className="absolute left-0 top-0"
                src="/Tendedero.webp"
                alt="Mano"
                width={180}
                height={151}
              />
            </div>
            <div className="row-span-3 relative">
              <div className="absolute h-fit w-fit right-0 top-0">
                <Image
                  className="translate-x-[60%] -translate-y-[5%]"
                  src="/Mano.webp"
                  alt="Mano"
                  width={160}
                  height={120}
                />
              </div>
            </div>
            <div className="row-span-4 relative">
              <Image
                className="absolute left-16 bottom-5"
                src="/Espejo.webp"
                alt="Mano"
                width={160}
                height={80}
              />
            </div>
          </div>
          <div className="col-span-12 h-52 grid md:hidden grid-cols-12">
            <div className="col-span-6 relative">
              <Image
                className="absolute left-0 top-0"
                src="/Tendedero.webp"
                alt="Mano"
                width={100}
                height={151}
              />
              <Image
                className="absolute left-1/2 bottom-0"
                src="/Espejo.webp"
                alt="Mano"
                width={100}
                height={151}
              />
            </div>
            <div className="col-span-6 relative">
              <Image
                className="absolute right-0 top-1/4"
                src="/Mano.webp"
                alt="Mano"
                width={100}
                height={151}
              />
            </div>
          </div>
          <div className="col-span-12 xl:col-span-5 flex flex-col justify-end">
            <div className="bg-[#ED1C1D] pt-6 pb-8 px-6">
              <div className="flex justify-between text-3xl text-[#F2D5E0] font-bold">
                <span>E</span>
                <span>L</span>
                <span> </span>
                <span>E</span>
                <span>Q</span>
                <span>U</span>
                <span>I</span>
                <span>P</span>
                <span>O</span>
              </div>
              {credits.map((credit, index) => {
                return (
                  <div key={index} className="grid grid-cols-12 text-[#F2D5E0]">
                    <div className="col-span-6">
                      <p className="text-[#F2D5E0]">{credit.name}</p>
                    </div>
                    <div className="col-span-6">
                      <p className="text-[#F2D5E0] text-right">
                        {credit.lastname}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Page;
