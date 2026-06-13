import Footer from '@/components/LandingPage/Footer';
import Faq from '@/components/LandingPage/Home/Faq';
import Features from '@/components/LandingPage/Home/Features';
import HeroPage from '@/components/LandingPage/Home/HeroPage';
import Newsletter from '@/components/LandingPage/Home/Newsletter';
import Carousel from '@/components/LandingPage/Home/Usecases';
import Navbar from '@/components/LandingPage/Navbar';

export default function Page() {
  return (
    <div>
      <Navbar />
      <HeroPage />
      <Features />
      <Carousel />
      <Newsletter />
      <Faq />
      <Footer />
    </div>
  );
}
