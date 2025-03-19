"use client";

import { deleteCreativx, getCreativxs, makeCreativx } from '@/app/api';
import Modal from '@/components/toolkit/Modal';
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card';
import { DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash, TrashIcon, X } from 'lucide-react';
import React from 'react'
import { toast } from 'sonner';

function Creativxs() {
    const [modalOpen, setModalOpen] = React.useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
    const [uploading, setUploading] = React.useState(false);
    const [name, setName] = React.useState('');
    const [creativxs, setCreativxs] = React.useState<{ _id: { $oid: string }, name: string }[]>([]);
    const [deleteId, setDeleteId] = React.useState('');

    const submitData = async () => {
        if (!name) {
            return;
        }
        try {
            setUploading(true);
            toast.loading("Registrando Creativx");
            let res = await makeCreativx({ name });
            toast.dismiss();
            toast.success("Creativx registrado");
            setUploading(false);
            setModalOpen(false);
        } catch (error) {
            setUploading(false);
        }
    }

    const getData = async () => {
        try {
            let res = await getCreativxs();
            setCreativxs(res.data);
        } catch (error) {
        }
    }

    const deleteEntry = async () => {
        setUploading(true);
        toast.loading("Eliminando Creativx");

        try {
            let res = await deleteCreativx(deleteId);
            toast.dismiss();
            toast.success("Creativx eliminado");
        } catch (error: any) {
            toast.dismiss();
            toast.error(error.response.data.error);
        }
        setDeleteModalOpen(false);
        setUploading(false);
    }
    React.useEffect(() => {
        if (uploading == false) {
            getData();
        }
    }, [uploading])
    return (
        <div>
            <Modal title='Registrar un Evento' open={modalOpen} setOpen={setModalOpen}>
                <div className="w-full max-h-[500px] overflow-y-auto px-5">
                    <Label htmlFor="title">Nombre</Label>
                    <Input id="title" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <DialogFooter>
                    <Button className='' onClick={() => submitData()}>
                        Registrar
                    </Button>
                </DialogFooter>
            </Modal>
            <Modal title='Confirmación' open={deleteModalOpen} setOpen={setDeleteModalOpen}>
                <div className="w-full max-h-[500px] overflow-y-auto px-5 justify-center items-center" >
                    <p className='text-center'>¿Estás seguro que deseas eliminar esta persona? Esta acción no es reversible</p>
                </div>
                <DialogFooter>
                    <Button className='bg-red-500' onClick={() => deleteEntry()}>
                        Eliminar
                    </Button>
                </DialogFooter>
            </Modal>
            <div className="w-full py-4 flex items-center justify-between">
                <h1 className='text-lg font-semibold text-center'>Creativxs</h1>
                <Button onClick={() => setModalOpen(true)}>Agregar</Button>
            </div>
            <Card>
                <div className="w-full flex flex-wrap gap-5 p-5" >
                    {creativxs.map((creativx, index) => (
                        <div key={index} className="rounded-full bg-gray-200 px-4 py-2 flex items-center justify-center gap-4">
                            <p>{creativx.name}</p>
                            <X onClick={(() => { setDeleteId(creativx._id.$oid); setDeleteModalOpen(true); })} className='cursor-pointer' size={12} />
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    )
}

export default Creativxs