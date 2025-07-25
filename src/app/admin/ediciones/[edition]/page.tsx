"use client";

import { addToEditionGallery, getEdition, updateEdition } from "@/app/api";
import Modal from "@/components/toolkit/Modal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams } from "next/navigation";
import React, { useRef } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { uploadFileAction } from "@/app/actions";
import { MoveLeftIcon, MoveRightIcon, XIcon, Edit } from "lucide-react";

function Edition() {
  const params = useParams();
  const { edition } = params;
  const [editionData, setEditionData] = React.useState<any>(null);
  const [uploading, setUploading] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const [subtitle, setSubtitle] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [section, setSection] = React.useState("");
  const [activeMedia, setActiveMedia] = React.useState(0);
  const [lightBoxActive, setLightBoxActive] = React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [deleteIndex, setDeleteIndex] = React.useState(-1);

  // Edit modal states
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [editTitle, setEditTitle] = React.useState("");
  const [editSubtitle, setEditSubtitle] = React.useState("");
  const [editCovers, setEditCovers] = React.useState<Array<any>>([]);
  const [newCoverFile, setNewCoverFile] = React.useState<File | null>(null);
  const [newCoverPreview, setNewCoverPreview] = React.useState<string | null>(
    null
  );
  const [newCoverColor, setNewCoverColor] = React.useState("");
  const [newCoverBgColor, setNewCoverBgColor] = React.useState("");
  const [updatingEdition, setUpdatingEdition] = React.useState(false);
  const newCoverFileRef = useRef<HTMLInputElement>(null);

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
      toast.loading("Registrando Imagen");
      const imgUrl = await uploadFileAction(imageFile as File);

      if (!imgUrl) {
        setModalOpen(false);
        setUploading(false);

        toast.error("Hubo un error al subir la imagen");
        return;
      }

      const payload = {
        title,
        author,
        section,
        url: imgUrl,
      };

      try {
        await addToEditionGallery(edition.toString(), payload);

        toast.dismiss();
        setModalOpen(false);
        setUploading(false);
        getData(edition.toString());

        toast.success("Imagen registrada correctamente");
      } catch (error) {
        setModalOpen(false);
        setUploading(false);
        toast.error("Hubo un error al registrar la imagen");
      }
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

  const deleteEntry = async () => {
    if (edition && deleteIndex !== -1) {
      try {
        toast.loading("Eliminando Imagen");
        const tempEditionData = { ...editionData };
        tempEditionData.gallery.splice(deleteIndex, 1);

        setEditionData(tempEditionData);

        await updateEdition(edition.toString(), tempEditionData);

        toast.dismiss();
        setDeleteModalOpen(false);
        toast.success("Imagen eliminada correctamente");
      } catch (error) {
        setDeleteModalOpen(false);
        toast.error("Hubo un error al eliminar la imagen");
      }
    } else {
      toast.error("Hubo un error al eliminar la imagen");
    }
  };

  const openEditModal = () => {
    if (editionData) {
      setEditTitle(editionData.title);
      setEditSubtitle(editionData.subtitle);
      setEditCovers([...editionData.covers]);
      setEditModalOpen(true);
    }
  };

  const handleNewCoverUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setNewCoverFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewCoverPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetNewCoverFile = () => {
    if (newCoverFileRef.current) {
      newCoverFileRef.current.value = "";
    }
    setNewCoverFile(null);
    setNewCoverPreview(null);
    setNewCoverColor("");
    setNewCoverBgColor("");
  };

  const addNewCover = async () => {
    if (newCoverFile && newCoverPreview) {
      const coverUrl = await uploadFileAction(newCoverFile);
      console.log(coverUrl);
      
      if (coverUrl) {
        const newCover = {
          url: coverUrl,
          color: newCoverColor,
          bgColor: newCoverBgColor,
        };

        const updatedCovers = [...editCovers, newCover];
        setEditCovers(updatedCovers);
        resetNewCoverFile();
      } else {
        toast.error("Error al subir la portada");
      }
    }
  };

  const removeCover = (index: number) => {
    const updatedCovers = editCovers.filter((_, i) => i !== index);
    setEditCovers(updatedCovers);
  };

  const submitEditionUpdate = async () => {
    if (!editTitle || !editSubtitle || editCovers.length === 0) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    if (!edition) {
      toast.error("Error: ID de edición no encontrado");
      return;
    }

    setUpdatingEdition(true);
    toast.loading("Actualizando edición...");

    const updatedEditionData = {
      ...editionData,
      title: editTitle,
      subtitle: editSubtitle,
      covers: editCovers,
    };

    try {
      await updateEdition(edition.toString(), updatedEditionData);
      setEditionData(updatedEditionData);

      toast.dismiss();
      toast.success("Edición actualizada correctamente");
      setEditModalOpen(false);
    } catch (error) {
      toast.dismiss();
      toast.error("Error al actualizar la edición");
    } finally {
      setUpdatingEdition(false);
    }
  };

  React.useEffect(() => {
    if (edition) {
      getData(edition.toString());
    }
  }, []);

  return (
    <div>
      {editionData ? (
        <Card className="p-5">
          <Modal
            title="Confirmación"
            open={deleteModalOpen}
            setOpen={setDeleteModalOpen}
          >
            <div className="w-full max-h-[500px] overflow-y-auto px-5 justify-center items-center">
              <p className="text-center">
                ¿Estás seguro que deseas eliminar esta imagen? Esta acción no es
                reversible
              </p>
            </div>
            <DialogFooter>
              <Button className="bg-red-500" onClick={() => deleteEntry()}>
                Eliminar
              </Button>
            </DialogFooter>
          </Modal>
          {editionData.gallery.length > 0 && (
            <div
              className={`fixed top-0 bottom-0 left-0 right-0 bg-black/50 z-50 flex justify-center items-center ${
                !lightBoxActive ? "hidden" : ""
              }`}
            >
              <XIcon
                className="w-10 h-10 cursor-pointer text-white fixed top-5 right-5"
                onClick={() => setLightBoxActive(false)}
              />
              <div className="flex z-50 items-center gap-5">
                <MoveLeftIcon
                  className="w-10 h-10 cursor-pointer text-white"
                  onClick={() => {
                    if (activeMedia > 0) {
                      setActiveMedia(activeMedia - 1);
                    } else {
                      setActiveMedia(editionData.media.length - 1);
                    }
                  }}
                />
                <div className="w-full md:w-[603px] h-fit min-h-64 bg-black p-5 grid grid-cols-12">
                  <div className="col-span-12 md:col-span-7">
                    <Image
                      src={editionData.gallery[activeMedia].url}
                      alt="activeImage"
                      width={300}
                      height={300}
                    />
                  </div>
                  <div className="col-span-12 md:col-span-5 flex flex-col justify-end">
                    <h1 className="text-sm text-white font-light italic">
                      {editionData.gallery[activeMedia].title}
                    </h1>
                    <p className="text-xs text-white">
                      / Fotografía por {editionData.gallery[activeMedia].author}
                    </p>
                    <p className="text-xs text-white">
                      // Sección "{editionData.gallery[activeMedia].section}"
                    </p>
                  </div>
                </div>
                <MoveRightIcon
                  className="w-10 h-10 cursor-pointer text-white"
                  onClick={() => {
                    if (activeMedia < editionData.gallery.length - 1) {
                      setActiveMedia(activeMedia + 1);
                    } else {
                      setActiveMedia(0);
                    }
                  }}
                />
              </div>
            </div>
          )}

          <Modal
            title="Agregar a Galería"
            open={modalOpen}
            setOpen={setModalOpen}
          >
            <div className="w-full max-h-[500px] overflow-y-auto px-5">
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
                <Label htmlFor="title">Fotógrafo</Label>
                <Input
                  id="title"
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>
              <div className="col-span-12 lg:col-span-6 items-center gap-1.5 py-2">
                <Label htmlFor="title">Sección</Label>
                <Input
                  id="title"
                  type="text"
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                />
              </div>
              <div className="w-full items-center gap-1.5 py-2">
                <Label htmlFor="picture">Imagen</Label>
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
              <Button
                disabled={uploading}
                className=""
                onClick={() => submitToGallery()}
              >
                Registrar
              </Button>
            </DialogFooter>
          </Modal>

          <Modal
            title="Editar Edición"
            open={editModalOpen}
            setOpen={setEditModalOpen}
          >
            <div className="w-full min-h-[500px] max-h-[600px] overflow-y-auto px-5">
              <div className="w-full items-center gap-1.5 py-2">
                <Label htmlFor="edit-subtitle">Edición</Label>
                <Input
                  id="edit-subtitle"
                  type="text"
                  value={editSubtitle}
                  placeholder="Primera Edición..."
                  onChange={(e) => setEditSubtitle(e.target.value)}
                />
              </div>
              <div className="w-full items-center gap-1.5 py-2">
                <Label htmlFor="edit-title">Título</Label>
                <Input
                  id="edit-title"
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
              </div>

              <div className="w-full grid grid-cols-12 gap-x-2">
                <div className="col-span-12 lg:col-span-4 items-center gap-1.5 py-2">
                  <Label htmlFor="new-cover">Nueva Portada</Label>
                  <Input
                    id="new-cover"
                    type="file"
                    accept="image/*"
                    ref={newCoverFileRef}
                    onChange={handleNewCoverUpload}
                  />
                </div>

                <div className="col-span-12 lg:col-span-3 items-center gap-1.5 py-2">
                  <div>
                    <Label htmlFor="new-color">
                      Color{" "}
                      <span className="text-xs text-gray-500">
                        (Hexadecimal)
                      </span>
                    </Label>
                    <div className="w-full grid grid-cols-12 gap-x-2">
                      <Input
                        className="col-span-11 lg:col-span-10"
                        id="new-color"
                        type="text"
                        value={newCoverColor}
                        onChange={(e) => setNewCoverColor(e.target.value)}
                      />
                      <div className="col-span-1 lg:col-span-2 flex items-center justify-end">
                        <div
                          className="h-9 w-9 rounded-md border-[1px] border-solid border-gray-200"
                          style={{
                            backgroundColor: isValidHexColor(newCoverColor)
                              ? newCoverColor
                              : "",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-span-12 lg:col-span-3 items-center gap-1.5 py-2">
                  <div>
                    <Label htmlFor="new-bg-color">
                      Fondo{" "}
                      <span className="text-xs text-gray-500">
                        (Hexadecimal)
                      </span>
                    </Label>
                    <div className="w-full grid grid-cols-12 gap-x-2">
                      <Input
                        className="col-span-11 lg:col-span-10"
                        id="new-bg-color"
                        type="text"
                        value={newCoverBgColor}
                        onChange={(e) => setNewCoverBgColor(e.target.value)}
                      />
                      <div className="col-span-1 lg:col-span-2 flex items-center justify-end">
                        <div
                          className="h-9 w-9 rounded-md border-[1px] border-solid border-gray-200"
                          style={{
                            backgroundColor: isValidHexColor(newCoverBgColor)
                              ? newCoverBgColor
                              : "",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-span-12 lg:col-span-2 flex items-end justify-center py-2">
                  <Button onClick={addNewCover} disabled={!newCoverFile}>
                    Agregar
                  </Button>
                </div>
              </div>

              {editCovers.length > 0 && (
                <div className="grid grid-cols-12 gap-4 mt-4">
                  <div className="col-span-12">
                    <h3 className="text-lg font-semibold mb-2">
                      Portadas Actuales:
                    </h3>
                  </div>
                  {editCovers.map((cover, index) => (
                    <div
                      key={index}
                      className="col-span-12 lg:col-span-4 w-full flex flex-col items-center justify-center p-5 relative rounded-lg"
                      style={{ backgroundColor: cover.bgColor }}
                    >
                      <Button
                        onClick={() => removeCover(index)}
                        className="absolute top-2 right-2 w-6 h-6 p-0 bg-red-500 hover:bg-red-600 rounded-full"
                      >
                        <XIcon className="w-4 h-4 text-white" />
                      </Button>
                      <Image
                        src={cover.url}
                        alt="Cover"
                        width={200}
                        height={200}
                        className="rounded-lg"
                      />
                      <div className="mt-2 text-center">
                        <p className="text-xs">Color: {cover.color}</p>
                        <p className="text-xs">Fondo: {cover.bgColor}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <DialogFooter>
              <Button disabled={updatingEdition} onClick={submitEditionUpdate}>
                {updatingEdition ? "Actualizando..." : "Actualizar"}
              </Button>
            </DialogFooter>
          </Modal>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">{editionData.title}</h1>
            <Button
              onClick={openEditModal}
              className="bg-black hover:bg-gray-800"
            >
              <Edit className="text-white" size={16} />
            </Button>
          </div>
          <hr className="my-2" />
          <h2>Portadas</h2>
          <div className="flex">
            {editionData.covers.map((cover: any, index: number) => (
              <div
                key={index}
                className="flex flex-col items-center p-4"
                style={{
                  backgroundColor: isValidHexColor(cover.bgColor)
                    ? cover.bgColor
                    : "",
                }}
              >
                <img
                  src={cover.url ? cover.url : cover}
                  alt={cover.name}
                  className="w-32 h-32 object-cover"
                />
              </div>
            ))}
          </div>
          <hr className="my-2" />
          <div className="w-full flex justify-between py-6">
            <h2 className="text-2xl font-bold">Galería</h2>
            <Button
              className="bg-primary text-white"
              onClick={() => setModalOpen(true)}
            >
              Agregar
            </Button>
          </div>
          <div className="grid grid-cols-12 gap-4 p-5">
            {editionData.gallery.map((image: any, index: number) => (
              <div
                key={index}
                className="col-span-12 md:col-span-4 lg:col-span-3 gap-y-4 flex flex-col p-5 items-center justify-center cursor-pointer relative"
              >
                <div
                  onClick={() => {
                    setDeleteIndex(index);
                    setDeleteModalOpen(true);
                  }}
                  className="w-5 h-5 absolute flex justify-center items-center rounded-full top-2 right-2 cursor-pointer text-xs bg-red-500"
                >
                  <XIcon className="w-3 h-3 text-white" />
                </div>
                <div
                  onClick={() => {
                    setActiveMedia(index);
                    setLightBoxActive(true);
                  }}
                  className="col-span-12 flex items-center justify-center"
                >
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default Edition;
