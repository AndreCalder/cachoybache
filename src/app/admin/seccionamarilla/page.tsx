"use client";

import React, { useEffect, useState } from "react";
import {
  getSeccionAmarilla,
  createSeccionAmarillaEntry,
  deleteSeccionAmarillaEntry,
  uploadPdf,
} from "@/app/api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Modal from "@/components/toolkit/Modal";
import { DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Trash2, FileText, ExternalLink } from "lucide-react";

interface SeccionAmarillaEntry {
  _id: { $oid: string };
  title: string;
  url: string;
}

function SeccionAmarilla() {
  const [entries, setEntries] = useState<SeccionAmarillaEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Upload modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfFileName, setPdfFileName] = useState("");

  // Delete modal states
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [deleting, setDeleting] = useState(false);

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const response = await getSeccionAmarilla();
      setEntries(response.data.data || response.data || []);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al cargar los archivos");
      console.error("Error fetching seccion amarilla:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  useEffect(() => {
    if (modalOpen) {
      setTitle("");
      setPdfFile(null);
      setPdfFileName("");
    }
  }, [modalOpen]);

  const handlePdfUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      if (file.type !== "application/pdf") {
        toast.error("Solo se permiten archivos PDF");
        return;
      }
      setPdfFile(file);
      setPdfFileName(file.name);
    }
  };

  const submitUpload = async () => {
    if (!pdfFile || !title.trim()) {
      toast.error("Por favor ingresa un título y selecciona un archivo PDF");
      return;
    }

    setUploading(true);
    toast.loading("Subiendo archivo PDF...");

    try {
      // Upload PDF file
      const pdfUrl = await uploadPdf(pdfFile);

      if (!pdfUrl) {
        throw new Error("No se recibió URL del archivo");
      }

      // Create entry in database
      toast.loading("Guardando información...");
      await createSeccionAmarillaEntry({ title: title.trim(), url: pdfUrl });

      toast.dismiss();
      toast.success("Archivo agregado correctamente");
      setModalOpen(false);
      fetchEntries();
    } catch (error) {
      console.error("Error uploading PDF:", error);
      toast.dismiss();
      toast.error("Error al subir el archivo");
    } finally {
      setUploading(false);
    }
  };

  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    setDeleting(true);
    toast.loading("Eliminando archivo...");

    try {
      await deleteSeccionAmarillaEntry(deleteId);
      toast.dismiss();
      toast.success("Archivo eliminado correctamente");
      setDeleteModalOpen(false);
      fetchEntries();
    } catch (error: any) {
      console.error("Error deleting entry:", error);
      toast.dismiss();
      toast.error(error.response?.data?.error || "Error al eliminar el archivo");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <Card className="p-5">
        <p>Cargando...</p>
      </Card>
    );
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

  return (
    <div>
      {/* Upload Modal */}
      <Modal title="Agregar PDF" open={modalOpen} setOpen={setModalOpen}>
        <div className="w-full max-h-[500px] overflow-y-auto px-5">
          <div className="w-full items-center gap-1.5 py-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nombre del documento"
            />
          </div>

          <div className="w-full items-center gap-1.5 py-2">
            <Label htmlFor="pdf">Archivo PDF</Label>
            <Input
              id="pdf"
              type="file"
              accept="application/pdf"
              onChange={handlePdfUpload}
            />
            {pdfFileName && (
              <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                {pdfFileName}
              </p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={uploading || !pdfFile || !title.trim()}
            onClick={submitUpload}
          >
            {uploading ? "Subiendo..." : "Agregar"}
          </Button>
        </DialogFooter>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirmación"
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
      >
        <div className="w-full max-h-[500px] overflow-y-auto px-5 justify-center items-center">
          <p className="text-center">
            ¿Estás seguro que deseas eliminar este archivo? Esta acción no es
            reversible.
          </p>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setDeleteModalOpen(false)}
            disabled={deleting}
          >
            Cancelar
          </Button>
          <Button
            className="bg-red-500 hover:bg-red-600"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? "Eliminando..." : "Eliminar"}
          </Button>
        </DialogFooter>
      </Modal>

      {/* Header */}
      <div className="w-full py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Sección Amarilla</h1>
        <Button onClick={() => setModalOpen(true)}>Agregar PDF</Button>
      </div>

      {/* Content */}
      <Card className="p-5">
        {entries.length > 0 ? (
          <div className="w-full grid grid-cols-12 gap-4">
            {entries.map((entry) => (
              <div
                key={entry._id.$oid}
                className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 border rounded-lg p-4 flex flex-col gap-3 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="bg-yellow-100 p-3 rounded-lg shrink-0">
                      <FileText className="w-8 h-8 text-yellow-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-800 truncate">
                        {entry.title}
                      </h3>
                      <p className="text-xs text-gray-500">PDF</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t">
                  <a
                    href={entry.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Ver PDF
                  </a>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => confirmDelete(entry._id.$oid)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-gray-400 text-6xl mb-4">📄</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              No hay archivos aún
            </h3>
            <p className="text-gray-500">
              Agrega tu primer PDF a la Sección Amarilla
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}

export default SeccionAmarilla;
