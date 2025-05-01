'use client';

import dynamic from "next/dynamic";

const UsuarioClient = dynamic(() => import('./usuarioClient'), {ssr: false});

export default function Page(){
    return (
    <div>
        <UsuarioClient/>
    </div>
    );
};