"use client"

import Modal from '@/components/toolkit/Modal';
import { Button } from '@/components/ui/button';
import { DialogContent, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { toast } from 'sonner';
import { uploadFileAction } from '@/app/actions';
import { Card } from '@/components/ui/card';
import { Edit, Trash } from 'lucide-react';
import Link from 'next/link';
import ActionLink from '@/components/toolkit/ActionLink';

function Ediciones() {

    const [editions, setEditions] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    return (
        <div>page</div>
    )
}

export default Ediciones 