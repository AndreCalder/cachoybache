"use client";

import { createEvent, getCreativxs, getEvents, deleteEvent, getAllEvents } from "@/app/api";
import Modal from "@/components/toolkit/Modal";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { uploadFileAction } from "@/app/actions";
import { Card } from "@/components/ui/card";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";
import ActionLink from "@/components/toolkit/ActionLink";
import Selector from "@/app/components/selector";

function Eventos() {
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [place, setPlace] = useState("");
  const [reload, setReload] = useState(false);
  const [creativxs, setCreativxs] = useState([]);
  const [creativx, setCreativx] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<any>(null);

  const getData = async () => {
    try {
      const res = await getAllEvents();
      const creativxRes = await getCreativxs();
      console.log(res.data);
      setEvents(res.data.data);
      setCreativxs(creativxRes.data);
      setLoading(false);
    } catch (error) {
      toast.error("Hubo un error al cargar los eventos");
    }
  };

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

  const submitData = async () => {
    if (!title || !date || !imageFile) {
      toast.error("Por favor llena todos los campos");
      return;
    } else {
      toast.loading("Registrando evento...");

      try {
        const coverURL = await uploadFileAction(imageFile);

        if (coverURL === "") {
          toast.dismiss();
          toast.error("Hubo un error al subir la imagen");
          return;
        }

        const data: {
          title: string;
          date: string;
          cover: string;
          location: string;
          creativx: string;
          media: any[];
        } = {
          title: title,
          date: date,
          location: place,
          creativx: creativx,
          cover: coverURL || "",
          media: [],
        };

        const res = await createEvent(data);

        toast.dismiss();
        toast.success("Evento registrado exitosamente");

        setModalOpen(false);
        setReload(!reload);
      } catch (error) {
        toast.dismiss();
        toast.error("Hubo un error al subir la imagen");
        return;
      }
    }
  };

  const handleDeleteEvent = async () => {
    if (!eventToDelete) return;

    try {
      toast.loading("Eliminando evento...");
      await deleteEvent(eventToDelete._id.$oid);

      toast.dismiss();
      toast.success("Evento eliminado exitosamente");

      setDeleteModalOpen(false);
      setEventToDelete(null);
      setReload(!reload);
    } catch (error) {
      toast.dismiss();
      toast.error("Hubo un error al eliminar el evento");
    }
  };

  useEffect(() => {
    getData();
  }, [reload]);
  return (
    <div>
      <Modal
        title="Registrar un Evento"
        open={modalOpen}
        setOpen={setModalOpen}
      >
        <div className="w-full max-h-[500px] overflow-y-auto px-5">
          <div className="grid grid-cols-12 w-full gap-x-2">
            <div className="col-span-12 lg:col-span-6 items-center gap-1.5 py-2">
              <Label htmlFor="title">Titulo</Label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="col-span-12 lg:col-span-6 items-center gap-1.5 py-2">
              <Selector
                label="Creativx"
                placeholder="Seleccionar creativxs"
                value={creativx}
                setValue={setCreativx}
                options={creativxs}
                optionLabel="name"
                optionValue="_id.$oid"
              />
            </div>
          </div>
          <div className="grid grid-cols-12 w-full gap-x-2">
            <div className="col-span-12 lg:col-span-6 items-center gap-1.5 py-2">
              <Label htmlFor="title">Fecha</Label>
              <Input
                id="title"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="col-span-12 lg:col-span-6 items-center gap-1.5 py-2">
              <Label htmlFor="place">Lugar</Label>
              <Input
                id="place"
                type="text"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full items-center gap-1.5 py-2">
            <Label htmlFor="picture">Portada</Label>
            <Input
              id="picture"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
          {imagePreview && (
            <div className="w-full flex items-center justify-center py-5">
              <Image
                src={imagePreview}
                alt="Blogpost Cover"
                width={400}
                height={200}
              />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button className="" onClick={() => submitData()}>
            Registrar
          </Button>
        </DialogFooter>
      </Modal>

      <Modal
        title="Confirmación"
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
      >
        <div className="w-full max-h-[500px] overflow-y-auto px-5 justify-center items-center">
          <p className="text-center">
            ¿Estás seguro que deseas eliminar este evento? Esta acción no es
            reversible
          </p>
        </div>
        <DialogFooter>
          <Button className="bg-red-500" onClick={handleDeleteEvent}>
            Eliminar
          </Button>
        </DialogFooter>
      </Modal>

      <div className="w-full py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-center">Eventos</h1>
        <Button onClick={() => setModalOpen(true)}>Agregar Evento</Button>
      </div>
      {loading && (
        <div className="w-full flex items-center justify-center">
          <p>Cargando...</p>
        </div>
      )}
      <Card>
        <div className="grid grid-cols-12 gap-4 p-5">
          {events.map((event: any, index: number) => (
            <div key={index} className="col-span-12 grid grid-cols-12 gap-x-4">
              <div className="col-span-12 md:col-span-3 flex items-center justify-center py-2">
                <div
                  className="aspect-square bg-cover bg-center w-56"
                  style={{ backgroundImage: `url(${event.cover})` }}
                ></div>
              </div>
              <div className="col-span-5 flex flex-col items-start justify-between">
                <h1 className="text-left text-lg font-semibold">
                  {event.title}
                </h1>
                <p className="text-left text-md ">{event.creativx.name}</p>
                <p className="text-left  font-light text-sm">{event.date}</p>
                <p className="text-left font-light text-sm">
                  Imágenes: {event.media.length}
                </p>
              </div>
              <div className="col-span-4 flex  gap-5">
                <ActionLink
                  href={`/admin/eventos/${event._id.$oid}`}
                  icon={<Edit size={12} />}
                  bg="bg-gray-500"
                />
                <Button
                  className="bg-red-500 hover:bg-red-600 p-2 h-8 w-8"
                  onClick={() => {
                    setEventToDelete(event);
                    setDeleteModalOpen(true);
                  }}
                >
                  <Trash size={12} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default Eventos;
