"use client";

import { addToEditionGallery, getEdition } from '@/app/api';
import Modal from '@/components/toolkit/Modal';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useParams } from 'next/navigation';
import React from 'react'
import Image from 'next/image';
import { toast } from 'sonner';
import { uploadFileAction } from '@/app/actions';
import { MoveLeftIcon, MoveRightIcon, XIcon } from 'lucide-react';

function Edition() {

  const params = useParams();
  const { edition } = params;
  const [editionData, setEditionData] = React.useState<any>(null);
  const [uploading, setUploading] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const [subtitle, setSubtitle] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [section, setSection] = React.useState('');
  const [activeMedia, setActiveMedia] = React.useState(0);
  const [lightBoxActive, setLightBoxActive] = React.useState(false);

  function isValidHexColor(hex: string) {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
  }

  const getData = async (edition: string) => {
    const res = await getEdition(edition);
    setEditionData(res.data);
  };

  const submitToGallery = async () => {
    if (edition) {

      setUploading(true);
      toast.loading('Registrando Imagen');
      const imgUrl = await uploadFileAction(imageFile as File);

      if (!imgUrl) {

        setModalOpen(false);
        setUploading(false);

        toast.error('Hubo un error al subir la imagen');
        return;
      }

      const payload = {
        title,
        author,
        section,
        url: imgUrl
      }

      try {
        await addToEditionGallery(edition.toString(), payload);

        toast.dismiss();
        setModalOpen(false);
        setUploading(false);
        getData(edition.toString());

        toast.success('Imagen registrada correctamente');



      } catch (error) {

        setModalOpen(false);
        setUploading(false);

        toast.error('Hubo un error al registrar la imagen');

      }
    }
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

  React.useEffect(() => {
    if (edition) {
      getData(edition.toString());
    }
  }, []);

  return (
    <div>
      {
        editionData ? (
          <Card className='p-5'>
            {
              editionData.gallery.length > 0 && (
                <div className={`fixed top-0 bottom-0 left-0 right-0 bg-black/50 z-50 flex justify-center items-center ${!lightBoxActive ? 'hidden' : ''}`}>
                  <XIcon className="w-10 h-10 cursor-pointer text-white fixed top-5 right-5" onClick={() => setLightBoxActive(false)} />
                  <div className="flex z-50 items-center gap-5">
                    <MoveLeftIcon className="w-10 h-10 cursor-pointer text-white" onClick={() => {
                      if (activeMedia > 0) {
                        setActiveMedia(activeMedia - 1)
                      } else {
                        setActiveMedia(editionData.media.length - 1)
                      }
                    }} />
                    <div className="w-full md:w-[603px] h-fit min-h-64 bg-black p-5 grid grid-cols-12">
                      <div className="col-span-12 md:col-span-7">
                        <Image src={editionData.gallery[activeMedia].url} alt="activeImage" width={300} height={300} />
                      </div>
                      <div className="col-span-12 md:col-span-5 flex flex-col justify-end">
                        <h1 className='text-sm text-white font-light italic'>{editionData.gallery[activeMedia].title}</h1>
                        <p className='text-xs text-white'>/ Fotografía por {editionData.gallery[activeMedia].author}</p>
                        <p className='text-xs text-white'>// Sección "{editionData.gallery[activeMedia
                        ].section}"</p>
                      </div>
                    </div>
                    <MoveRightIcon className="w-10 h-10 cursor-pointer text-white" onClick={() => {
                      if (activeMedia < editionData.gallery.length - 1) {
                        setActiveMedia(activeMedia + 1)
                      } else {
                        setActiveMedia(0)
                      }
                    }} />
                  </div>
                </div>
              )
            }

            <Modal title='Agregar a Galería' open={modalOpen} setOpen={setModalOpen}>
              <div className="w-full max-h-[500px] overflow-y-auto px-5">
                <div className="col-span-12 lg:col-span-6 items-center gap-1.5 py-2">
                  <Label htmlFor="title">Titulo</Label>
                  <Input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="col-span-12 lg:col-span-6 items-center gap-1.5 py-2">
                  <Label htmlFor="title">Fotógrafo</Label>
                  <Input id="title" type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
                </div>
                <div className="col-span-12 lg:col-span-6 items-center gap-1.5 py-2">
                  <Label htmlFor="title">Sección</Label>
                  <Input id="title" type="text" value={section} onChange={(e) => setSection(e.target.value)} />
                </div>
                <div className="w-full items-center gap-1.5 py-2">
                  <Label htmlFor="picture">Imagen</Label>
                  <Input id="picture" type="file" accept="image/*" onChange={handleImageUpload} />
                </div>
                {imagePreview &&
                  <div className="w-full flex items-center justify-center py-5">
                    <Image src={imagePreview} alt="Blogpost Cover" width={400} height={200} />
                  </div>
                }
              </div>
              <DialogFooter>
                <Button disabled={uploading} className='' onClick={() => submitToGallery()}>
                  Registrar
                </Button>
              </DialogFooter>
            </Modal>
            <h1 className='text-2xl font-bold'>{editionData.title}</h1>
            <hr className='my-2' />
            <h2>Portadas</h2>
            <div className="flex">
              {
                editionData.covers.map((cover: any, index: number) => (
                  <div key={index} className="flex flex-col items-center p-4" style={{ backgroundColor: isValidHexColor(cover.bgColor) ? cover.bgColor : "" }}>
                    <img src={cover.url
                      ? cover.url
                      : cover}
                      alt={cover.name}
                      className="w-32 h-32 object-cover"
                    />
                  </div>
                ))
              }
            </div>
            <hr className='my-2' />
            <div className="w-full flex justify-between py-6">
              <h2 className='text-2xl font-bold'>Galería</h2>
              <Button className='bg-primary text-white' onClick={() => setModalOpen(true)}>Agregar</Button>
            </div>
            <div className="grid grid-cols-12 gap-4 p-5">
              {
                editionData.gallery.map((image: any, index: number) => (
                  <div key={index} onClick={() => { setActiveMedia(index); setLightBoxActive(true); }} className='col-span-12 md:col-span-4 lg:col-span-3 gap-y-4 flex flex-col p-5 items-center justify-center cursor-pointer'>
                    <div className="col-span-12 flex items-center justify-center">
                      <img src={image.url} alt={image.title} className="w-32 h-32 object-cover rounded-lg" />
                    </div>
                  </div>
                ))
              }
            </div>
          </Card>
        ) : (
          <p></p>
        )
      }
    </div>
  )
}

export default Edition