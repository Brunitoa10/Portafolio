"use client";

import ContentSections from "./ContentSections";
import Header from "./Header";
import ImageSection from "./ImageSection";


export default function Hero() {
  return (
    <section className="text-center py-10 flex flex-col items-center">
      <Header />
      <ImageSection />
      <ContentSections />
    </section>
  );
}
