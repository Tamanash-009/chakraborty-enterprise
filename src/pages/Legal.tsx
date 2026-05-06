import React from 'react';
import { motion } from 'motion/react';
import { Shield, ChevronRight } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import SEO from '../components/SEO';

const LegalLayout = ({ title, description, children }: { title: string, description: string, children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="py-12 max-w-4xl mx-auto px-4"
  >
    <SEO title={title} description={description} />
    <header className="mb-12 text-center md:text-left">
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">
        Legal Document
      </div>
      <h1 className="text-4xl font-extrabold text-text-main uppercase tracking-tighter leading-none mb-4 italic">{title}</h1>
      <p className="text-text-muted font-medium italic text-lg">{description}</p>
      <p className="text-[10px] text-text-muted mt-2 uppercase tracking-widest font-bold">Last Updated: May 2026 &nbsp;|&nbsp; Effective Date: 1 May 2026</p>
    </header>
    <div className="bg-surface bento-card p-10 border-border text-text-muted leading-relaxed space-y-8 font-medium italic">
      {children}
    </div>
    <footer className="mt-12 p-8 bg-background rounded-[2.5rem] border border-border flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-surface rounded-2xl flex items-center justify-center text-primary shadow-sm border border-border">
          <Shield size={24} strokeWidth={3} />
        </div>
        <p className="text-xs font-bold text-text-main uppercase tracking-tight italic">Your data privacy is our absolute priority.</p>
      </div>
      <a href={`mailto:${CONTACT_INFO.email}`} className="text-xs font-black uppercase tracking-widest text-primary hover:underline decoration-2 underline-offset-4 italic">
        Legal Inquiries <ChevronRight size={14} className="inline" strokeWidth={3} />
      </a>
    </footer>
  </motion.div>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section>
    <h2 className="text-lg font-black text-text-main uppercase tracking-tight mb-3 italic not-italic">{title}</h2>
    <div className="space-y-2">{children}</div>
  </section>
);

export const Privacy = () => (
  <LegalLayout
    title="Privacy Policy"
    description="How we collect, use, and safeguard your personal information at Chakraborty Enterprise, in accordance with Indian law."
  >
    <Section title="1. Introduction">
      <p>Chakraborty Enterprise (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is an authorised Common Service Centre (CSC) operating under CSC e-Governance Services India Limited. This Privacy Policy governs the collection, use, and disclosure of personal information in compliance with the Information Technology Act, 2000, and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.</p>
    </Section>
    <Section title="2. Information We Collect">
      <p>We collect only the minimum personal information necessary to deliver our services, including but not limited to: full name, date of birth, residential address, Aadhaar number (masked), PAN card number, mobile number, and email address. Biometric data processed through AEPS (Aadhaar-Enabled Payment System) is authenticated directly through the UIDAI gateway and is never stored on our local systems.</p>
    </Section>
    <Section title="3. Purpose of Collection">
      <p>Your information is collected exclusively to facilitate your requested government or digital service (e.g., Aadhaar update, PAN application, banking, scholarship), to communicate service status updates, and to maintain records as required by applicable law or government mandate.</p>
    </Section>
    <Section title="4. Data Sharing & Disclosure">
      <p>We do not sell, rent, or trade your personal data to any third party for commercial purposes. Information is shared only with the relevant government portals, banking correspondents, or statutory authorities as strictly necessary to process your application. All such sharing is governed by the respective government body's data handling policies.</p>
    </Section>
    <Section title="5. Data Retention">
      <p>Physical documents are returned to you immediately after scanning. Digital copies are retained for a period not exceeding 90 days unless a longer retention period is required by a specific government scheme or audit requirement, after which they are securely deleted.</p>
    </Section>
    <Section title="6. Security Measures">
      <p>We implement reasonable security practices as mandated by Rule 8 of the SPDI Rules, 2011, including access-controlled systems, encrypted file transfers, and regular staff training on data confidentiality.</p>
    </Section>
    <Section title="7. Your Rights">
      <p>You have the right to review, correct, or request deletion of your personal data held by us, subject to applicable legal obligations. To exercise these rights, contact us at the email address below.</p>
    </Section>
    <Section title="8. Grievance Officer">
      <p>In accordance with the IT Act, 2000, the Grievance Officer for any privacy-related concerns is: Atanu Chakraborty, Chakraborty Enterprise, Chhoto Jagulia, North 24 Parganas, West Bengal. Email: {CONTACT_INFO.email}</p>
    </Section>
    <Section title="9. Changes to This Policy">
      <p>We reserve the right to update this Privacy Policy at any time. The revised policy will be posted on this page with an updated effective date. Continued use of our services after any such changes constitutes your acceptance of the new terms.</p>
    </Section>
  </LegalLayout>
);

export const Terms = () => (
  <LegalLayout
    title="Terms & Conditions"
    description="Standard rules and responsibilities governing the use of services provided by Chakraborty Enterprise, an authorised CSC Digital Centre."
  >
    <Section title="1. Acceptance of Terms">
      <p>By visiting our centre or using our digital services, you agree to be bound by these Terms and Conditions. If you do not agree, please refrain from using our services. These Terms are governed by the laws of the Republic of India and the State of West Bengal.</p>
    </Section>
    <Section title="2. Nature of Services">
      <p>Chakraborty Enterprise acts as an authorised facilitator and VLE (Village Level Entrepreneur) under the CSC e-Governance Services India Limited framework. We assist citizens in accessing government portals and digital services. Final processing, approval, or rejection of any application rests solely with the concerned government authority or ministry.</p>
    </Section>
    <Section title="3. Customer Responsibilities">
      <p>Customers are solely responsible for providing accurate, complete, and truthful information and documentation. We shall not be liable for any rejection, delay, or penalty arising from incorrect or fraudulent information provided by the customer. Submission of forged documents is a criminal offence under the Indian Penal Code.</p>
    </Section>
    <Section title="4. Service Charges">
      <p>Applicable charges comprise (a) official government/portal fees as mandated by the concerned authority, and (b) a nominal professional service fee for our assistance. All charges will be clearly communicated and consented to by the customer prior to processing. We provide receipts for all transactions.</p>
    </Section>
    <Section title="5. Limitation of Liability">
      <p>To the maximum extent permitted by applicable law, Chakraborty Enterprise shall not be liable for any indirect, incidental, or consequential damages arising from delays in government processing, portal downtime, or force majeure events beyond our reasonable control.</p>
    </Section>
    <Section title="6. Intellectual Property">
      <p>All content, trademarks, logos, and digital materials on this website are the exclusive property of Chakraborty Enterprise. Unauthorised copying, reproduction, or distribution of this website, its code, design, or UI elements is strictly prohibited and may attract civil and criminal liability under the Copyright Act, 1957, and the Information Technology Act, 2000.</p>
    </Section>
    <Section title="7. Governing Law & Jurisdiction">
      <p>These Terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts located in Barasat, North 24 Parganas, West Bengal.</p>
    </Section>
    <Section title="8. Amendments">
      <p>We reserve the right to amend these Terms at any time. Continued use of our services following any amendment constitutes acceptance of the revised Terms.</p>
    </Section>
  </LegalLayout>
);

export const Refund = () => (
  <LegalLayout
    title="Refund Policy"
    description="Policy regarding cancellation and refund of service fees at Chakraborty Enterprise."
  >
    <Section title="1. Government Portal Fees">
      <p>Fees remitted directly to government portals (e.g., UIDAI, NSDL, UTIITSL, NIC) on your behalf are strictly non-refundable as per the respective government authority's policy. Chakraborty Enterprise has no control over and cannot initiate refunds for any amounts credited to government portals.</p>
    </Section>
    <Section title="2. Service Fee — Eligible Refunds">
      <p>Our professional service fee is fully refundable if: (a) we are unable to process your application due to a technical fault on our part, or (b) the service requested is unavailable at the time of engagement through no fault of the customer. Refund requests must be raised within 7 days of the date of service.</p>
    </Section>
    <Section title="3. Service Fee — Non-Refundable Cases">
      <p>Our service fee is non-refundable if: (a) the application is rejected by the government authority due to ineligibility or incorrect information provided by the customer, (b) the customer decides not to proceed after the application has been submitted, or (c) the customer does not appear for a scheduled appointment without prior notice.</p>
    </Section>
    <Section title="4. Cancellations & Rescheduling">
      <p>Appointments may be cancelled or rescheduled at any time prior to the service date without any penalty. No advance payment is required for most consultation services. We ask for a minimum of 2 hours' notice for cancellations out of courtesy to other customers.</p>
    </Section>
    <Section title="5. Refund Process">
      <p>Approved refunds will be processed within 5–7 working days via the original payment method (cash or UPI). To initiate a refund, contact us on WhatsApp or email with your service receipt number.</p>
    </Section>
  </LegalLayout>
);
