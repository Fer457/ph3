"use client";

import LandingPageContent from "@/components/landing-page-content";
import LandingPageHeader from "@/components/landing-page-header";

export default function Home() {
  return (
    <>
      <div className="heroBg"></div>
      <div>
        <LandingPageHeader />
        <main className="flex flex-col py-12 px-[20%] md:px-[30%] text-center items-center animate-fade-in">
          <LandingPageContent />
        </main>
      </div>
    </>
  );
}
