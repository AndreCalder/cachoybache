"use client";

import Modal from "@/components/toolkit/Modal";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { uploadFile as apiUploadFile } from "@/app/api";
import { Card } from "@/components/ui/card";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";
import ActionLink from "@/components/toolkit/ActionLink";
import { getEdition, getEditions, makeEdition } from "@/app/api";

interface Cover {
  file: File;
  preview: string;
  color: string;
  bgColor: string;
}
function Ediciones() {
  const [editions, setEditions] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [subtitle, setSubtitle] = useState("");
  const [title, setTitle] = useState("");
  const [covers, setCovers] = useState<Array<Cover>>([]);
  const [hexColor, setHexColor] = useState("");
  const [hexBgColor, setHexBgColor] = useState("");
  const [imageFile, setImageFile] = useState<File>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const imageFileRef = useRef<HTMLInputElement>(null);

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
    setLoading(true);
    toast.loading("Registrando Edición");
    let coverPromiseArr: Promise<string | undefined>[] = [];

    if (covers.length === 0) {
      toast.error("Por favor, agrega al menos una portada");
      setLoading(false);
      return;
    } else {
      covers.map((cover, index) => {
        if (!isValidHexColor(cover.bgColor)) {
          toast.error("Por favor, agrega un color de fondo válido");
          setLoading(false);
          return;
        }
        if (!isValidHexColor(cover.color)) {
          toast.error("Por favor, agrega un color válido");
          setLoading(false);
          return;
        }
      });
    }
    covers.map((cover, index) => {
      if (cover.file) {
        coverPromiseArr.push(apiUploadFile(cover.file));
      }
    });

    let coverUrls = await Promise.all(coverPromiseArr);

    let data: {
      title: string;
      subtitle: string;
      gallery: Array<{}>;
      covers: Array<{ url: string; color: string }>;
    } = {
      title: title,
      subtitle: subtitle,
      gallery: [],
      covers: [
        ...covers.map((cover, index) => {
          return {
            url: coverUrls[index] || "",
            color: cover.color || "",
            bgColor: cover.bgColor || "",
          };
        }),
      ],
    };

    let res = await makeEdition(data);

    setModalOpen(false);
    getEditionsData();
    setLoading(false);
    toast.dismiss();
    toast.success("Edición registrada");
  };

  function isValidHexColor(hex: string) {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
  }

  const setColor = (color: string) => {
    setHexColor(color);
  };

  const resetFile = () => {
    if (imageFileRef.current) {
      imageFileRef.current.value = "";
    }
  };
  const addVariant = () => {
    if (imageFile && imagePreview) {
      let variant = {
        file: imageFile,
        preview: imagePreview,
        color: hexColor,
        bgColor: hexBgColor,
      };

      let tempCovers = [...covers];
      tempCovers.push(variant);

      setCovers(tempCovers);
      resetFile();
      setHexColor("");
      setHexBgColor("");
    }
  };

  const getEditionsData = async () => {
    let res = await getEditions();

    setEditions(res.data);
  };

  useEffect(() => {
    getEditionsData();
  }, []);

  return (
    <div>
      <Modal
        title="Registrar una Edición"
        open={modalOpen}
        setOpen={setModalOpen}
      >
        <div className="w-full min-h-[500px] max-h-[600px] overflow-y-auto px-5">
          <div className="w-full items-center gap-1.5 py-2">
            <Label htmlFor="title">Edición</Label>
            <Input
              id="title"
              type="text"
              value={subtitle}
              placeholder="Primera Edición..."
              onChange={(e) => setSubtitle(e.target.value)}
            />
          </div>
          <div className="w-full items-center gap-1.5 py-2">
            <Label htmlFor="title">Titulo</Label>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="w-full grid grid-cols-12 gap-x-2">
            <div className="col-span-12 lg:col-span-4 items-center gap-1.5 py-2">
              <Label htmlFor="picture">
                Imagen <span></span>
              </Label>
              <Input
                id="picture"
                type="file"
                accept="image/*"
                ref={imageFileRef}
                onChange={handleImageUpload}
              />
            </div>

            <div className="col-span-12 lg:col-span-3 items-center gap-1.5 py-2">
              <div>
                <Label htmlFor="picture">
                  Color{" "}
                  <span className="text-xs text-gray-500">(Hexadecimal)</span>
                </Label>
                <div className="w-full grid grid-cols-12 gap-x-2">
                  <Input
                    className="col-span-11 lg:col-span-10"
                    id="picture"
                    type="text"
                    value={hexColor}
                    onChange={(e) => setColor(e.target.value)}
                  />
                  <div className="col-span-1 lg:col-span-2 flex items-center justify-end">
                    <div
                      className="h-9 w-9 rounded-md border-[1px] border-solid border-gray-200"
                      style={{
                        backgroundColor: isValidHexColor(hexColor)
                          ? hexColor
                          : "",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-3 items-center gap-1.5 py-2">
              <div>
                <Label htmlFor="picture">
                  Fondo{" "}
                  <span className="text-xs text-gray-500">(Hexadecimal)</span>
                </Label>
                <div className="w-full grid grid-cols-12 gap-x-2">
                  <Input
                    className="col-span-11 lg:col-span-10"
                    id="picture"
                    type="text"
                    value={hexBgColor}
                    onChange={(e) => setHexBgColor(e.target.value)}
                  />
                  <div className="col-span-1 lg:col-span-2 flex items-center justify-end">
                    <div
                      className="h-9 w-9 rounded-md border-[1px] border-solid border-gray-200"
                      style={{
                        backgroundColor: isValidHexColor(hexBgColor)
                          ? hexBgColor
                          : "",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-2 flex items-end justify-center py-2">
              <Button onClick={() => addVariant()}>Agregar</Button>
            </div>
          </div>

          {covers.length > 0 && (
            <div className="grid grid-cols-12 gap-4">
              {covers.map((cover, index) => (
                <div
                  key={index}
                  className={`col-span-12 lg:col-span-4 w-full flex items-center justify-center p-5`}
                  style={{ backgroundColor: cover.bgColor }}
                >
                  <Image
                    src={cover.preview}
                    alt="Blogpost Cover"
                    width={400}
                    height={200}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <DialogFooter>
          <Button className="" onClick={() => submitData()}>
            Registrar
          </Button>
        </DialogFooter>
      </Modal>
      <div className="w-full py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-center">Ediciones</h1>
        <Button onClick={() => setModalOpen(true)}>Agregar Edición</Button>
      </div>
      <Card>
        <div className="grid grid-cols-12 gap-4 p-5">
          {editions.map((edition: any, index: number) => (
            <div key={index} className="col-span-12 grid grid-cols-12 gap-x-4">
              <div className="col-span-2 flex items-center justify-center">
                <Image
                  className="rounded-lg"
                  src={edition.covers[0].url}
                  alt={edition.title}
                  width={100}
                  height={100}
                />
              </div>
              <div className="col-span-4 flex flex-col items-start justify-between">
                <h1 className="text-left text-lg font-semibold">
                  {edition.title}
                </h1>
                <p className="text-left  font-light text-sm">
                  Portadas: {edition.covers.length}
                </p>
              </div>
              <div className="col-span-3"></div>
              <div className="col-span-3 flex  gap-5">
                <ActionLink
                  href={`/admin/ediciones/${edition._id.$oid}`}
                  icon={<Edit size={12} />}
                  bg="bg-gray-500"
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default Ediciones;
