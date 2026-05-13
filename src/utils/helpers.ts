import { type ClassValue, clsx } from "clsx";
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
 * Format a date string to a relative time format (e.g., "il y a 2 jours")
 * @param dateString - The date string to format
 * @returns A formatted relative time string in French
 */
export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  // If the date is in the future or invalid, return a default message
  if (diffInSeconds < 0 || isNaN(diffInSeconds)) {
    return "Date invalide";
  }

  // Define time intervals in seconds
  const intervals = {
    year: 31536000, // 365 * 24 * 60 * 60
    month: 2592000, // 30 * 24 * 60 * 60
    week: 604800, // 7 * 24 * 60 * 60
    day: 86400, // 24 * 60 * 60
    hour: 3600, // 60 * 60
    minute: 60,
  };

  // Check each interval
  if (diffInSeconds >= intervals.year) {
    const years = Math.floor(diffInSeconds / intervals.year);
    return `Publié il y a ${years} an${years > 1 ? "s" : ""}`;
  }

  if (diffInSeconds >= intervals.month) {
    const months = Math.floor(diffInSeconds / intervals.month);
    return `Publié il y a ${months} mois`;
  }

  if (diffInSeconds >= intervals.week) {
    const weeks = Math.floor(diffInSeconds / intervals.week);
    return `Publié il y a ${weeks} semaine${weeks > 1 ? "s" : ""}`;
  }

  if (diffInSeconds >= intervals.day) {
    const days = Math.floor(diffInSeconds / intervals.day);
    return `Publié il y a ${days} jour${days > 1 ? "s" : ""}`;
  }

  if (diffInSeconds >= intervals.hour) {
    const hours = Math.floor(diffInSeconds / intervals.hour);
    return `Publié il y a ${hours} heure${hours > 1 ? "s" : ""}`;
  }

  if (diffInSeconds >= intervals.minute) {
    const minutes = Math.floor(diffInSeconds / intervals.minute);
    return `Publié il y a ${minutes} minute${minutes > 1 ? "s" : ""}`;
  }

  // Entre 0 et 59 secondes: afficher juste “à l'instant”
  if (diffInSeconds >= 0) {
    return "Publié à l'instant";
  }

  return "Publié à l'instant";
};

/**
 * Format a date string to a relative time format for updates (e.g., "mis à jour il y a 2 jours")
 * @param dateString - The date string to format
 * @returns A formatted relative time string in French for updates
 */
export const formatRelativeUpdateTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  // If the date is in the future or invalid, return a default message
  if (diffInSeconds < 0 || isNaN(diffInSeconds)) {
    return "Date invalide";
  }

  // Define time intervals in seconds
  const intervals = {
    year: 31536000, // 365 * 24 * 60 * 60
    month: 2592000, // 30 * 24 * 60 * 60
    week: 604800, // 7 * 24 * 60 * 60
    day: 86400, // 24 * 60 * 60
    hour: 3600, // 60 * 60
    minute: 60,
  };

  // Check each interval
  if (diffInSeconds >= intervals.year) {
    const years = Math.floor(diffInSeconds / intervals.year);
    return `Mis à jour il y a ${years} an${years > 1 ? "s" : ""}`;
  }

  if (diffInSeconds >= intervals.month) {
    const months = Math.floor(diffInSeconds / intervals.month);
    return `Mis à jour il y a ${months} mois`;
  }

  if (diffInSeconds >= intervals.week) {
    const weeks = Math.floor(diffInSeconds / intervals.week);
    return `Mis à jour il y a ${weeks} semaine${weeks > 1 ? "s" : ""}`;
  }

  if (diffInSeconds >= intervals.day) {
    const days = Math.floor(diffInSeconds / intervals.day);
    return `Mis à jour il y a ${days} jour${days > 1 ? "s" : ""}`;
  }

  if (diffInSeconds >= intervals.hour) {
    const hours = Math.floor(diffInSeconds / intervals.hour);
    return `Mis à jour il y a ${hours} heure${hours > 1 ? "s" : ""}`;
  }

  if (diffInSeconds >= intervals.minute) {
    const minutes = Math.floor(diffInSeconds / intervals.minute);
    return `Mis à jour il y a ${minutes} minute${minutes > 1 ? "s" : ""}`;
  }

  return "Mis à jour à l'instant";
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
