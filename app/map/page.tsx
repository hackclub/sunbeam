import type { Metadata } from "next";
import PocMap from "./PocMap";

export const metadata: Metadata = {
  title: "Organizer Map - Sunbeam",
  description: "Sunbeam organizers around the world!",
};

export default function MapPage() {
  return <PocMap />;
}
