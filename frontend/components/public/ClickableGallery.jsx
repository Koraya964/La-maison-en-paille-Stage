"use client";

import { useState } from "react";
import Image from "next/image";

export default function ClickableGallery({ images = [] }) {
    const [lightbox, setLightbox] = useState(null); // index de l'image ouverte

    if (!images.length) return null;

    return (
        <>
            {/* Grille de thumbnails */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {images.map((img, i) => (
                    <button
                        key={i}
                        type="button"
                        onClick={() => setLightbox(i)}
                        className="group relative aspect-[4/3] w-full overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#cb664a]"
                        aria-label={img.alt}
                    >
                        <Image
                            src={img.thumbnailSrc || img.src}
                            alt={img.alt}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <span className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
                    </button>
                ))}
            </div>

            {/* Lightbox */}
            {lightbox !== null && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label={images[lightbox].alt}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
                    onClick={() => setLightbox(null)}
                >
                    {/* Empêcher la fermeture en cliquant sur l'image */}
                    <div
                        className="relative max-h-[90vh] max-w-[90vw]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={images[lightbox].fullSrc || images[lightbox].src}
                            alt={images[lightbox].alt}
                            width={1400}
                            height={1000}
                            className="max-h-[85vh] w-auto object-contain"
                            priority
                        />
                        {/* Fermer */}
                        <button
                            type="button"
                            onClick={() => setLightbox(null)}
                            className="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#2c1a10] shadow-md hover:bg-[#cb664a] hover:text-white"
                            aria-label="Fermer"
                        >
                            ✕
                        </button>
                        {/* Précédent */}
                        {lightbox > 0 && (
                            <button
                                type="button"
                                onClick={() => setLightbox((p) => p - 1)}
                                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-3 py-1 text-[#2c1a10] hover:bg-white"
                                aria-label="Image précédente"
                            >
                                ‹
                            </button>
                        )}
                        {/* Suivant */}
                        {lightbox < images.length - 1 && (
                            <button
                                type="button"
                                onClick={() => setLightbox((p) => p + 1)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-3 py-1 text-[#2c1a10] hover:bg-white"
                                aria-label="Image suivante"
                            >
                                ›
                            </button>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
