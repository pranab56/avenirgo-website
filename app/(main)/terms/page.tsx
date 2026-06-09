'use client';

import { motion } from 'framer-motion';

const termsSections = [
  {
    title: '1. Acceptance of Terms',
    content: 'By accessing and using AvenirGo, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service. These terms apply to all users of the platform, including seekers, providers, and visitors.'
  },
  {
    title: '2. Definitions',
    content: '"Platform" refers to AvenirGo website and services. "User" means any person who accesses or uses our platform. "Service Provider" refers to individuals or companies offering spiritual guidance. "Seeker" refers to individuals seeking spiritual insight. "Content" includes all information, data, text, software, music, sound, photographs, graphics, video, messages, or other materials.'
  },
  {
    title: '3. User Accounts',
    content: 'Users must provide accurate and complete information when creating an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must immediately notify us of any unauthorized use of your account. We reserve the right to suspend or terminate accounts that violate these terms.'
  },
  {
    title: '4. Service Provider Guidelines',
    content: 'Service providers must ensure all session descriptions are legitimate, accurate, and comply with applicable laws. Discriminatory postings are prohibited. All service descriptions must clearly state requirements, compensation, and working conditions. Users are responsible for their engagement decisions and compliance with local laws. We reserve the right to remove postings that violate our guidelines.'
  },
  {
    title: '5. Seeker Responsibilities',
    content: 'Seekers must provide truthful information in their profiles and applications. Misrepresentation of needs or qualifications is prohibited. Users are responsible for evaluating opportunities and providers. We do not guarantee the accuracy of service descriptions or the legitimacy of providers. Seekers should exercise due diligence when engaging with potential providers.'
  },
  {
    title: '6. Payments and Fees',
    content: 'Certain services may require payment of fees. All fees are non-refundable unless otherwise stated. Payment processing is handled by third-party providers. Users are responsible for providing accurate payment information. We reserve the right to change our fee structure with appropriate notice. Failure to pay fees may result in suspension of services.'
  },
  {
    title: '8. Prohibited Activities',
    content: 'Users may not engage in fraudulent activities, harassment, spamming, or any illegal conduct. Attempting to circumvent our systems or policies is prohibited. Users cannot use automated tools to access our platform without permission. Impersonation of others or creation of fake accounts is not allowed. Violation of these prohibitions may result in immediate account termination.'
  },
  {
    title: '9. Privacy and Data Protection',
    content: 'We collect and use personal information as described in our Privacy Policy. Users consent to our data practices by using our platform. We implement security measures to protect user data but cannot guarantee absolute security. Users have certain rights regarding their personal data as outlined in our Privacy Policy. We may share data with third parties as necessary for platform operation.'
  },
  {
    title: '10. Disclaimer of Warranties',
    content: 'Our platform is provided "as is" without warranties of any kind. We do not guarantee uninterrupted service or error-free operation. We disclaim all warranties, express or implied, including merchantability and fitness for a particular purpose. Users assume all risks associated with platform use. We are not responsible for third-party content or services accessed through our platform.'
  },
  {
    title: '11. Limitation of Liability',
    content: 'We shall not be liable for any indirect, incidental, special, or consequential damages. Our total liability shall not exceed the amount paid by the user in the twelve months preceding the claim. We are not liable for losses resulting from user interactions or relationships formed through our platform. This limitation applies to the fullest extent permitted by law.'
  },
  {
    title: '12. Termination',
    content: 'We may terminate or suspend accounts at our discretion for violations of these terms. Users may terminate their accounts at any time. Upon termination, user access to the platform will cease, but certain provisions of these terms will survive termination. We reserve the right to retain user data as required by law or for legitimate business purposes.'
  },
  {
    title: '13. Changes to Terms',
    content: 'We reserve the right to modify these terms at any time. Users will be notified of material changes through email or platform notifications. Continued use of the platform after changes constitutes acceptance of new terms. Users who disagree with changes should discontinue use of the platform. The most current version of terms will always be available on our website.'
  },
  {
    title: '14. Contact Information',
    content: 'For questions about these terms, please contact us at legal@avenirgo.com or write to us at AvenirGo Legal Department, 123 Business Street, Suite 456, City, State 12345. We will respond to inquiries within a reasonable time frame. Users may also contact us through our platform\'s support system for general questions about terms and policies.'
  }
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#E5E5E5] pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-5xl">

        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#1A1A1A] font-bold text-5xl md:text-6xl tracking-tight"
          >
            Terms and Conditions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[#1A1A1A] font-bold text-lg"
          >
            Last updated: January 15, 2025
          </motion.p>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          {termsSections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="space-y-4"
            >
              <h2 className="text-[#1A1A1A] font-bold text-2xl tracking-tight">
                {section.title}
              </h2>
              <p className="text-[#4A4A4A] text-lg leading-relaxed font-medium">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
