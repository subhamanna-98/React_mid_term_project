import type React from "react";
import { useState } from "react";
import loanCalculatorImg from "../assets/Loan-img.png";
interface CalculatorFormState {
  price: string;
  interestRate: string;
  loanTerm: string;
  downPayment: string;
}

 const AutoLoanCalculator = () => {
    const [formData, setFormData] = useState<CalculatorFormState>({
    price: "10000",
    interestRate: "10000",
    loanTerm: "5",
    downPayment: "5000",
  });
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Console-e dynamic value log kora hocche
    console.log("Full Object:", formData);
  };
  return (
    <section className="w-full bg-white text-gray-900 py-16 sm:py-24 px-4 sm:px-8 lg:px-16 select-none">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 rounded-[32px] overflow-hidden shadow-2xl bg-[#091f1b]">
          
          {/* Left Side: Imported Image */}
          <div className="relative w-full h-[380px] lg:h-auto min-h-[480px]">
            <img
              src={loanCalculatorImg}
              alt="Auto Loan Calculator"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Right Side: Form Calculator Container */}
          <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center text-white">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Auto Loan Calculator
            </h2>

            <p className="font-line text-xs sm:text-sm text-gray-300 leading-relaxed mb-8 opacity-85 max-w-lg">
              Use this car payment calculator to estimate monthly payments on your next new or used auto loan.
            </p>

            {/* Dynamic Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Row 1: Price 1 & Price 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Field 1: Price ($) */}
                <div className="bg-white rounded-2xl px-5 py-3 text-gray-900 shadow-sm focus-within:ring-2 focus-within:ring-emerald-400 transition-all">
                  <label htmlFor="price" className="block text-[11px] font-medium text-gray-500 mb-0.5">
                    Price ($)
                  </label>
                  <input
                    id="price"
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full font-semibold text-sm outline-none bg-transparent"
                    placeholder="10000"
                    required
                  />
                </div>

                {/* Field 2: Second Price / Rate */}
                <div className="bg-white rounded-2xl px-5 py-3 text-gray-900 shadow-sm focus-within:ring-2 focus-within:ring-emerald-400 transition-all">
                  <label htmlFor="interestRate" className="block text-[11px] font-medium text-gray-500 mb-0.5">
                    Price ($)
                  </label>
                  <input
                    id="interestRate"
                    type="number"
                    name="interestRate"
                    value={formData.interestRate}
                    onChange={handleChange}
                    className="w-full font-semibold text-sm outline-none bg-transparent"
                    placeholder="10000"
                    required
                  />
                </div>
              </div>

              {/* Row 2: Loan Term & Down Payment */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Field 3: Loan Term (year) */}
                <div className="bg-white rounded-2xl px-5 py-3 text-gray-900 shadow-sm focus-within:ring-2 focus-within:ring-emerald-400 transition-all">
                  <label htmlFor="loanTerm" className="block text-[11px] font-medium text-gray-500 mb-0.5">
                    Loan Term (year)
                  </label>
                  <input
                    id="loanTerm"
                    type="number"
                    name="loanTerm"
                    value={formData.loanTerm}
                    onChange={handleChange}
                    className="w-full font-semibold text-sm outline-none bg-transparent"
                    placeholder="5"
                    required
                  />
                </div>

                {/* Field 4: Down Payment */}
                <div className="bg-white rounded-2xl px-5 py-3 text-gray-900 shadow-sm focus-within:ring-2 focus-within:ring-emerald-400 transition-all">
                  <label htmlFor="downPayment" className="block text-[11px] font-medium text-gray-500 mb-0.5">
                    Down Payment
                  </label>
                  <input
                    id="downPayment"
                    type="number"
                    name="downPayment"
                    value={formData.downPayment}
                    onChange={handleChange}
                    className="w-full font-semibold text-sm outline-none bg-transparent"
                    placeholder="5000"
                    required
                  />
                </div>
              </div>

              {/* Submit / Calculate Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-full border border-white/20 bg-[#0c2420] hover:bg-[#12332e] text-white text-sm font-semibold tracking-wide flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer active:scale-[0.99]"
                >
                  <span>Calculate</span>
                  <span className="text-sm">↗</span>
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </section>
  )
}
export default AutoLoanCalculator