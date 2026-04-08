import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const PolicyLayout = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="min-h-screen bg-[#FDFCFB]">
    <Header />
    <div className="h-24 md:h-32"></div>
    <main className="max-w-4xl mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="font-serif text-4xl md:text-5xl text-[#310101] mb-12 border-b border-[#310101]/10 pb-8">{title}</h1>
        <div className="prose prose-stone max-w-none prose-h3:font-serif prose-h3:text-[#310101] prose-h3:text-xl prose-p:text-[#310101] prose-p:leading-relaxed">
          {children}
        </div>
      </motion.div>
    </main>
    <Footer />
  </div>
);

const TermsOfService = () => (
  <PolicyLayout title="Terms of Service">
    <p>This website is operated by Kaleemiya Perfumes. Throughout the site, the terms "we", "us" and "our" refer to Kaleemiya Perfumes. Kaleemiya Perfumes offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.</p>
    
    <h3>1. General Conditions</h3>
    <p>We reserve the right to refuse service to anyone for any reason at any time. You understand that your content (not including credit card information), may be transferred unencrypted and involve transmissions over various networks. You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service without express written permission by us.</p>
    
    <h3>2. Products or Services</h3>
    <p>Certain products or services may be available exclusively online through the website. These products or services may have limited quantities and are subject to return or exchange only according to our Return Policy. We have made every effort to display as accurately as possible the colors and images of our products that appear at the store. We cannot guarantee that your computer monitor's display of any color will be accurate.</p>
    
    <h3>3. Accuracy of Billing and Account Information</h3>
    <p>We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. These restrictions may include orders placed by or under the same customer account, the same credit card, and/or orders that use the same billing and/or shipping address. In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the e-mail and/or billing address/phone number provided at the time the order was made.</p>
    
    <h3>4. Third-Party Links</h3>
    <p>Certain content, products and services available via our Service may include materials from third-parties. Third-party links on this site may direct you to third-party websites that are not affiliated with us. We are not responsible for examining or evaluating the content or accuracy and we do not warrant and will not have any liability or responsibility for any third-party materials or websites.</p>
    
    <h3>5. Personal Information</h3>
    <p>Your submission of personal information through the store is governed by our Privacy Policy. To view our Privacy Policy, please navigate to the Privacy Policy section at the bottom of our website.</p>

    <h3>6. Governing Law</h3>
    <p>These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the applicable laws of the jurisdiction in which Kaleemiya Perfumes is registered.</p>
    
    <h3>7. Changes to Terms of Service</h3>
    <p>You can review the most current version of the Terms of Service at any time at this page. We reserve the right, at our sole discretion, to update, change or replace any part of these Terms of Service by posting updates and changes to our website. It is your responsibility to check our website periodically for changes.</p>
  </PolicyLayout>
);

export default TermsOfService;
