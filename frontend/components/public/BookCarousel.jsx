/* eslint-disable react/prop-types */

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function BookCarousel({ images }) {
    const safeImages = images || [];
    const [current, setCurrent] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [thumbStart, setThumbStart] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });

    const thumbsPerView = 4;
    const maxThumbStart = Math.max(0, safeImages.length - thumbsPerView);

    const prev = () => {
        setIsZoomed(false);
        setCurrent((c) => (c === 0 ? safeImages.length - 1 : c - 1));
    };
    const next = () => {
        setIsZoomed(false);
        setCurrent((c) => (c === safeImages.length - 1 ? 0 : c + 1));
    };
    const prevThumbs = () => setThumbStart((s) => Math.max(0, s - 1));
    const nextThumbs = () => setThumbStart((s) => Math.min(maxThumbStart, s + 1));
    const openViewer = () => {
        setIsZoomed(false);
        setZoomOrigin({ x: 50, y: 50 });
        setIsViewerOpen(true);
    };
    const closeViewer = () => {
        setIsZoomed(false);
        setIsViewerOpen(false);
    };

    const toggleZoom = () => {
        setIsZoomed((z) => !z);
    };

    const handleZoomMove = (event) => {
        if (!isZoomed) return;

        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        setZoomOrigin({
            x: Math.min(100, Math.max(0, x)),
            y: Math.min(100, Math.max(0, y)),
        });
    };

    useEffect(() => {
        if (!isViewerOpen) return;

        const onKeyDown = (event) => {
            if (event.key === "Escape") {
                setIsViewerOpen(false);
            }
            if (event.key === "ArrowLeft") {
                setCurrent((c) => (c === 0 ? safeImages.length - 1 : c - 1));
            }
            if (event.key === "ArrowRight") {
                setCurrent((c) => (c === safeImages.length - 1 ? 0 : c + 1));
            }
        };

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        globalThis.addEventListener("keydown", onKeyDown);

        return () => {
            document.body.style.overflow = originalOverflow;
            globalThis.removeEventListener("keydown", onKeyDown);
        };
    }, [isViewerOpen, safeImages.length]);

    useEffect(() => {
        setThumbStart((start) => {
            if (current < start) {
                return current;
            }

            if (current >= start + thumbsPerView) {
                return current - thumbsPerView + 1;
            }

            return start;
        });
    }, [current, thumbsPerView]);

    if (safeImages.length === 0) return null;

    return (
        <div className="relative w-full">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[18px] bg-[#f0e6d9]">
                <button
                    type="button"
                    onClick={openViewer}
                    className="group absolute inset-0 z-10"
                    aria-label={`Ouvrir la page ${current + 1} en grand`}
                />
                <Image
                    src={safeImages[current].src}
                    alt={safeImages[current].alt || `Page ${current + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 90vw, 40vw"
                />
                <button
                    type="button"
                    onClick={openViewer}
                    className="absolute right-2 top-2 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-[#2c1a10]/20 bg-white/90 text-[#2c1a10] shadow-[0_2px_10px_rgba(0,0,0,0.2)] transition hover:bg-white"
                    aria-label="Zoomer l'image"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                        <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 104.473 8.701l2.663 2.663a.75.75 0 101.06-1.06l-2.664-2.664A5.5 5.5 0 009 3.5zM5 9a4 4 0 118 0 4 4 0 01-8 0z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            {safeImages.length > 1 && (
                <>
                    <button
                        type="button"
                        onClick={prev}
                        className="absolute left-2 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/80 shadow-md transition hover:bg-white"
                        aria-label="Page précédente"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-[#3b261a]">
                            <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={next}
                        className="absolute right-2 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/80 shadow-md transition hover:bg-white"
                        aria-label="Page suivante"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-[#3b261a]">
                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                        </svg>
                    </button>

                    <div className="mt-3 flex items-center gap-2">
                        <button
                            type="button"
                            onClick={prevThumbs}
                            disabled={thumbStart === 0}
                            className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-[#d4b99a] bg-[#fffaf4] text-[#3b261a] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                            aria-label="Miniatures précédentes"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                                <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                            </svg>
                        </button>

                        <div className="grid flex-1 grid-cols-4 gap-2">
                            {safeImages.slice(thumbStart, thumbStart + thumbsPerView).map((image, index) => {
                                const imageIndex = thumbStart + index;

                                return (
                                    <button
                                        key={image.src}
                                        type="button"
                                        onClick={() => setCurrent(imageIndex)}
                                        className={`relative aspect-[3/4] overflow-hidden rounded-[8px] border transition ${imageIndex === current
                                            ? "border-[#7c432b] ring-1 ring-[#7c432b]"
                                            : "border-[#d4b99a] hover:border-[#b98d69]"
                                            }`}
                                        aria-label={`Aller à la page ${imageIndex + 1}`}
                                    >
                                        <Image
                                            src={image.src}
                                            alt={image.alt || `Miniature page ${imageIndex + 1}`}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 18vw, 8vw"
                                        />
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            type="button"
                            onClick={nextThumbs}
                            disabled={thumbStart >= maxThumbStart}
                            className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-[#d4b99a] bg-[#fffaf4] text-[#3b261a] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                            aria-label="Miniatures suivantes"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </>
            )}

            {isViewerOpen && (
                <dialog
                    open
                    className="fixed inset-0 z-[1200] h-screen w-screen max-h-none max-w-none border-0 bg-[#1b120b]/90 p-2 md:p-6"
                    aria-label="Lecteur de pages du livre"
                >
                    <button
                        type="button"
                        onClick={closeViewer}
                        className="absolute right-3 top-3 z-30 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-white/55 bg-white px-4 py-2 font-raleway text-[10px] uppercase tracking-[0.18em] text-[#2c1a10]"
                    >
                        Fermer
                    </button>

                    <div className="mx-auto flex h-full w-full max-w-[1400px] flex-col gap-3 md:grid md:grid-cols-[120px_minmax(0,1fr)] md:gap-5">
                        <div className="hidden h-full overflow-y-auto pr-1 md:block">
                            <div className="flex flex-col gap-2">
                                {safeImages.map((image, index) => (
                                    <button
                                        key={image.src}
                                        type="button"
                                        onClick={() => {
                                            setIsZoomed(false);
                                            setCurrent(index);
                                        }}
                                        className={`relative aspect-[3/4] overflow-hidden rounded-[8px] border ${index === current
                                            ? "border-white ring-1 ring-white"
                                            : "border-white/30"
                                            }`}
                                        aria-label={`Afficher la page ${index + 1}`}
                                    >
                                        <Image
                                            src={image.src}
                                            alt={image.alt || `Miniature page ${index + 1}`}
                                            fill
                                            className="object-cover"
                                            sizes="120px"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="relative h-full min-h-0 overflow-hidden rounded-[10px] border border-white/20 bg-[#f0e6d9] shadow-[5px_5px_0_rgba(0,0,0,0.35)]">
                            <div className="absolute left-3 top-3 z-20 rounded-full bg-[#2c1a10]/80 px-3 py-1 font-raleway text-[10px] uppercase tracking-[0.16em] text-white">
                                Page {current + 1} / {safeImages.length}
                            </div>

                            <button
                                type="button"
                                onClick={toggleZoom}
                                onMouseMove={handleZoomMove}
                                className={`absolute inset-0 z-10 ${isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
                                aria-label={isZoomed ? "Dézoomer la page" : "Zoomer la page"}
                            />

                            <Image
                                src={safeImages[current].src}
                                alt={safeImages[current].alt || `Page ${current + 1}`}
                                fill
                                className="object-contain transition-transform duration-200"
                                style={{
                                    transform: isZoomed ? "scale(2.2)" : "scale(1)",
                                    transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
                                }}
                                sizes="(max-width: 768px) 100vw, 80vw"
                            />

                            <div className="absolute bottom-3 left-1/2 z-20 -translate-x-1/2 rounded-full bg-[#2c1a10]/80 px-3 py-1 font-raleway text-[10px] uppercase tracking-[0.14em] text-white">
                                {isZoomed ? "Cliquer pour dezoomer" : "Cliquer pour zoomer"}
                            </div>

                            {safeImages.length > 1 && (
                                <>
                                    <button
                                        type="button"
                                        onClick={prev}
                                        className="absolute left-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-[#2c1a10] shadow-[0_4px_14px_rgba(0,0,0,0.24)] transition hover:bg-white"
                                        aria-label="Page précédente"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6">
                                            <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={next}
                                        className="absolute right-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-[#2c1a10] shadow-[0_4px_14px_rgba(0,0,0,0.24)] transition hover:bg-white"
                                        aria-label="Page suivante"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6">
                                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </>
                            )}
                        </div>

                        {safeImages.length > 1 && (
                            <div className="grid grid-cols-6 gap-2 md:hidden">
                                {safeImages.map((image, index) => (
                                    <button
                                        key={image.src}
                                        type="button"
                                        onClick={() => {
                                            setIsZoomed(false);
                                            setCurrent(index);
                                        }}
                                        className={`relative aspect-[3/4] overflow-hidden rounded-[8px] border ${index === current
                                            ? "border-white ring-1 ring-white"
                                            : "border-white/30"
                                            }`}
                                        aria-label={`Afficher la page ${index + 1}`}
                                    >
                                        <Image
                                            src={image.src}
                                            alt={image.alt || `Miniature page ${index + 1}`}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 14vw, 10vw"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </dialog>
            )}
        </div>
    );
}
