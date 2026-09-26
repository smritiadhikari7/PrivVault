"use client";

import Image from "next/image";
import Link from "next/link";
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
        {/* HERO SECTION - REFINED CINEMATIC PRIVVAULT SANCTUARY */}
        <section className={styles.privHeroSection}>
          {/* Hero Background Image */}
          <div className={styles.privHeroBgCanvas} aria-hidden="true">
            <Image
              src="/Hero_Image.png"
              alt="PrivVault Sanctuary Portal"
              fill
              priority
              quality={100}
              className={styles.privHeroBackdropImg}
            />
            {/* Subtle bottom fade to seamlessly transition into the dark page */}
            <div className={styles.privHeroBottomFade} />
          </div>

          {/* Hero Content */}
          <div className={styles.privHeroContent}>
            {/* Eyebrow */}
            <div className={styles.privEyebrowWrap}>
              <span className={styles.privEyebrowDot} />
              <span className={styles.privEyebrowText}>PRIVVAULT</span>
              <span className={styles.privEyebrowDivider}>/</span>
              <span className={styles.privEyebrowBadge}>ZERO-KNOWLEDGE PRIVACY</span>
            </div>

            {/* Main Heading */}
            <h1 className={styles.privHeadline}>
              <span className={styles.privHeadlineLine1}>Prove permission.</span>
              <span className={styles.privHeadlineLine2}>Not identity.</span>
            </h1>

            {/* Supporting Paragraph */}
            <p className={styles.privParagraph}>
              PrivVault enables privacy-preserving credential verification with zero-knowledge proofs &mdash; letting users prove what they qualify for without exposing unnecessary personal information.
            </p>

            {/* CTA Buttons Row */}
            <div className={styles.privCtaRow}>
              <Link href="/gate" className={styles.privPrimaryBtn}>
                <span className={styles.privBtnText}>Launch PrivVault</span>
                <span className={styles.privBtnIconCircle}>
                  <span className={styles.privBtnArrow}>↗</span>
                </span>
              </Link>

              <a href="#how-it-works" className={styles.privSecondaryBtn}>
                <span>How it works</span>
                <span className={styles.privSecondaryArrow}>↗</span>
              </a>

              <Link href="/admin" className={styles.privConsoleLink} title="Operator & Issuer Console">
                <span>Issuer Console</span>
                <span className={styles.privConsoleArrow}>↗</span>
              </Link>
            </div>

            {/* Technology & Trust Strip */}
            <div className={styles.privTechStripBlock}>
              <div className={styles.privTechStripHeader}>
                <span className={styles.privTechHairline} />
                <span className={styles.privTechHeading}>BUILT WITH PRIVACY-FIRST INFRASTRUCTURE</span>
                <span className={styles.privTechHairline} />
              </div>

              <div className={styles.privTechMarquee}>
                {ecosystemItems.map((item) => (
                  <div key={item.name} className={styles.privTechBadge}>
                    <span className={styles.privTechGlyph}>{item.glyph}</span>
                    <span className={styles.privTechName}>{item.name}</span>
                  </div>
                ))}
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
