import Contact from '@/components/modules/Public/contact/Contact';
import generateMetaTags from '@/seo/generateMetaTags';
import { Metadata } from 'next';

const ContactPage = () => {
  return (
    <>
      <Contact />
    </>
  );
};

export default ContactPage;

//  SEO Metatag
export const metadata: Metadata = generateMetaTags({
  title: 'Contact Us | Lumiere Fashion',
  description:
    'Get in touch with Lumiere Fashion for any inquiries, project collaborations, or support. We are here to help you with your modern apparel needs.',
  keywords:
    'Contact Lumiere Fashion, Customer Support, Fashion Brand Contact, Dhaka Apparel, Clothing Store Contact',
  websitePath: '/contact',
});
