
import { Link } from "react-router-dom";
import greenSupercarImg from "../assets/Frame 130.png";
 const LookingForCarBanner = () => {
  return (
    <section className="w-full bg-white py-16 sm:py-24 px-4 sm:px-8 lg:px-16 select-none overflow-hidden">
      <div className="max-w-[1360px] mx-auto">
        
        {/* Containerul principal al cardului */}
        <div className="w-full bg-[#40ba8d] rounded-[32px] overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[380px] sm:min-h-[420px]">
          
          {/* Partea stângă: Conținut text și buton de rezervare */}
          <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 flex flex-col justify-center text-left relative z-10">
            {/* Titlu principal */}
            <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-2">
              Looking for a car?
            </h2>

            {/* Număr de telefon */}
            <a
              href="tel:+5375476401"
              className="font-heading text-2xl sm:text-4xl font-bold text-white hover:text-gray-100 transition-colors tracking-tight mb-4 inline-block"
            >
              +537 547-6401
            </a>

            {/* Text descriptiv */}
            <p className="font-line text-xs sm:text-sm text-white/90 leading-relaxed max-w-md mb-8 font-normal">
              Amet cras hac orci lacus. Faucibus ipsum arcu lectus nibh sapien .
              Diam tincidunt tincidunt erat...
            </p>

            {/* Butonul Book now */}
            <div>
              <Link
                to="/contactus"
                className="inline-flex items-center justify-center bg-[#0d1f1c] hover:bg-black text-white text-xs sm:text-sm font-semibold px-8 py-3.5 rounded-full transition-all duration-300 shadow-md hover:shadow-xl active:scale-95 cursor-pointer"
              >
                Book now
              </Link>
            </div>
          </div>

          {/* Partea dreaptă: Imaginea mașinii sport */}
          <div className="lg:col-span-6 relative bg-black min-h-[260px] lg:min-h-full overflow-hidden">
            <img
              src={greenSupercarImg}
              alt="Green luxury supercar"
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
            />
          </div>

        </div>

      </div>
    </section>
  )
}
export default LookingForCarBanner