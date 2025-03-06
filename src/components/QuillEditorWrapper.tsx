"use client";

import dynamic from "next/dynamic";

const QuillEditor = dynamic(()=>import("@/components/QuillEditor"), {
    ssr: false,
});

export default function QuillEditorWrapper() {
    return <QuillEditor />;
}