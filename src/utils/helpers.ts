import { type ClassValue, clsx } from "clsx";
import { differenceInSeconds, parse, parseISO } from "date-fns";
import { twMerge } from "tailwind-merge";

import { CardsType } from "../services/types/checkout";
import { DataType } from "../services/types/select";
import { User } from "../services/types/user";

export const saveToken = (token: string, rememberMe: boolean) => {
  // console.log('💾 Saving token:', { tokenLength: token?.length, rememberMe });
  if (rememberMe) {
    // Store the token in a cookie with an expiration time of 10 days
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 10);
    document.cookie = `token=${token}; expires=${expirationDate.toUTCString()}; path=/`;
  } else {
    // Store the token in session storage (expires when the browser is closed)
    document.cookie = `token=${token}; path=/`;
  }
  // console.log('💾 Token saved. Current cookies:', document.cookie);
};

export const retrieveToken = () => {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith("token=")) {
      const token = cookie.substring("token=".length, cookie.length);
      return token;
    }
  }
  return null;
};

export const clearToken = () => {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

export const saveUser = (user: User, rememberMe: boolean) => {
  if (rememberMe) {
    // Store the user in cookie with an expiration time of 10 days
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 10);
    document.cookie = `user=${JSON.stringify(
      user
    )}; expires=${expirationDate.toUTCString()}; path=/`;
  } else {
    // Store the user in session storage (expires when the browser is closed)
    document.cookie = `user=${JSON.stringify(user)}; path=/`;
  }
};

export const retrieveUser = () => {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith("user=")) {
      const user = cookie.substring("user=".length, cookie.length);
      if (!user || user === "undefined") return null;
      try {
        return JSON.parse(user);
      } catch (e) {
        console.error("Invalid user cookie JSON:", user);
        return null;
      }
    }
  }
  return null;
};

export const clearUser = () => {
  document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

export const generatePageList = (lastPage: number | undefined) => {
  if (!lastPage) return [];
  const list: DataType[] = [];
  if (lastPage) {
    for (let i = 1; i <= lastPage; i++) {
      list.push({ value: i.toString(), label: i.toString() });
    }
  }
  return list;
};

export const formatNumber = (number: string) =>
  number.split("").reduce((seed, next, index) => {
    if (index !== 0 && !(index % 4)) seed += " ";
    return seed + next;
  }, "");

export const detectCardType = (cardNumber: string): CardsType => {
  if (/^4/.test(cardNumber)) {
    return "Visa";
  } else if (/^5[1-5]/.test(cardNumber)) {
    return "Mastercard";
  } else if (/^3[47]/.test(cardNumber)) {
    return "American Express";
  } else if (/^6(?:011|5[0-9]{2})/.test(cardNumber)) {
    return "Discover";
  } else {
    return "Unknown";
  }
};

export const randomId = () => {
  return Math.floor(Math.random() * 1000000000);
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("fr-MA", {
    style: "currency",
    currency: "MAD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
};

/**
 * Parse a backend timestamp into a JavaScript Date object.
 * Handles ISO strings and the common MySQL-style format returned by many APIs.
 */
const parseBackendDate = (dateString: string): Date | null => {
  if (!dateString) {
    return null;
  }

  const trimmed = dateString.trim();

  // ISO 8601 format with timezone or T separator
  if (/^\d{4}-\d{2}-\d{2}T/.test(trimmed) || trimmed.endsWith("Z") || /[+-]\d{2}:?\d{2}$/.test(trimmed)) {
    const parsed = parseISO(trimmed);
    return isNaN(parsed.getTime()) ? null : parsed;
  }

  // Common backend format: yyyy-MM-dd HH:mm:ss or yyyy-MM-dd HH:mm:ss.SSS
  // Parse as UTC so backend timestamps without explicit timezone are compared correctly.
  const utcDateMatch = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}(?:\.\d+)?$/.exec(trimmed);
  if (utcDateMatch) {
    const [, year, month, day, hour, minute, second] = /^(.{4})-(.{2})-(.{2}) (.{2}):(.{2}):(.{2})/.exec(trimmed)!;
    const utcDate = new Date(Date.UTC(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minute),
      Number(second)
    ));
    return isNaN(utcDate.getTime()) ? null : utcDate;
  }

  const parsed = new Date(trimmed);
  return isNaN(parsed.getTime()) ? null : parsed;
};

const getRelativeTimeLabel = (diffInSeconds: number, prefix: string): string => {
  if (diffInSeconds === 0) {
    return `${prefix} à l'instant`;
  }

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  if (diffInSeconds >= intervals.year) {
    const years = Math.floor(diffInSeconds / intervals.year);
    return `${prefix} il y a ${years} an${years > 1 ? "s" : ""}`;
  }

  if (diffInSeconds >= intervals.month) {
    const months = Math.floor(diffInSeconds / intervals.month);
    return `${prefix} il y a ${months} mois`;
  }

  if (diffInSeconds >= intervals.week) {
    const weeks = Math.floor(diffInSeconds / intervals.week);
    return `${prefix} il y a ${weeks} semaine${weeks > 1 ? "s" : ""}`;
  }

  if (diffInSeconds >= intervals.day) {
    const days = Math.floor(diffInSeconds / intervals.day);
    return `${prefix} il y a ${days} jour${days > 1 ? "s" : ""}`;
  }

  if (diffInSeconds >= intervals.hour) {
    const hours = Math.floor(diffInSeconds / intervals.hour);
    return `${prefix} il y a ${hours} heure${hours > 1 ? "s" : ""}`;
  }

  if (diffInSeconds >= intervals.minute) {
    const minutes = Math.floor(diffInSeconds / intervals.minute);
    return `${prefix} il y a ${minutes} minute${minutes > 1 ? "s" : ""}`;
  }

  return `${prefix} il y a ${diffInSeconds} seconde${diffInSeconds > 1 ? "s" : ""}`;
};

/**
 * Format a date string to a relative time format (e.g., "Publié il y a 2 jours")
 * @param dateString - The date string to format
 * @returns A formatted relative time string in French
 */
export const formatRelativeTime = (dateString: string): string => {
  const date = parseBackendDate(dateString);
  if (!date) {
    return "Date invalide";
  }

  const diffInSeconds = differenceInSeconds(new Date(), date);
  if (diffInSeconds < 0) {
    return diffInSeconds >= -60 ? "Publié à l'instant" : "Date invalide";
  }

  return getRelativeTimeLabel(diffInSeconds, "Publié");
};

/**
 * Format a date string to a relative time format for updates (e.g., "mis à jour il y a 2 jours")
 * @param dateString - The date string to format
 * @returns A formatted relative time string in French for updates
 */
export const formatRelativeUpdateTime = (dateString: string): string => {
  const date = parseBackendDate(dateString);
  if (!date) {
    return "Date invalide";
  }

  const diffInSeconds = differenceInSeconds(new Date(), date);
  if (diffInSeconds < 0) {
    return diffInSeconds >= -60 ? "Mis à jour à l'instant" : "Date invalide";
  }

  return getRelativeTimeLabel(diffInSeconds, "Mis à jour");
};

export const getFirstWord = (text: string): string => {
  return text.split(" ")[0];
};

// clear text from special characters
export const clearText = (text: string): string => {
  return text.replace(/[^\w\s]/gi, "");
};

// getLastRouteInUrl
export const getLastRouteInUrl = (url: string): string => {
  const parts = url.split("/");
  return parts[parts.length - 1];
};
