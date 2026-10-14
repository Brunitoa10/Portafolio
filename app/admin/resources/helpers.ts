import type { ProjectTag } from "@/types";
import type { SingleRecord } from "./types";

/** Lectores y utilidades compartidas por las definiciones. */

export const text = (row: SingleRecord, key: string): string => {
  const value = row[key];
  return typeof value === "string" ? value : "";
};

export const list = (row: SingleRecord, key: string): string[] => {
  const value = row[key];
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
};

export const tagList = (row: SingleRecord, key: string): ProjectTag[] => {
  const value = row[key];
  return Array.isArray(value) ? (value as ProjectTag[]) : [];
};

export const clip = (value: string, max: number): string =>
  value.length > max ? `${value.slice(0, max).trimEnd()}…` : value;

export const ACCENT_OPTIONS = [
  { value: "cyan", label: "Cian" },
  { value: "green", label: "Verde" },
];
