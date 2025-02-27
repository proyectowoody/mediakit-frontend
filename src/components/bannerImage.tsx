import { useEffect, useState } from "react";

function BannerImage() {

     const banners = [
        { id: 1, img: "https://media.gq.com.mx/photos/64ff795dd175b7cca062a8dc/16:9/w_2560%2Cc_limit/zapatos-bespoke-que-son-y-como-usar-con-estilo.jpg", alt: "Banner 1" },
        { id: 2, img: "https://belenkacdn.com/media/2024/09/8/1/entice-neo-size-medium-v-1.png", alt: "Banner 2" },
        { id: 3, img: "https://media.revistagq.com/photos/5ce6c5959d80fc0c86e33ba7/16:9/w_2560%2Cc_limit/schuhe-putzen-quer.jpg", alt: "Banner 3" },
      ];

    const [currentIndex, setCurrentIndex] = useState<number>(0);

     useEffect(() => {
        const interval = setInterval(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
        }, 2500);
    
        return () => clearInterval(interval);
      }, [banners.length]);

    return (
        <div className="relative w-full h-screen overflow-hidden">
            {banners.map((banner, index) => (
                <img
                    key={banner.id}
                    src={banner.img}
                    alt={banner.alt}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
                />
            ))}

            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {banners.map((_, index) => (
                    <div
                        key={index}
                        className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-white" : "bg-gray-400"}`}
                    ></div>
                ))}
            </div>
        </div>
    );
}

export default BannerImage;