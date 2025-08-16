import React from "react";

export function ClassicPreview() {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 w-64 h-48 flex flex-col justify-between shadow-sm">
      <div>
        <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-3 bg-gray-300 rounded w-full mb-1"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6 mb-1"></div>
        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
      </div>
      <div className="flex gap-2 mt-2">
        <div className="h-2 w-10 bg-gray-300 rounded" />
        <div className="h-2 w-8 bg-gray-200 rounded" />
      </div>
      <div className="text-xs text-gray-400 mt-2 text-center">Classic</div>
    </div>
  );
}

export function ModernPreview() {
  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-2xl p-4 w-64 h-48 flex flex-col justify-between shadow-md">
      <div className="flex gap-3 items-center mb-2">
        <div className="rounded-full bg-green-200 w-10 h-10"></div>
        <div>
          <div className="h-4 bg-green-300 rounded w-20 mb-1"></div>
          <div className="h-3 bg-green-100 rounded w-16"></div>
        </div>
      </div>
      <div className="h-3 bg-green-100 rounded w-2/3 mb-2"></div>
      <div className="h-3 bg-green-200 rounded w-5/6 mb-1"></div>
      <div className="h-3 bg-green-100 rounded w-3/4"></div>
      <div className="flex gap-2 mt-2">
        <div className="h-2 w-10 bg-green-200 rounded" />
        <div className="h-2 w-8 bg-green-100 rounded" />
      </div>
      <div className="text-xs text-green-700 mt-2 text-center">Modern</div>
    </div>
  );
}
