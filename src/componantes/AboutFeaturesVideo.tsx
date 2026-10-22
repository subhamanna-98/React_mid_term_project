import carVideo from "../assets/car_vedio.mp4";
import videoBannerImg from "../assets/Img+ button.png";
import playBtnImg from "../assets/Button.png";
import { useEffect, useState } from "react";
interface FeatureItem {
  id: number;
  title: string;
  desc: string;
}
const features: FeatureItem[] = [
  {
    id: 1,
    title: "Variety Brands",
    desc: "Platea non auctor fermentum sollicitudin. Eget adipiscing augue sit quam natoque ornare cursus.",
  },
  {
    id: 2,
    title: "Awesome Suport",
    desc: "Eget adipiscing augue sit quam natoque ornare cursus viverra odio. Diam quam gravida ultricies v...",
  },
  {
    id: 3,
    title: "Maximum Freedom",
    desc: "Diam quam gravida ultricies velit duis consequat integer. Eget aliquam posuere vel rhoncus massa vo...",
  },
  {
    id: 4,
    title: "Flexibility on the go",
    desc: "Vitae pretium nulla sed quam id nisl semper. Vel non in proin egestas dis faucibus rhoncus. Iaculis...",
  },
];

 const AboutFeaturesVideo = () => {
    // Video Modal State
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const [countCustomers, setCountCustomers] = useState(0);
  const [countCars, setCountCars] = useState(0);
  const [countYears, setCountYears] = useState(0);
  useEffect(() => {
    // 20k Counter
    let c1 = 0;
    const t1 = setInterval(() => {
      c1 += 1;
      setCountCustomers(c1);
      if (c1 >= 20) clearInterval(t1);
    }, 45);
    // 540 Counter
    let c2 = 0;
    const t2 = setInterval(() => {
      c2 += 18;
      if (c2 >= 540) {
        setCountCars(540);
        clearInterval(t2);
      } else {
        setCountCars(c2);
      }
    }, 30);
    // 25 Counter
    let c3 = 0;
    const t3 = setInterval(() => {
      c3 += 1;
      setCountYears(c3);
      if (c3 >= 25) clearInterval(t3);
    }, 40);
    return () => {
      clearInterval(t1);
      clearInterval(t2);
      clearInterval(t3);
    };
  },[])
  return (
    <section className="w-full bg-white text-gray-900 py-16 sm:py-24 px-4 sm:px-8 lg:px-16 select-none overflow-hidden">
      <div className="max-w-[1360px] mx-auto flex flex-col gap-16 sm:gap-24">
        
        {/* ================= 1. TOP FEATURES GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Main Title */}
          <div className="lg:col-span-5 text-left">
            <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#0f172a] leading-[1.2]">
              Where every <br />
              drive feels <br />
              extraordinary
            </h2>
          </div>

          {/* Right 4 Features Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8 text-left">
            {features.map((item) => (
              <div key={item.id} className="flex flex-col">
                <h3 className="font-heading text-lg sm:text-[19px] font-bold text-[#0f172a] mb-2">
                  {item.title}
                </h3>
                <p className="font-line text-xs sm:text-[13px] text-gray-500 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* ================= 2. CENTER CAR IMAGE WITH VIDEO PLAY BUTTON ================= */}
        <div className="relative w-full rounded-[28px] sm:rounded-[36px] overflow-hidden bg-black shadow-xl h-[340px] sm:h-[480px] lg:h-[560px] group flex items-center justify-center">
          {/* Background Studio Car Image */}
          <img
            src={videoBannerImg}
            alt="Sports car studio showcase"
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Subtle Contrast Overlay */}
          <div className="absolute inset-0 bg-black/25 pointer-events-none" />

          {/* Center Play Button Image (Clickable Video Trigger) */}
          <button
            type="button"
            onClick={() => setIsVideoOpen(true)}
            className="absolute z-10 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer drop-shadow-[0_8px_25px_rgba(0,168,107,0.5)]"
            aria-label="Play Car Video"
          >
            <img
              src={playBtnImg}
              alt="Play Video Button"
              className="w-full h-full object-contain"
            />
          </button>
        </div>

        {/* ================= 3. BOTTOM ANIMATED COUNTER SECTION ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center pt-4 sm:pt-8">
          
          {/* Counter 1 */}
          <div className="flex flex-col items-center">
            <h3 className="font-heading text-4xl sm:text-6xl font-bold text-[#0f172a] tracking-tight mb-2">
              {countCustomers}k+
            </h3>
            <p className="font-line text-xs sm:text-sm text-gray-700 font-semibold">
              Happy customers
            </p>
          </div>

          {/* Counter 2 */}
          <div className="flex flex-col items-center">
            <h3 className="font-heading text-4xl sm:text-6xl font-bold text-[#0f172a] tracking-tight mb-2">
              {countCars}+
            </h3>
            <p className="font-line text-xs sm:text-sm text-gray-700 font-semibold">
              Count of cars
            </p>
          </div>

          {/* Counter 3 */}
          <div className="flex flex-col items-center">
            <h3 className="font-heading text-4xl sm:text-6xl font-bold text-[#0f172a] tracking-tight mb-2">
              {countYears}+
            </h3>
            <p className="font-line text-xs sm:text-sm text-gray-700 font-semibold">
              Years of experince
            </p>
          </div>

        </div>

      </div>

      {/* ================= 4. POPUP VIDEO MODAL ================= */}
    {/* ================= 4. POPUP VIDEO MODAL ================= */}
{isVideoOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-8 animate-fadeIn">
    <div className="relative w-full max-w-4xl bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/20">
      {/* Close Button */}
      <button
        type="button"
        onClick={() => setIsVideoOpen(false)}
        className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white text-white hover:text-black flex items-center justify-center font-bold text-lg transition-all cursor-pointer"
      >
        ✕
      </button>

      {/* Local MP4 Video Player */}
      <div className="relative w-full aspect-video bg-black flex items-center justify-center">
        <video
          src={carVideo}
          controls
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  </div>
)}

    </section>
  )
}
export default AboutFeaturesVideo