import { Check } from "lucide-react";

const steps = ["PENDING", "PAID", "PACKED", "SHIPPED", "DELIVERED"];

export default function OrderTimeline({ status }: { status: string }) {
  const currentIndex = steps.indexOf(status);

  return (
    <div className="flex items-center w-full min-w-[600px] justify-between">
      {steps.map((step, index) => {
        const isCompleted = index <= currentIndex;
        const isLast = index === steps.length - 1;

        return (
          <div key={step} className={`relative flex flex-col items-center ${isLast ? '' : 'flex-1'}`}>
            {/* LINE CONNECTING DOTS */}
            {!isLast && (
              <div
                className={`
                  absolute top-3 left-1/2 w-full h-px
                  ${index < currentIndex ? "bg-[#7A0019]" : "bg-[#E8DCC4]"}
                `}
              />
            )}
            
            {/* DOT */}
            <div
              className={`
                relative z-10 w-6 h-6 rounded-full flex items-center justify-center border-2
                ${
                  isCompleted
                    ? "bg-[#7A0019] border-[#7A0019]"
                    : "bg-[#F8F3EA] border-[#E8DCC4]"
                }
              `}
            >
              {isCompleted && <Check size={12} className="text-white" />}
            </div>

            {/* LABEL */}
            <div className="mt-3 text-center">
              <p
                className={`
                  text-xs uppercase tracking-widest font-medium
                  ${isCompleted ? "text-[#7A0019]" : "text-[#6B6B6B]"}
                `}
              >
                {step}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
