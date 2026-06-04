import { useState, useCallback, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ERDComparisonSection from "@/components/bubble/ERDComparisonSection";
import WYSIWYGTeaserCard from "@/components/bubble/WYSIWYGTeaserCard";

const slides = [
  { id: "erd",      label: "ERD vs BubVisch",    component: <ERDComparisonSection /> },
  { id: "rc",       label: "Reality Checker",     component: <WYSIWYGTeaserCard /> },
];

const LateralZoneCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const onSelect = useCallback((api: CarouselApi) => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("select", onSelect);
    return () => { api.off("select", onSelect); };
  }, [api, onSelect]);

  return (
    <div className="relative">
      <Carousel
        setApi={setApi}
        opts={{ loop: false, align: "start" }}
        className="w-full"
      >
        <CarouselContent className="-ml-0">
          {slides.map((slide) => (
            <CarouselItem key={slide.id} className="pl-0" style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                {slide.component}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Nav bar */}
      <div className="flex items-center justify-center gap-6 py-5 bg-zinc-900">

        {/* Prev */}
        <button
          onClick={() => api?.scrollPrev()}
          disabled={current === 0}
          className="flex items-center gap-1.5 text-sm font-inter text-zinc-400 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={16} />
          {slides[current - 1]?.label ?? ""}
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              className={`rounded-full transition-all duration-200 ${
                i === current
                  ? "w-5 h-2 bg-white"
                  : "w-2 h-2 bg-zinc-600 hover:bg-zinc-400"
              }`}
            />
          ))}
        </div>

        {/* Next */}
        <button
          onClick={() => api?.scrollNext()}
          disabled={current === slides.length - 1}
          className="flex items-center gap-1.5 text-sm font-inter text-zinc-400 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
        >
          {slides[current + 1]?.label ?? ""}
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default LateralZoneCarousel;
