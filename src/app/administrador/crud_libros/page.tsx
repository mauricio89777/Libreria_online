'use client';

import dynamic from "next/dynamic";

const LibroClient = dynamic(() => import('./libroClient'), {ssr: false});
export default function Page(){
    return (
    <div>
        <LibroClient/>
    </div>
    );
};