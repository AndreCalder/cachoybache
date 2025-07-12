"use client";

import { deleteCreativx, getCreativxs, getLocations, getStates, makeCreativx, makeLocation, makeState, deleteLocation, deleteState } from '@/app/api';
import Selector from '@/app/components/selector';
import Modal from '@/components/toolkit/Modal';
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card';
import { DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash, TrashIcon, X } from 'lucide-react';
import React from 'react'
import { toast } from 'sonner';

function Ubicaciones() {

  const [modalOpen, setModalOpen] = React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [locationModalOpen, setLocationModalOpen] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const [name, setName] = React.useState('');
  const [states, setStates] = React.useState<any[]>([]);
  const [locations, setLocations] = React.useState<any[]>([]);
  const [locationName, setLocationName] = React.useState('');
  const [state, setState] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [zipCode, setZipCode] = React.useState('');
  const [coords, setCoords] = React.useState('');
  const [deleteId, setDeleteId] = React.useState('');
  const [deleteType, setDeleteType] = React.useState<'state' | 'location'>('state');

  const submitData = async () => {
    if (!name) {
      return;
    }
    try {
      setUploading(true);
      toast.loading("Registrando Estado");
      let res = await makeState({ name });
      toast.dismiss();
      toast.success("Estado registrado");
      setUploading(false);
      setModalOpen(false);
    } catch (error) {
      setUploading(false);
      setModalOpen(false);
      toast.error("Error al registrar el estado");
    }
  }

  const submitLocationData = async () => {

    const payload =
    {
      name: locationName,
      address: address,
      zipCode: zipCode,
      coords: coords,
      state: state
    }
    try {

      let res = await makeLocation(payload);
      toast.success("Ubicación registrada");
      setLocationModalOpen(false);
    } catch (error) {
      toast.error("Error al registrar la ubicación");
      setLocationModalOpen(false);
    }
  }

  const getData = async () => {
    try {
      let res = await getLocations();

      let statesRes = await getStates();
      setStates(statesRes.data);
      setLocations(res.data);

    } catch (error) {
    }
  }

  const deleteEntry = async () => {
    setUploading(true);
    const loadingMessage = deleteType === 'state' ? "Eliminando Estado" : "Eliminando Ubicación";
    const successMessage = deleteType === 'state' ? "Estado eliminado" : "Ubicación eliminada";
    toast.loading(loadingMessage);

    try {
      if (deleteType === 'state') {
        await deleteState(deleteId);
      } else {
        await deleteLocation(deleteId);
      }
      toast.dismiss();
      toast.success(successMessage);
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.response?.data?.error || "Error al eliminar");
    }
    setDeleteModalOpen(false);
    setUploading(false);
  }

  React.useEffect(() => {
    if (uploading == false) {
      getData();
    }
  }, [uploading]);
  
  return (
    <div>
      <Modal title='Registrar un Estado' open={modalOpen} setOpen={setModalOpen}>
        <div className="w-full max-h-[500px] overflow-y-auto px-5">
          <Label htmlFor="title">Estado</Label>
          <Input id="title" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <DialogFooter>
          <Button className='' onClick={() => submitData()}>
            Registrar
          </Button>
        </DialogFooter>
      </Modal>

      <Modal title='Registrar un Punto de Venta' open={locationModalOpen} setOpen={setLocationModalOpen}>
        <div className="w-full max-h-[500px] overflow-y-auto px-5">
          <div className="grid grid-cols-12 w-full gap-x-2">
            <div className="col-span-12 lg:col-span-6 items-center gap-1.5 py-2">
              <Label htmlFor="title">Nombre</Label>
              <Input id="title" type="text" value={locationName} onChange={(e) => setLocationName(e.target.value)} />
            </div>
            <div className="col-span-12 lg:col-span-6 items-center gap-1.5 py-2">
              <Selector label="Estado" placeholder='Seleccionar estado' value={state} setValue={setState} options={states} optionLabel='name' optionValue='_id.$oid' />
            </div>
            <div className="col-span-12 lg:col-span-6 items-center gap-1.5 py-2">
              <Label htmlFor="title">Dirección</Label>
              <Input id="address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>

            <div className="col-span-12 lg:col-span-6 items-center gap-1.5 py-2">
              <Label htmlFor="title">Código Postal</Label>
              <Input id="address" type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
            </div>
            <div className="col-span-12 lg:col-span-6 items-center gap-1.5 py-2">
              <Label htmlFor="title">Coordenadas (Google maps)</Label>
              <Input id="address" type="text" value={coords} onChange={(e) => setCoords(e.target.value)} />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button className='' onClick={() => submitLocationData()}>
            Registrar
          </Button>
        </DialogFooter>
      </Modal>

      <Modal title='Confirmación' open={deleteModalOpen} setOpen={setDeleteModalOpen}>
        <div className="w-full max-h-[500px] overflow-y-auto px-5 justify-center items-center" >
          <p className='text-center'>
            ¿Estás seguro que deseas eliminar {deleteType === 'state' ? 'este estado' : 'esta ubicación'}? Esta acción no es reversible
          </p>
        </div>
        <DialogFooter>
          <Button className='bg-red-500' onClick={() => deleteEntry()}>
            Eliminar
          </Button>
        </DialogFooter>
      </Modal>
      <div className="w-full py-4 flex items-center justify-between">
        <h1 className='text-lg font-semibold text-center'>Puntos de Venta</h1>
        <div className="flex gap-x-4">

          <Button onClick={() => setModalOpen(true)}>Agregar Estado</Button>
          <Button onClick={() => setLocationModalOpen(true)}>Agregar Ubicación</Button>
        </div>
      </div>
      <Card className='p-5'>
        <h2>Estados</h2>
        <div className="w-full flex flex-wrap gap-5 py-5" >

          {states.map((state, index) => (
            <div key={index} className="rounded-full bg-gray-200 px-4 py-2 flex items-center justify-center gap-4">
              <p>{state.name}</p>
              <X 
                onClick={() => { 
                  setDeleteId(state._id.$oid); 
                  setDeleteType('state'); 
                  setDeleteModalOpen(true); 
                }} 
                className='cursor-pointer' 
                size={12} 
              />
            </div>
          ))}


        </div>
        <hr />
        <h2 className='pt-5'>
          Ubicaciones
        </h2>
        <div className="w-full grid grid-cols-12 gap-5 py-5">
          {locations.map((location, index) => (
            <div key={index} className="col-span-12 md:col-span-6 px-4 py-2 gap-4 border rounded-lg bg-gray-50 relative">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className='text-md font-bold'>{location.name}</p>
                  <p className="text-xs">{location.address}</p>
                  <p className="text-xs">{location.zipCode}</p>
                </div>
                <X 
                  onClick={() => { 
                    setDeleteId(location._id.$oid); 
                    setDeleteType('location'); 
                    setDeleteModalOpen(true); 
                  }} 
                  className='cursor-pointer text-red-500 hover:text-red-700' 
                  size={16} 
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default Ubicaciones