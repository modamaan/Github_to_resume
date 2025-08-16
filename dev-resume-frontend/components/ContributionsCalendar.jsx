import React from "react";

function getColor(intensity, color) {
  // Use API color if provided, otherwise fallback to a scale
  return color || [
    "#ebedf0", // 0
    "#c6e48b", // 1
    "#7bc96f", // 2
    "#239a3b", // 3
    "#196127", // 4
  ][Math.min(intensity, 4)];
}

export default function ContributionsCalendar({ weeks }) {
  if (!weeks || !weeks.length) return null;

  // Flatten all days
  const days = weeks.flatMap((w) => w.contributionDays);

  return (
    <div className="overflow-x-auto">
      <div className="flex">
        {weeks.map((week, i) => (
          <div key={i} className="flex flex-col">
            {week.contributionDays.map((day, j) => (
              <div
                key={day.date}
                title={`${day.date}: ${day.contributionCount} contributions`}
                className="w-4 h-4 m-0.5 rounded"
                style={{ background: getColor(day.contributionCount, day.color), border: "1px solid #e5e7eb" }}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="text-xs text-gray-500 mt-2">Contributions in the past year</div>
    </div>
  );
}
