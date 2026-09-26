"use client";

import Link from "next/link";
import { ChevronRight, Terminal } from "lucide-react";
import { LandingNavbar } from "./LandingNavbar";
import { HeroVisual } from "./HeroVisual";
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

const ecosystemItems = [
  { name: "Midnight", glyph: "◐" },
  { name: "Compact DSL", glyph: "◈" },
  { name: "zk-SNARKs", glyph: "π" },
  { name: "Lace Wallet", glyph: "◇" },
  { name: "1AM Wallet", glyph: "⏱" },
  { name: "Preprod", glyph: "◎" },
  { name: "Apache-2.0", glyph: "§" },
];

export function LandingPage() {
  return (
    <div className={styles.landingShell}>
      {/* Precision Ambient Film Grain */}
      <div className={styles.somaGrainLayer} aria-hidden="true" />

      {/* Navigation */}
      <LandingNavbar />

      <main className={styles.mainContent}>
        {/* HERO SECTION - REPLICA OF THE SOMA AESTHETIC */}
        <section className={styles.somaHeroSection}>
          {/* Ethereal diagonal light leak & lens flare at top-right */}
          <div className={styles.somaLightLeakBeam} aria-hidden="true" />
          <div className={styles.somaLightLeakCore} aria-hidden="true" />
          <div className={styles.somaStardustParticles} aria-hidden="true" />

          <div className={styles.somaHeroContent}>
            {/* Small uppercase eyebrow */}
            <p className={styles.somaEyebrow}>
              POWERED BY MIDNIGHT &amp; COMPACT ZK-SNARK™
            </p>

            {/* Headline */}
            <h1 className={styles.somaHeadline}>
              Prove permission.<br />
              Not identity.
            </h1>

            {/* Supporting Copy */}
            <p className={styles.somaSubtitle}>
              Nexora enables privacy-preserving credential verification with zero-knowledge proofs &mdash; letting users prove what they qualify for without exposing unnecessary personal information.
            </p>

            {/* Dual Pill Action Buttons */}
            <div className={styles.somaButtonsRow}>
              <Link href="/gate" className={styles.somaPrimaryBtn}>
                <span className={styles.somaBtnTextBlack}>Launch Nexora</span>
                <span className={styles.somaBtnArrowBlack}>&rarr;</span>
              </Link>
              <a href="#how-it-works" className={styles.somaSecondaryBtn}>
                <span>How it works</span>
                <span className={styles.somaBtnArrowWhite}>&rarr;</span>
              </a>
              <Link href="/admin" className={styles.somaConsoleLink}>
                <Terminal size={13} />
                <span>Console</span>
                <ChevronRight size={12} />
              </Link>
            </div>

            {/* Works with Tools / Infrastructure strip */}
            <div className={styles.somaToolsBlock}>
              <div className={styles.somaToolsDivider}>
                <span className={styles.hairlineLeft} />
                <span className={styles.dividerCaption}>BUILT WITH PRIVACY-FIRST INFRASTRUCTURE</span>
                <span className={styles.hairlineRight} />
              </div>

              <div className={styles.somaLogosRow}>
                {ecosystemItems.map((item) => (
                  <div key={item.name} className={styles.somaLogoItem}>
                    <span className={styles.somaGlyph}>{item.glyph}</span>
                    <span className={styles.somaLogoName}>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Card Peek at Bottom with Carousel Indicators */}
            <div className={styles.somaCardPeekWrapper}>
              <div className={styles.somaCarouselIndicators}>
                <span className={`${styles.carouselIndicator} ${styles.carouselIndicatorActive}`} />
                <span className={styles.carouselIndicator} />
                <span className={styles.carouselIndicator} />
              </div>

              <div className={styles.somaProductCardFrame}>
                <HeroVisual />
              </div>
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
