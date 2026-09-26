"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { LandingNavbar } from "./LandingNavbar";
import { ProblemComparison } from "./ProblemComparison";
import { CoreCapabilities } from "./CoreCapabilities";
import { HowItWorksFlow } from "./HowItWorksFlow";
import { InteractiveZkDemo } from "./InteractiveZkDemo";
import { PrivacyArchitecture } from "./PrivacyArchitecture";
import { UseCasesGrid } from "./UseCasesGrid";
import { TechArchitecture } from "./TechArchitecture";
import { SecurityTrust } from "./SecurityTrust";
import { ProductShowcase } from "./ProductShowcase";
import { MidnightEcosystem } from "./MidnightEcosystem";
import { DifferentiatorMatrix } from "./DifferentiatorMatrix";
import { FaqAccordion } from "./FaqAccordion";
import { FinalCta } from "./FinalCta";
import { LandingFooter } from "./LandingFooter";
import styles from "./Landing.module.css";

export function LandingPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/gate?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/gate");
    }
  };

  const handleQuickSearch = (term: string) => {
    setSearchQuery(term);
    router.push(`/gate?q=${encodeURIComponent(term)}`);
  };

  return (
    <div className={styles.landingShell}>
      {/* Precision Ambient Film Grain */}
      <div className={styles.somaGrainLayer} aria-hidden="true" />

      {/* Navigation */}
      <LandingNavbar />

      <main className={styles.mainContent}>
        {/* HERO SECTION - EXACT REPLICA OF REFERENCE DESIGN WITH HERO-VAULT.PNG BACKGROUND */}
        <section className={styles.escapeHeroSection}>
          {/* Full-Bleed Background using hero-vault.png */}
          <div className={styles.escapeBgWrap}>
            <Image
              src="/hero-vault.png"
              alt="PrivVault Sanctuary Portal - Hero Background"
              fill
              priority
              quality={95}
              className={styles.escapeBgImage}
            />
            {/* Luminous warm mist at top + gradual dark fade into page at bottom */}
            <div className={styles.escapeAtmosphereOverlay} />
            <div className={styles.escapeBottomGradient} />
          </div>

          <div className={styles.escapeHeroContent}>
            {/* Eyebrow Pill Badge (Exact replica of: 🏛 Voted best peaceful place in the world) */}
            <div className={styles.escapeEyebrowPill}>
              <span className={styles.escapeEyebrowIcon}>🏛</span>
              <span className={styles.escapeEyebrowText}>
                Voted best peaceful place in the world
              </span>
            </div>

            {/* Headline (Exact replica of: The best place to find your Inner Peace) */}
            <h1 className={styles.escapeHeadline}>
              The best place to find<br />
              your <span className={styles.escapeSerifAccent}>Inner Peace</span>
            </h1>

            {/* Subtitle (Exact replica of: Feeling ready to relax ? Find the best location to reconnect with nature and find inner calm.) */}
            <p className={styles.escapeSubtitle}>
              Feeling ready to relax ? Find the best location to reconnect with nature and find inner calm.
            </p>

            {/* Search Bar (Exact replica of: Search for a location... [ Search Now ]) */}
            <form onSubmit={handleSearchSubmit} className={styles.escapeSearchBar}>
              <div className={styles.escapeSearchInputWrap}>
                <Search size={18} className={styles.escapeSearchIcon} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for a location..."
                  className={styles.escapeSearchInput}
                  aria-label="Search for a location"
                />
              </div>
              <button type="submit" className={styles.escapeSearchBtn}>
                <span>Search Now</span>
              </button>
            </form>

            {/* Quick Suggestion Chips */}
            <div className={styles.escapeSuggestionChips}>
              <span className={styles.suggestionLabel}>Popular:</span>
              <button
                type="button"
                onClick={() => handleQuickSearch("Alpine Sanctuary")}
                className={styles.suggestionChip}
              >
                Alpine Sanctuary
              </button>
              <button
                type="button"
                onClick={() => handleQuickSearch("Lake Meadow")}
                className={styles.suggestionChip}
              >
                Lake Meadow
              </button>
              <button
                type="button"
                onClick={() => handleQuickSearch("Forest Retreat")}
                className={styles.suggestionChip}
              >
                Forest Retreat
              </button>
              <button
                type="button"
                onClick={() => handleQuickSearch("Mountain Valley")}
                className={styles.suggestionChip}
              >
                Mountain Valley
              </button>
            </div>
          </div>

          {/* Bottom Social Proof / Brand Logos (Exact replica of: Featured as the safest place to go in / Forbes, Men'sHealth, Bloomberg, The Washington Post) */}
          <div className={styles.escapeBottomProofBlock}>
            <p className={styles.escapeProofCaption}>
              Featured as the safest place to go in
            </p>
            <div className={styles.escapeLogosRow}>
              <span className={styles.logoItemForbes}>Forbes</span>
              <span className={styles.logoItemMensHealth}>Men’sHealth</span>
              <span className={styles.logoItemBloomberg}>Bloomberg</span>
              <span className={styles.logoItemWashPost}>The Washington Post</span>
            </div>
          </div>
        </section>

        {/* 1. PROBLEM COMPARISON */}
        <ProblemComparison />

        {/* 2. CORE PROTOCOL PILLARS */}
        <CoreCapabilities />

        {/* 3. HOW IT WORKS 4-STEP FLOW */}
        <HowItWorksFlow />

        {/* 4. INTERACTIVE ZK DEMONSTRATION SANDBOX */}
        <InteractiveZkDemo />

        {/* 5. PRIVACY ARCHITECTURE & DUAL-STATE */}
        <PrivacyArchitecture />

        {/* 6. USE CASES GRID */}
        <UseCasesGrid />

        {/* 7. LIVE PRODUCT SHOWCASE */}
        <ProductShowcase />

        {/* 8. TECHNICAL ARCHITECTURE & DATA FLOW */}
        <TechArchitecture />

        {/* 9. SECURITY & CRYPTOGRAPHIC TRUST */}
        <SecurityTrust />

        {/* 10. BUILT ON MIDNIGHT ECOSYSTEM */}
        <MidnightEcosystem />

        {/* 11. DIFFERENTIATOR MATRIX */}
        <DifferentiatorMatrix />

        {/* 12. FAQ ACCORDION */}
        <FaqAccordion />

        {/* 13. FINAL CINEMATIC CTA */}
        <FinalCta />
      </main>

      {/* FOOTER */}
      <LandingFooter />
    </div>
  );
}
