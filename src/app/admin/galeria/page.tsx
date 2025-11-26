"use client";

import React, { useEffect, useState } from "react";
import { getGalleryById, updateGallery, uploadFile } from "@/app/api";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Modal from "@/components/toolkit/Modal";
import { DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Edit, Trash2, MoveLeftIcon, MoveRightIcon, XIcon } from "lucide-react";

const GALLERY_ID = "692717d55f3bd41a441f0db7";

interface GalleryImage {
  url: string;
  title?: string;
  author?: string;
  section?: string;
}

interface Gallery {
  _id: { $oid: string };
  title: string;
  cover: string;
  images: GalleryImage[];
}

function Galeria() {
  const [gallery, setGallery] = useState<Gallery | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [lightBoxActive, setLightBoxActive] = useState(false);

  // Upload modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageTitle, setImageTitle] = useState("");
  const [imageAuthor, setImageAuthor] = useState("");
  const [imageSection, setImageSection] = useState("");

  // Edit modal states
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editCoverFile, setEditCoverFile] = useState<File | null>(null);
  const [editCoverPreview, setEditCoverPreview] = useState<string | null>(null);
  const [updatingGallery, setUpdatingGallery] = useState(false);

  const [removingImageIndex, setRemovingImageIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const response = await getGalleryById(GALLERY_ID);
        setGallery(response.data.data);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || "Error al cargar la galería");
        console.error("Error fetching gallery:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightBoxActive(false);
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  useEffect(() => {
    if (modalOpen) {
      setImageFile(null);
      setImagePreview(null);
      setImageTitle("");
      setImageAuthor("");
      setImageSection("");
    }
  }, [modalOpen]);

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

  const handleCoverUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setEditCoverFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditCoverPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const openEditModal = () => {
    if (gallery) {
      setEditTitle(gallery.title);
      setEditCoverPreview(gallery.cover);
      setEditModalOpen(true);
    }
  };

  const submitGalleryUpdate = async () => {
    if (!gallery) return;

    setUpdatingGallery(true);
    toast.loading("Actualizando galería...");

    try {
      let coverUrl = gallery.cover;

      // First: Upload new cover if selected
      if (editCoverFile) {
        toast.loading("Subiendo portada...");
        const uploadResult = await uploadFile(editCoverFile);
        if (uploadResult) {
          coverUrl = uploadResult;
        } else {
          throw new Error("Error al subir la portada");
        }
      }

      // Then: Update gallery with new data
      const updatedGalleryData = {
        title: editTitle,
        cover: coverUrl,
        images: gallery.images,
      };

      toast.loading("Guardando cambios...");
      await updateGallery(GALLERY_ID, updatedGalleryData);

      setGallery({ ...gallery, ...updatedGalleryData });

      toast.dismiss();
      toast.success("Galería actualizada correctamente");

      setEditModalOpen(false);
      setEditCoverFile(null);
    } catch (error) {
      console.error("Error updating gallery:", error);
      toast.dismiss();
      toast.error("Error al actualizar la galería");
    } finally {
      setUpdatingGallery(false);
    }
  };

  const submitImageUpload = async () => {
    if (!imageFile || !gallery) return;

    setUploading(true);
    toast.loading("Subiendo imagen...");

    try {
      // First: Upload image file to get URL
      const imageUrl = await uploadFile(imageFile);

      if (!imageUrl) {
        throw new Error("No se recibió URL de la imagen");
      }

      const newImage: GalleryImage = {
        url: imageUrl,
        title: imageTitle || undefined,
        author: imageAuthor || undefined,
        section: imageSection || undefined,
      };

      // Then: Update gallery with the new image
      const updatedImages = [...gallery.images, newImage];

      toast.loading("Guardando en galería...");
      await updateGallery(GALLERY_ID, { images: updatedImages });

      setGallery({ ...gallery, images: updatedImages });

      toast.dismiss();
      toast.success("Imagen agregada correctamente");
      setModalOpen(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.dismiss();
      toast.error("Error al subir la imagen");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = async (indexToRemove: number) => {
    if (!gallery) return;

    setRemovingImageIndex(indexToRemove);
    toast.loading("Eliminando imagen...");

    try {
      const updatedImages = gallery.images.filter(
        (_, idx) => idx !== indexToRemove
      );

      // Update gallery in backend
      await updateGallery(GALLERY_ID, { images: updatedImages });

      // Adjust lightbox state if needed
      if (lightBoxActive) {
        if (selectedImageIndex === indexToRemove) {
          setLightBoxActive(false);
        } else if (selectedImageIndex > indexToRemove) {
          setSelectedImageIndex(selectedImageIndex - 1);
        }
      }

      setGallery({ ...gallery, images: updatedImages });

      toast.dismiss();
      toast.success("Imagen eliminada");
    } catch (error) {
      console.error("Error removing image:", error);
      toast.dismiss();
      toast.error("Error al eliminar la imagen");
    } finally {
      setRemovingImageIndex(null);
    }
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return (
      <Card className="p-5">
        <div className="text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </Card>
    );
  }

  if (!gallery) {
    return (
      <Card className="p-5">
        <div className="text-center">
          <p className="text-gray-600 text-lg">No se encontró la galería</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-5">
      {/* Upload Modal */}
      <Modal title="Agregar Imagen" open={modalOpen} setOpen={setModalOpen}>
        <div className="w-full max-h-[500px] overflow-y-auto px-5">
          <div className="w-full items-center gap-1.5 py-2">
            <Label htmlFor="picture">Imagen</Label>
            <Input
              id="picture"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>

          <div className="w-full items-center gap-1.5 py-2">
            <Label htmlFor="image-title">Título (opcional)</Label>
            <Input
              id="image-title"
              type="text"
              value={imageTitle}
              onChange={(e) => setImageTitle(e.target.value)}
              placeholder="Título de la imagen"
            />
          </div>

          <div className="w-full items-center gap-1.5 py-2">
            <Label htmlFor="image-author">Autor (opcional)</Label>
            <Input
              id="image-author"
              type="text"
              value={imageAuthor}
              onChange={(e) => setImageAuthor(e.target.value)}
              placeholder="Autor de la imagen"
            />
          </div>

          <div className="w-full items-center gap-1.5 py-2">
            <Label htmlFor="image-section">Sección (opcional)</Label>
            <Input
              id="image-section"
              type="text"
              value={imageSection}
              onChange={(e) => setImageSection(e.target.value)}
              placeholder="Sección de la imagen"
            />
          </div>

          {imagePreview && (
            <div className="w-full flex items-center justify-center py-5">
              <Image
                src={imagePreview}
                alt="Preview"
                width={300}
                height={200}
              />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            disabled={uploading || !imageFile}
            onClick={submitImageUpload}
          >
            {uploading ? "Subiendo..." : "Agregar"}
          </Button>
        </DialogFooter>
      </Modal>

      {/* Edit Gallery Modal */}
      <Modal
        title="Editar Galería"
        open={editModalOpen}
        setOpen={setEditModalOpen}
      >
        <div className="w-full max-h-[500px] overflow-y-auto px-5">
          <div className="w-full items-center gap-1.5 py-2">
            <Label htmlFor="edit-title">Título</Label>
            <Input
              id="edit-title"
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Título de la galería"
            />
          </div>

          <div className="w-full items-center gap-1.5 py-2">
            <Label htmlFor="edit-cover">
              {editCoverPreview
                ? "Cambiar imagen de portada"
                : "Imagen de Portada"}
            </Label>
            <Input
              id="edit-cover"
              type="file"
              accept="image/*"
              onChange={handleCoverUpload}
            />
          </div>

          {editCoverPreview && (
            <div className="w-full flex items-center justify-center py-5">
              <Image
                src={editCoverPreview}
                alt="Cover Preview"
                width={400}
                height={200}
              />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button disabled={updatingGallery} onClick={submitGalleryUpdate}>
            {updatingGallery ? "Actualizando..." : "Actualizar"}
          </Button>
        </DialogFooter>
      </Modal>

      {/* Lightbox Modal */}
      {gallery.images?.length > 0 && (
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
                if (selectedImageIndex > 0) {
                  setSelectedImageIndex(selectedImageIndex - 1);
                } else {
                  setSelectedImageIndex(gallery.images.length - 1);
                }
              }}
            />
            <Card className="w-fit h-fit p-5">
              <div className="relative">
                <Image
                  src={gallery.images[selectedImageIndex].url}
                  alt={gallery.images[selectedImageIndex].title || "Imagen"}
                  width={600}
                  height={500}
                />
                {(gallery.images[selectedImageIndex].title ||
                  gallery.images[selectedImageIndex].author ||
                  gallery.images[selectedImageIndex].section) && (
                  <div className="mt-4">
                    {gallery.images[selectedImageIndex].title && (
                      <h2 className="text-xl font-bold mb-1">
                        {gallery.images[selectedImageIndex].title}
                      </h2>
                    )}
                    {gallery.images[selectedImageIndex].author && (
                      <p className="text-sm text-gray-600 mb-1">
                        Por {gallery.images[selectedImageIndex].author}
                      </p>
                    )}
                    {gallery.images[selectedImageIndex].section && (
                      <p className="text-xs text-gray-500">
                        {gallery.images[selectedImageIndex].section}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </Card>
            <MoveRightIcon
              className="w-10 h-10 cursor-pointer text-white"
              onClick={() => {
                if (selectedImageIndex < gallery.images.length - 1) {
                  setSelectedImageIndex(selectedImageIndex + 1);
                } else {
                  setSelectedImageIndex(0);
                }
              }}
            />
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-6">
          {gallery.cover && (
            <Image
              src={gallery.cover}
              alt={gallery.title}
              width={500}
              height={500}
              className="rounded-lg object-cover h-64 w-full"
            />
          )}
        </div>
        <div className="col-span-12 md:col-span-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">{gallery.title}</h2>
              <p className="text-gray-600 mt-2">
                {gallery.images?.length || 0} imágenes
              </p>
            </div>
            <Button onClick={openEditModal} className="ml-4 bg-black">
              <Edit className="text-white" size={16} />
            </Button>
          </div>
        </div>
      </div>

      <Separator className="my-4" />

      {/* Gallery Section */}
      <div className="w-full flex justify-between py-6">
        <h2 className="text-2xl font-bold">Imágenes</h2>
        <Button
          className="bg-primary text-white"
          onClick={() => setModalOpen(true)}
        >
          Agregar
        </Button>
      </div>

      <div className="w-full min-h-48 overflow-y-scroll grid grid-cols-12">
        {gallery.images && gallery.images.length > 0 ? (
          gallery.images.map((image, index) => (
            <div
              key={index}
              className="col-span-12 md:col-span-4 lg:col-span-3 gap-y-4 flex flex-col p-5 items-center justify-center cursor-pointer relative"
            >
              <Button
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white h-8 w-8 p-0 rounded z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(index);
                }}
                disabled={removingImageIndex === index}
                title="Eliminar"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
              <div
                onClick={() => {
                  setSelectedImageIndex(index);
                  setLightBoxActive(true);
                }}
                className="h-40 w-full rounded-md"
                style={{
                  backgroundImage: `url(${image.url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <div className="text-center w-full">
                {image.title && (
                  <p className="text-sm font-semibold truncate">
                    {image.title}
                  </p>
                )}
                {image.author && (
                  <p className="text-xs text-gray-600 truncate">
                    Por {image.author}
                  </p>
                )}
                {image.section && (
                  <p className="text-xs text-gray-500 truncate">
                    {image.section}
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-12 text-center py-20">
            <div className="text-gray-400 text-6xl mb-4">📷</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              No hay imágenes aún
            </h3>
            <p className="text-gray-500">
              Esta galería está esperando su primera imagen
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}

export default Galeria;
