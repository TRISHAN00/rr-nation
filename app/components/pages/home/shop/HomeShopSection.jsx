"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ArrowLeft, ArrowRight, ShoppingBag } from "lucide-react";
import ProductCard from "@/app/(frontend)/shop/_components/ProductCard";
import { getHomeData } from "@/services/product.service";

export default function HomeShopSection() {
  const [categories, setCategories] = useState([]);
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getHomeData()
      .then((res) => {
        if (!active) return;
        setCategories(res?.data?.categories || []);
        setDeals(res?.data?.dealsForYou || []);
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  if (!loading && categories.length === 0 && deals.length === 0) return null;

  return (
    <section className="bg-white py-20 lg:py-28 overflow-hidden">
      <div className="container mx-auto px-7.5">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <span className="text-brand uppercase font-bold tracking-wide text-sm">Shop</span>
            <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-dark">Gear Up for Your Next Run</h2>
            <p className="mt-2 text-gray max-w-2xl">Explore categories and grab the latest deals picked for you.</p>
          </div>
          <Link href="/shop" className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline shrink-0">
            Visit Shop <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Categories */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold text-dark">Shop by Category</h3>
          </div>
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-square rounded-2xl bg-muted/50 animate-pulse" />
              ))}
            </div>
          ) : (
            <Swiper
              modules={[Autoplay]}
              spaceBetween={16}
              slidesPerView={2}
              loop={categories.length > 6}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              breakpoints={{
                480: { slidesPerView: 3 },
                640: { slidesPerView: 4 },
                768: { slidesPerView: 5 },
                1024: { slidesPerView: 6 },
                1280: { slidesPerView: 8 },
              }}
            >
              {categories.map((cat) => (
                <SwiperSlide key={cat.id}>
                  <Link
                    href={`/shop/category/${cat.slug}`}
                    className="group flex flex-col items-center gap-3 rounded-2xl border border-border/60 bg-[#FAFAFA] p-4 hover:border-brand/40 hover:bg-brand/5 transition-all"
                  >
                    <div className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-xl bg-white border border-border/50 flex items-center justify-center overflow-hidden">
                      {cat.iconUrl || cat.imageUrl ? (
                        <img src={cat.iconUrl || cat.imageUrl} alt={cat.name} className="h-10 w-10 sm:h-12 sm:w-12 object-contain group-hover:scale-110 transition-transform duration-300" />
                      ) : (
                        <ShoppingBag className="h-7 w-7 text-brand/60" />
                      )}
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-dark text-center line-clamp-2 leading-tight">{cat.name}</span>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        {/* Deals */}
        <div>
          <div className="flex items-center justify-between mb-5 gap-4">
            <h3 className="text-lg font-bold text-dark">Deals for You</h3>
            {deals.length > 1 && (
              <div className="flex items-center gap-2">
                <button type="button" className="home-deals-prev h-9 w-9 rounded-full border border-border bg-white hover:bg-brand hover:text-white hover:border-brand transition-colors flex items-center justify-center disabled:opacity-40">
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button type="button" className="home-deals-next h-9 w-9 rounded-full border border-border bg-white hover:bg-brand hover:text-white hover:border-brand transition-colors flex items-center justify-center disabled:opacity-40">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-2xl border border-border/70 bg-white overflow-hidden">
                  <div className="aspect-square bg-muted/50 animate-pulse" />
                  <div className="p-4 space-y-3"><div className="h-3 w-1/3 bg-muted/50 rounded animate-pulse" /><div className="h-4 w-5/6 bg-muted/50 rounded animate-pulse" /><div className="h-10 bg-muted/50 rounded animate-pulse" /></div>
                </div>
              ))}
            </div>
          ) : deals.length > 0 ? (
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              loop={deals.length > 4}
              autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
              navigation={{ prevEl: ".home-deals-prev", nextEl: ".home-deals-next" }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
            >
              {deals.map((product) => (
                <SwiperSlide key={product.id} className="h-auto pb-2">
                  <ProductCard product={product} className="h-full" />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="rounded-2xl border border-dashed border-border py-12 text-center text-muted-foreground">
              <ShoppingBag className="h-10 w-10 mx-auto mb-3 opacity-40" />
              <p>No deals available right now.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
