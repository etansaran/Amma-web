import { format, formatDistanceToNow } from "date-fns";

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatDate(date: Date | string, pattern: string = "dd MMM yyyy"): string {
  return format(new Date(date), pattern);
}

export function formatRelativeTime(date: Date | string): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export function formatCurrency(amount: number, currency: string = "INR"): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).replace(/\s+\S*$/, "") + "...";
}

export const CURRENCY_RATES: Record<string, number> = {
  INR: 1,
  USD: 83.5,
  GBP: 106.2,
  EUR: 90.1,
  AUD: 54.8,
  CAD: 61.4,
  SGD: 62.3,
};

export const CURRENCY_SYMBOLS: Record<string, string> = {
  INR: "₹",
  USD: "$",
  GBP: "£",
  EUR: "€",
  AUD: "A$",
  CAD: "C$",
  SGD: "S$",
};

export function convertToINR(amount: number, currency: string): number {
  const rate = CURRENCY_RATES[currency] || 1;
  return Math.round(amount * rate);
}

export function apiResponse<T>(data: T, status: number = 200) {
  return Response.json(data, { status });
}

export function apiError(message: string, status: number = 400) {
  return Response.json({ error: message }, { status });
}
