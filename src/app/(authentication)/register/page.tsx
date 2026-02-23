import Logo from '@/assets/Logo';
import RegisterForm from '@/components/modules/Authentication/RegisterForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { P } from '@/components/ui/typography';
import images from '@/config/images';
import generateMetaTags from '@/seo/generateMetaTags';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

const RegisterPage = () => {
  return (
    <section className="center">
      <div
        className="flex flex-col gap-6 rounded-lg shadow-lg"
        data-aos="fade-left"
      >
        <Card className="overflow-hidden p-0">
          <CardContent className="grid p-0 md:grid-cols-2">
            {/* Image Section */}
            <div className="bg-muted relative hidden md:block">
              <Image
                className="absolute inset-0 h-full w-full object-cover brightness-[0.5] grayscale dark:brightness-[0.2]"
                src={images.auth}
                height={400}
                width={400}
                alt="Login Image"
              />
            </div>

            {/* Right side form */}
            <div className="p-8">
              <div className="flex flex-col items-center gap-6 text-center">
                <Link href={'/'}>
                  <Logo />
                </Link>
                <p className="text-muted-foreground text-balance">
                  Register to Smart Healthcare & Research Ltd.
                </p>
              </div>

              <RegisterForm />

              <div className="mt-4 text-center text-sm">
                Already have an account?
                <Link href="/login">
                  <Button variant="link" className="p-0 pl-1">
                    Sign in
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <P className="mt-4 text-center text-sm" data-aos="fade-left">
        By clicking continue, you agree to our
        <Button variant="link" asChild className="px-2">
          <Link href="/terms-conditions">Terms and Conditions</Link>
        </Button>
        and
        <Button variant="link" asChild className="px-2">
          <Link href="/privacy-policy">Privacy Policy</Link>
        </Button>
      </P>
    </section>
  );
};

export default RegisterPage;

// SEO Metadata
export const metadata: Metadata = generateMetaTags({
  title: 'Register | Smart Healthcare and Research Limited',
  description:
    'Create your account at Smart Healthcare and Research Limited to access advanced medical research tools, healthcare services, and personalized support.',
  keywords:
    'register, create account, sign up, Smart Healthcare and Research Limited, medical research, healthcare innovation, SHRL registration, join healthcare platform, medical data access',
  websitePath: '/register',
});

