"use client"

import { getEvent } from '@/app/api';
import { Card } from '@/components/ui/card';
import { MoveLeftIcon, MoveRightIcon, XIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import React from 'react'
import Image from 'next/image';

function Evento() {

    const params = useParams();
    const { event } = params;
    const [eventData, setEventData] = React.useState<any>(null);
    const [loading, setLoading] = React.useState(true);
    const [lightBoxActive, setLightBoxActive] = React.useState(false);
    const [activeMedia, setActiveMedia] = React.useState(0);

    const getEventData = async (event: string) => {
        const res = await getEvent(event);
        setEventData(res.data);
    }


    React.useEffect(() => {
        if (event) {
            getEventData(event.toString());
            setLoading(false);
        }
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setLightBoxActive(false);
            }
        };

        document.addEventListener("keydown", handleEsc);
        return () => {
            document.removeEventListener("keydown", handleEsc);
        };
    }, [event]);

    return (
        <div className='w-full pt-24 h-svh flex flex-col'>
            {
                eventData != null && eventData.media.length > 0 && (
                    <div className={`fixed top-0 bottom-0 left-0 right-0 bg-black/50 z-50 flex justify-center items-center ${!lightBoxActive ? 'hidden' : ''}`}>
                        <XIcon className="w-10 h-10 cursor-pointer text-white fixed top-5 right-5" onClick={() => setLightBoxActive(false)} />
                        <div className="flex z-50 items-center gap-5">
                            <MoveLeftIcon className="w-10 h-10 cursor-pointer text-white" onClick={() => {
                                if (activeMedia > 0) {
                                    setActiveMedia(activeMedia - 1)
                                } else {
                                    setActiveMedia(eventData.media.length - 1)
                                }
                            }} />
                            <div className="bg-black p-5">
                                {
                                    eventData.media[activeMedia].type === 'image' ? (

                                        <Image src={eventData.media[activeMedia].url} alt="activeImage" width={600} height={500} />
                                    ) : (
                                        <iframe
                                            src={`https://player.vimeo.com/video/${eventData.media[activeMedia].id}?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&title=0&byline=0&portrait=0`}
                                            width={600} height={500}
                                        />
                                    )
                                }
                            </div>
                            <MoveRightIcon className="w-10 h-10 cursor-pointer text-white" onClick={() => {
                                if (activeMedia < eventData.media.length - 1) {
                                    setActiveMedia(activeMedia + 1)
                                } else {
                                    setActiveMedia(0)
                                }
                            }} />
                        </div>
                    </div>
                )
            }
            {
                !loading && eventData != null && (
                    <>
                        <div className={`w-full min-h-24 px-5 md:px-12 flex items-center justify-start py-8 border-b-4 border-black`}>
                            <div className="flex flex-col gap-2">
                                <p className='tracking-[0.3em] font-bold sm:text-3xl acumin italic'>{eventData.title}</p>
                            </div>
                        </div>
                        <div className="w-full h-96 overflow-y-scroll grid grid-cols-12">
                            {
                                eventData?.media.map((media: any, index: number) => (
                                    <div key={index} className="col-span-12 md:col-span-4 lg:col-span-3 gap-y-4 flex flex-col p-5 items-center justify-center cursor-pointer">
                                        {
                                            media.type === 'image' ? (
                                                <>
                                                    <div onClick={() => { setActiveMedia(index); setLightBoxActive(true); }} className="h-40 w-full rounded-md" style={{ backgroundImage: `url(${media.url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

                                                    </div>
                                                </>
                                            ) : (
                                                <div onClick={() => { setActiveMedia(index); setLightBoxActive(true); }} className='w-full flex flex-col items-center justify-center gap-y-4'>
                                                    <div className="h-40 w-full rounded-md" style={{ backgroundImage: `url(https://vumbnail.com/${media.id}.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default Evento