// src/components/WidgetCard.jsx
import React from "react";
import { Clock, ClipboardCheck, PlayCircle, Notebook } from "lucide-react";

const iconMap = {
  Clock: <Clock className="w-6 h-6" />,
  ClipboardCheck: <ClipboardCheck className="w-6 h-6" />,
  PlayCircle: <PlayCircle className="w-6 h-6" />,
  Notebook: <Notebook className="w-6 h-6" />,
};

const colorMap = {
  blue: "bg-blue-600",
  green: "bg-green-600",
  yellow: "bg-yellow-500",
  red: "bg-red-600",
};

const WidgetCard = ({ icon, title, value, note, color, className }) => {
  return (
    <div className={`bg-blue-100 rounded-lg p-6 transform transition duration-300 hover:scale-105 hover:bg-${color}-800 hover:shadow-md rounded-2xl shadow-md p-4 text-black flex flex-col gap-2 ${className}`}>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${colorMap[color]}`}>
        {iconMap[icon]}
      </div>
      <h4 className="text-lg font-semibold">{title}</h4>
      <p className="text-2xl font-bold">{value}</p>
      <span className="text-sm text-gray-500">{note}</span>
    </div>
  );
};

export default WidgetCard;
