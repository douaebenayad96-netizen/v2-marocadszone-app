export function formatTimeAgoFr(dateInput: string | number | Date | null | undefined): string {
  if (!dateInput) return "";

  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
  if (Number.isNaN(date.getTime())) return "";

  const diffMs = Date.now() - date.getTime();
  if (diffMs < 0) return "";

  const seconds = Math.floor(diffMs / 1000);
  if (seconds < 60) return `publier il y a ${seconds} seconde${seconds > 1 ? "s" : ""}`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `publier il y a ${minutes} minute${minutes > 1 ? "s" : ""}`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `publier il y a ${hours} heure${hours > 1 ? "s" : ""}`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `publier il y a ${days} jour${days > 1 ? "s" : ""}`;

  // Fallback: show date (if too old)
  return date.toLocaleDateString("fr-FR");
}

