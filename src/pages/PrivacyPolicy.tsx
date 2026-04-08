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
        <div className="prose prose-stone max-w-none prose-h3:font-serif prose-h3:text-[#310101] prose-h3:text-xl prose-p:text-[#310101] prose-p:leading-relaxed prose-li:text-[#310101]">
          {children}
        </div>
      </motion.div>
    </main>
    <Footer />
  </div>
);

const PrivacyPolicy = () => (
  <PolicyLayout title="Privacy Policy">
    <p>At Kaleemiya Perfumes ("we", "our", "us"), your privacy is our highest priority. This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from our website.</p>
    
    <h3>1. Information We Collect</h3>
    <p>When you visit the site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, when you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information, email address, and phone number.</p>
    
    <h3>2. How We Use Your Personal Information</h3>
    <p>We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations). Additionally, we use this Order Information to:</p>
    <ul>
      <li>Communicate with you (via email or WhatsApp) regarding your order.</li>
      <li>Screen our orders for potential risk or fraud.</li>
      <li>Provide you with information or advertising relating to our products or services, in line with the preferences you have shared with us.</li>
    </ul>
    
    <h3>3. Data Retention & Security</h3>
    <p>When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information. We implement industry-standard encryption and security measures to protect your sensitive data. However, no method of transmission over the internet is 100% secure.</p>
    
    <h3>4. Cookies & Analytics</h3>
    <p>We use "cookies" to enhance your browsing experience, remember your cart items, and analyze website traffic. You can choose to disable cookies through your individual browser options, though some features of the site may not function properly.</p>
    
    <h3>5. Third-Party Services</h3>
    <p>In general, the third-party providers used by us will only collect, use and disclose your information to the extent necessary to allow them to perform the services they provide to us (such as shipping providers and our web hosting infrastructure). We do not sell or lease your personal information to third parties.</p>

    <h3>6. Changes to This Policy</h3>
    <p>We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.</p>
    
    <h3>7. Contact Us</h3>
    <p>For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by visiting our Contact page.</p>
  </PolicyLayout>
);

export default PrivacyPolicy;
