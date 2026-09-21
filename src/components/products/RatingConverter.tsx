import { Star } from "lucide-react";

interface RatingConverterProps {
  ratingCount: number;
}

const RatingConverter = ({ ratingCount }: RatingConverterProps) => {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, index) => {
        // Calculate the fill percentage for each star
        const fillPercentage = Math.max(
          0,
          Math.min(100, (ratingCount - index) * 100)
        );

        return (
          <div key={index} className="relative size-4">
            {/* Background Star (Always gray) */}
            <Star className="absolute inset-0 size-4 fill-none text-gray-300" />

            {/* Foreground Star (Fills based on percentage) */}
            {fillPercentage > 0 && (
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fillPercentage}%` }}
              >
                <Star className="size-4 fill-yellow-400 text-yellow-400" />
              </div>
            )}
          </div>
        );
      })}

      <span className="ps-2 text-sm font-medium text-gray-500">
        {ratingCount}/5
      </span>
    </div>
  );
};

export default RatingConverter;
