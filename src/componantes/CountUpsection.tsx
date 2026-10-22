import { useEffect, useState } from "react";

interface CounterProps {
  end: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

const AnimatedCounter: React.FC<CounterProps> = ({
  end,
  duration = 5000,
  decimals = 0,
  prefix = "",
  suffix = "",
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      // easeOutExpo formula
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(easeOut * end);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [end, duration]);
  return (
    <span>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
};

 const CountUpsection = () => {
  return (
    <div className="w-full border border-white/15 rounded-2xl p-6 backdrop-blur-md bg-black/20 shadow-2xl mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-white/10 text-center md:text-left">
      <div className="md:px-6">
        <h3 className="text-2xl md:text-3xl font-semibold text-white">
          <AnimatedCounter end={50} suffix="+" />
        </h3>
        <p className="text-xs text-gray-400 mt-1">Project Complete</p>
      </div>

      <div className="md:px-6 pt-4 md:pt-0">
        <h3 className="text-2xl md:text-3xl font-semibold text-white">
          <AnimatedCounter end={100} suffix="+" />
        </h3>
        <p className="text-xs text-gray-400 mt-1">Expert Teams</p>
      </div>

      <div className="md:px-6 pt-4 md:pt-0">
        <h3 className="text-2xl md:text-3xl font-semibold text-white">
          <AnimatedCounter end={3.5} decimals={1} prefix="$" suffix="M" />
        </h3>
        <p className="text-xs text-gray-400 mt-1">Project Value</p>
      </div>

      <div className="md:px-6 pt-4 md:pt-0">
        <h3 className="text-2xl md:text-3xl font-semibold text-white">
          <AnimatedCounter end={3.5} decimals={1} prefix="$" suffix="M" />
        </h3>
        <p className="text-xs text-gray-400 mt-1">Project Value</p>
      </div>
    </div>
  )
}
export default CountUpsection