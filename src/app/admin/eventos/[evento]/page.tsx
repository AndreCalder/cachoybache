"use client";

import { getEvent, updateEvent } from '@/app/api';
import { Card } from '@/components/ui/card';
import { useParams } from 'next/navigation';
import React from 'react'
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { DialogContent, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Modal from '@/components/toolkit/Modal';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { uploadFileAction, uploadVideo } from '@/app/actions';
import { toast } from 'sonner';
import { MoveLeftIcon, MoveRightIcon, XIcon } from 'lucide-react';

interface MediaType {
    id?: string;
    type: string;
    url: string;
}
interface EventData {
    cover: string;
    title: string;
    date: string;
    media: Array<MediaType>;
}

function Evento() {

    const params = useParams();
    const { evento } = params;
    const [loading, setLoading] = React.useState(true);
    const [eventData, setEventData] = React.useState<EventData>();
    const [modalOpen, setModalOpen] = React.useState(false);
    const [fileType, setFileType] = React.useState<string | null>(null);
    const [imageFile, setImageFile] = React.useState<File | null>(null);
    const [imagePreview, setImagePreview] = React.useState<string | null>(null);
    const [videoUrl, setVideoUrl] = React.useState<string | null>(null);
    const [videoFile, setVideoFile] = React.useState<File | null>(null);
    const [videoPreview, setVideoPreview] = React.useState<string | null>(null);
    const [uploading, setUploading] = React.useState(false);
    const [lightBoxActive, setLightBoxActive] = React.useState(false);
    const [activeMedia, setActiveMedia] = React.useState<number>(0);

    const getEventData = async (event: string) => {
        const res = await getEvent(event);
        setEventData(res.data);
    }

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleVideoSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            setVideoFile(file);
        }
    };

    const submitData = async () => {
        setUploading(true);

        toast.loading('Guardando...');

        let resourceUrl;
        let type;
        let id;

        if (fileType === 'img') {
            if (imageFile) {
                resourceUrl = await uploadFileAction(imageFile);
                type = 'image';
            }
        } else if (fileType === 'video') {
            if (videoFile) {
                resourceUrl = await uploadVideo(videoFile);
                console.log(resourceUrl, resourceUrl.split('/')[2]);
                id = resourceUrl.split('/')[2];
                type = 'video';
            }
        }

        const media = {
            type: type,
            url: resourceUrl,
            id: id
        }

        const tempEventData = JSON.parse(JSON.stringify(eventData));
        tempEventData.media.push(media);
        setEventData(tempEventData);

        if (tempEventData && evento) {
            await updateEvent(encodeURIComponent(evento.toString()), tempEventData);
        }

        toast.dismiss();
        toast.success('Guardado correctamente');


        setUploading(false);
        setModalOpen(false);
    }

    React.useEffect(() => {
        if (evento) {
            getEventData(evento.toString());
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
    }, [evento]);


    if (loading) {
        return <p>Cargando...</p>
    }
    return (
        eventData ? (
            <Card className='p-5'>
                <Modal title='Agregar a Galería' open={modalOpen} setOpen={setModalOpen}>
                    <div className="w-full max-h-[500px] overflow-y-auto px-5">
                        <div className="w-full items-center gap-1.5 py-2">
                            <Label>Origen</Label>
                            <Select onValueChange={(value) => setFileType(value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecciona un tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="img">Imagen</SelectItem>
                                        <SelectItem value="video">Video</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        {
                            fileType === 'img' && (
                                <div className="w-full items-center gap-1.5 py-2">
                                    <Label htmlFor="picture">Imagen</Label>
                                    <Input id="picture" type="file" accept="image/*" onChange={handleImageUpload} />
                                </div>
                            )
                        }
                        {
                            fileType === 'video' && (
                                <div className="w-full items-center gap-1.5 py-2">
                                    <Label htmlFor="video">Video</Label>
                                    <Input id="video" type="file" onChange={handleVideoSelect} />
                                </div>
                            )
                        }
                        {
                            (videoUrl && (fileType === 'video_url')) && (
                                <div className="w-full items-center gap-1.5 py-2">
                                    <iframe
                                        width="560"
                                        height="315"
                                        src={`https://player.vimeo.com/video/${videoUrl.replace('/', '?h=')}&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&title=0&byline=0&portrait=0&title=0&byline=0&portrait=0`}
                                        title="Vimeo Player"
                                    ></iframe>
                                </div>
                            )
                        }
                        {(imagePreview && (fileType === 'img')) &&
                            <div className="w-full flex items-center justify-center py-5">
                                <Image src={imagePreview} alt="Blogpost Cover" width={400} height={200} />
                            </div>
                        }
                    </div>
                    <DialogFooter>
                        <Button disabled={uploading} className='' onClick={() => submitData()}>
                            Registrar
                        </Button>
                    </DialogFooter>
                </Modal>
                {
                    eventData.media.length > 0 && (
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
                                <Card className='w-fit h-fit p-5'>
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
                                </Card>
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
                <Separator className='my-4' />
                <div className="w-full flex justify-between py-6">
                    <h2 className='text-2xl font-bold'>Media</h2>
                    <Button className='bg-primary text-white' onClick={() => setModalOpen(true)}>Agregar</Button>
                </div>

                <div className="w-full h-96 overflow-y-scroll grid grid-cols-12">
                    {
                        eventData?.media.map((media, index) => (
                            <div key={index} className="col-span-12 md:col-span-4 lg:col-span-3 gap-y-4 flex flex-col p-5 items-center justify-center cursor-pointer">
                                {
                                    media.type === 'image' ? (
                                        <>
                                            <div onClick={() => { setActiveMedia(index); setLightBoxActive(true); }} className="h-40 w-full rounded-md" style={{ backgroundImage: `url(${media.url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

                                            </div>
                                            <p className="text-xs">Imagen</p>
                                        </>
                                    ) : (
                                        <div onClick={() => { setActiveMedia(index); setLightBoxActive(true); }} className='w-full flex flex-col items-center justify-center gap-y-4'>
                                            <div className="h-40 w-full rounded-md" style={{ backgroundImage: `url(https://vumbnail.com/${media.id}.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

                                            </div>
                                            <p className="text-xs">Video</p>
                                        </div>
                                    )
                                }
                            </div>
                        ))
                    }
                </div>
            </Card>
        ) : (
            <p>Evento no encontrado</p>
        )

    )
}

export default Evento