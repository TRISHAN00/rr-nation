"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import PhotoGalleryList from "./PhotoGalleryList";

const BATCH_SIZE = 12;
const SKELETON_HEIGHTS = ["h-48", "h-64", "h-80", "h-96", "h-72", "h-56"];

function PhotoSkeleton() {
  const height =
    SKELETON_HEIGHTS[Math.floor(Math.random() * SKELETON_HEIGHTS.length)];

  return (
    <div className={`mb-4 break-inside-avoid rounded-2xl overflow-hidden ${height} animate-pulse bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100`} />
  );
}

export default function PhotoList({ data }) {
  const images = data?.images?.list || [];
  const title =
    data?.section_data?.title ||
    data?.section_data?.subtitle ||
    "Moments we Cherish";

  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const [loadingMore, setLoadingMore] = useState(false);
  const sentinelRef = useRef(null);

  const hasMore = visibleCount < images.length;

  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    // Simulate a network delay for a professional feel
    setTimeout(() => {
      setVisibleCount((prev) => prev + BATCH_SIZE);
      setLoadingMore(false);
    }, 600);
  }, [loadingMore, hasMore]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [loadMore, hasMore, visibleCount]);

  if (images.length === 0) {
    return (
      <section className="pt-24 sm:pt-28 lg:pt-36 pb-24 sm:pb-32 lg:pb-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-7.5 text-center text-gray-500">
          No photos available yet.
        </div>
      </section>
    );
  }

  const visibleImages = images.slice(0, visibleCount);

  return (
    <section className="pt-24 sm:pt-28 lg:pt-36 pb-24 sm:pb-32 lg:pb-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-7.5">
        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row items-center sm:items-center sm:justify-between mb-10 sm:mb-12 lg:mb-14">
          <h3 className="text-dark font-bold
            text-xl sm:text-2xl md:text-3xl lg:text-4xl
            leading-snug lg:leading-tight max-w-2xl"
          >
            {title}
          </h3>

          {images.length > 0 && (
            <span className="text-sm text-gray-400 font-medium">
              {visibleCount} of {images.length} photos
            </span>
          )}
        </div>

        {/* Gallery */}
        <PhotoGalleryList images={visibleImages} />

        {/* Load-more sentinel + skeleton */}
        <div ref={sentinelRef} className="w-full">
          {loadingMore && (
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 px-4 md:px-16 mt-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <PhotoSkeleton key={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
