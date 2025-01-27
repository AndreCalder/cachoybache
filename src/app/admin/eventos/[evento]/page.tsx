"use client";

import { getEvent } from '@/app/api';
import { Card } from '@/components/ui/card';
import { useParams } from 'next/navigation';
import React from 'react'
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

function Evento() {

    const params = useParams();
    const { evento } = params;
    const [loading, setLoading] = React.useState(true);
    const [eventData, setEventData] = React.useState<{cover: string, title: string, date: string}>();

    const getEventData = async (event: string) => {
        const res = await getEvent(event);
        setEventData(res.data);
    }

    React.useEffect(() => {
        if (evento) {
            getEventData(evento.toString());
            setLoading(false);
        }
    }, [evento]);

    if (loading) {
        return <p>Cargando...</p>
    }
    return (
        eventData ? (
            <Card className='p-5'>
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-6">
                    <Image
                        src={eventData.cover}
                        alt={eventData.title}
                        width={500}
                        height={500}
                    />
                </div>
                <div className="col-span-12 md:col-span-6">
                    <h2 className="text-2xl font-bold">{eventData.title}</h2>
                    <p>{eventData.date}</p>
                </div>
            </div>
            <Separator  className='my-4'/>
            <h2 className='text-2xl font-bold'>Media</h2>

            <div className="w-full h-80">
                <p>a</p>
            </div>
        </Card>
        ) : (
            <p>Evento no encontrado</p>
        )

    )
}

export default Evento