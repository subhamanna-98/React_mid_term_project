import { useState } from "react";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}
const faqList: FaqItem[] = [
  {
    id: 1,
    question: "How can i start a project?",
    answer:
      "You can start by choosing your preferred car from our fleet, selecting your rental duration, and providing the necessary identification details directly online.",
  },
  {
    id: 2,
    question: "What Are The Requirements For Renting A Car ?",
    answer:
      "You must have a valid driver's license, be at least 21 years old, and present a valid government-issued photo ID and credit card for security deposit.",
  },
  {
    id: 3,
    question: "What Are The Requirements For Renting A Car ?",
    answer:
      "International customers need an International Driving Permit (IDP) along with their original domestic driver's license and a valid passport.",
  },
  {
    id: 4,
    question:
      "Does Car Rental Allow Me To Tow With Or Attach A Hitch To The Rental Vehicle ?",
    answer:
      "Towing and hitch attachments are strictly prohibited on our luxury and standard rental vehicles to ensure passenger safety and maintain vehicle integrity.",
  },
  {
    id: 5,
    question:
      "Does Car Rental Offer Coverage Products For Purchase With My Renta?",
    answer:
      "Yes, we offer comprehensive collision damage waivers, roadside assistance packages, and personal accident insurance options during the booking checkout.",
  },
];
 const FaqAccordion = () => {
    const [openId, setOpenId] = useState<number | null>(null);

  const toggleAccordion = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };
  return (
    <section className="w-full bg-white text-gray-900 py-16 sm:py-24 px-4 sm:px-8 lg:px-16 select-none">
      <div className="max-w-[1100px] mx-auto flex flex-col text-left">
        
        {/* Section Heading */}
        <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-[#0f172a] mb-10">
          Top Car Rental Questions
        </h2>

        {/* FAQ Accordion List */}
        <div className="flex flex-col gap-4">
          {faqList.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className="bg-[#dcfce7]/70 hover:bg-[#d4f7de] rounded-2xl sm:rounded-full transition-all duration-300 border border-emerald-100 overflow-hidden"
              >
                {/* Header Clickable Row */}
                <button
                  type="button"
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full py-4 sm:py-4.5 px-6 sm:px-8 flex items-center justify-between gap-4 text-left cursor-pointer"
                >
                  <span className="font-line text-xs sm:text-[14px] font-semibold text-gray-900 tracking-wide">
                    {item.question}
                  </span>

                  {/* Green Circle + / - Button */}
                  <span
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#00b074] text-white flex items-center justify-center font-bold text-base sm:text-lg flex-shrink-0 transition-transform duration-300 shadow-sm ${
                      isOpen ? "rotate-45" : "rotate-0"
                    }`}
                  >
                    +
                  </span>
                </button>

                {/* Animated Collapsible Answer Body */}
                <div
                  className={`grid transition-all duration-300 ease-in-out px-6 sm:px-8 ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100 pb-5 pt-1"
                      : "grid-rows-[0fr] opacity-0 pb-0 pt-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="font-line text-xs sm:text-sm text-gray-700 leading-relaxed max-w-3xl">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  )
}
export default FaqAccordion