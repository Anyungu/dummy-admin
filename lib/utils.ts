import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDayAndDateTime(dateStr: string, timeStr: string): string {

  const date = new Date(`${dateStr}T${timeStr}:00`);

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const dayName = daysOfWeek[date.getDay()];

  const day = date.getDate();
  const monthName = months[date.getMonth()];

  const getOrdinalSuffix = (day: number): string => {
    if (day >= 11 && day <= 13) {
      return 'th';
    }
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }

  const suffix = getOrdinalSuffix(day)

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const formattedTime = `${hours}${ampm}`;

  return `${dayName} ${day}${suffix}, ${monthName}, ${formattedTime}`;
}
