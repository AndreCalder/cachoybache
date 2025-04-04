"use client";

import React, { useMemo } from 'react'
import Subtitle from '../components/subtitle'
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { getLocations, getStates } from '../api';

function POS() {
  const [states, setStates] = React.useState<any[]>([]);
  const [locations, setLocations] = React.useState<any[]>([]);
  const [selectedState, setSelectedState] = React.useState<any>(null);
  const [selectedLocations, setSelectedLocations] = React.useState<any[]>([]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const markers = useMemo(() => (
    [
      {
        lat: 19.427368015009264,
        lng: -99.17468867544353
      },
      {
        lat: 19.398638591047447,
        lng: -99.14954339639874
      },
      {
        lat: 19.35484376427791,
        lng: -99.15941390204446
      },
      {
        lat: 19.423362201252434,
        lng: -99.15990747505592
      },
      {
        lat: 19.436394112857204,
        lng: -99.15084776156195
      },
      {
        lat: 19.41617249392708,
        lng: -99.17623861738514
      },
      {
        lat: 19.41661848029953,
        lng: -99.16726834622058
      },
      {
        lat: 19.391652625380107,
        lng: -99.17129938855014
      },
      {
        lat: 19.414537963586877,
        lng: -99.16964913272695
      },
      {
        lat: 19.411881160833865,
        lng: -99.1733261038915
      },
      {
        lat: 19.42541454397263,
        lng: -99.15946437505585
      }
    ]), []);

  const getData = async () => {
    try {
      let res = await getLocations();
      let statesRes = await getStates();
      const activeStateId = statesRes.data[0]._id.$oid
      setStates(statesRes.data);
      setSelectedState(activeStateId);
      setLocations(res.data);

    } catch (error) {
    }
  }


  React.useEffect(() => {
    setSelectedLocations(locations.filter((location: any) => location.state.$oid === selectedState));
  }, [selectedState])

  React.useEffect(() => {
    getData();
  }, [])

  return (
    <div className="min-h-screen h-fit salespoints pt-24">
      <Subtitle subtitle="ESPACIOS DE VENTA" classes="salespoints border-b-2 border-solid border-yellow-300" />
      <div className="grid grid-cols-12 w-screen py-5 px-5 md:px-12">
        <div className="col-span-12 sm:col-span-6 py-6 flex flex-col justify-center gap-y-6">
          <div className="w-full flex gap-x-4">
            {
              states.map((state, index) => (
                <p key={index} className={`text-3xl font-black ${selectedState === state._id.$oid ? '' : 'opacity-40 cursor-pointer'}`} onClick={() => setSelectedState(state._id.$oid)}>
                  {state.name}
                </p>
              ))
            }
          </div>
          <div className="grid grid-cols-12 lg:grid-cols-12 tracking-[0.2em] lg:gap-x-6 xl:gap-x-12 flex-1">
            {
              selectedLocations.length > 0 && (
                <div className="col-span-12 lg:col-span-6 xl:col-span-4 gap-y-4">
                  {
                    selectedLocations.slice(0, 4).map((location, index) => (
                      <div key={location.name} className="container py-3">
                        <div className='w-100 font-bold text-xl items-center leading-4 pb-2 hidden md:flex justify-between'>
                          {
                            location.name.split('').map((letter: any, index: React.Key | null | undefined) => (
                              <span key={index}>{letter}</span>
                            ))
                          }
                        </div>
                        <div className='w-100 font-bold text-xl items-center leading-4 pb-2  md:hidden'>
                          {location.name}
                        </div>
                        <p className='w-100 text-xs font-thin text-justify'>
                          {location.address}
                        </p>

                        <div className="hidden md:flex justify-between text-md font-thin p">
                          {
                            location.zipCode.split('').map((letter: any, index: React.Key | null | undefined) => (
                              <span key={index}>{letter}</span>
                            ))
                          }
                        </div>

                        <div className='md:hidden text-md font-thin'>
                          {
                            location.zipCode
                          }
                        </div>
                      </div>
                    ))
                  }
                </div>
              )
            }
            {
              selectedLocations.length > 4 && (
                <div className="col-span-12 lg:col-span-6 xl:col-span-4 gap-y-4">
                  {
                    selectedLocations.slice(4, 7).map((location, index) => (
                      <div key={location.name} className="container py-3">
                        <div className='w-100 font-bold text-xl items-center leading-4 pb-2  hidden md:flex justify-between'>
                          {
                            location.name.split('').map((letter: any, index: React.Key | null | undefined) => (
                              <span key={index}>{letter}</span>
                            ))
                          }
                        </div>
                        <div className='w-100 font-bold text-xl items-center leading-4 pb-2  md:hidden'>
                          {location.name}
                        </div>
                        <p className='w-100 text-xs font-thin text-justify'>
                          {location.address}
                        </p>

                        <div className="hidden md:flex justify-between text-md font-thin p">
                          {
                            location.zipCode.split('').map((letter: any, index: React.Key | null | undefined) => (
                              <span key={index}>{letter}</span>
                            ))
                          }
                        </div>
                        <div className='md:hidden text-md font-thin'>
                          {
                            location.zipCode
                          }
                        </div>
                      </div>
                    ))
                  }
                </div>
              )
            }
            {
              selectedLocations.length > 7 && (
                <div className="col-span-12 lg:col-span-6 xl:col-span-4 gap-y-4">
                  {
                    selectedLocations.slice(8, 12).map((location, index) => (
                      <div key={location.name} className="container py-3">
                        <div className='w-100 font-bold text-xl items-center leading-4 pb-2  hidden md:flex justify-between'>
                          {
                            location.name.split('').map((letter: any, index: React.Key | null | undefined) => (
                              <span key={index}>{letter}</span>
                            ))
                          }
                        </div>
                        <div className='w-100 font-bold text-xl items-center leading-4 pb-2  md:hidden'>
                          {location.name}
                        </div>
                        <p className='w-100 text-xs font-thin text-justify'>
                          {location.address}
                        </p>

                        <div className="hidden md:flex justify-between text-md font-thin p">
                          {
                            location.zipCode.split('').map((letter: any, index: React.Key | null | undefined) => (
                              <span key={index}>{letter}</span>
                            ))
                          }
                        </div>
                        <div className='md:hidden text-md font-thin'>
                          {
                            location.zipCode
                          }
                        </div>
                      </div>
                    ))
                  }
                </div>
              )
            }

          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 py-6 min-h-80 flex flex-col items-end justify-center">
          {
            isLoaded && (
              <GoogleMap zoom={13} center={{
                lat: states.find((state) => state._id.$oid === selectedState)?.lat || 19.427368015009264,
                lng: states.find((state) => state._id.$oid === selectedState)?.lng || -99.17468867544353
              }} mapContainerClassName="map-container" options={{ streetViewControl: false, fullscreenControl: false, zoomControl: false, mapTypeControl: false }}>
                {
                  selectedLocations.map((marker, index) => (
                    <Marker key={index} position={{ lat: parseFloat(marker.coords.split(",")[0]), lng: parseFloat(marker.coords.split(",")[1]) }} />
                  ))
                }
              </GoogleMap>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default POS