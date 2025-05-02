
import Layout from '@/components/Layout';
import HeroSection from '@/components/home/HeroSection';
import ProblemSolutionSection from '@/components/home/ProblemSolutionSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import ScreenshotCarousel from '@/components/home/ScreenshotCarousel';
import WhySoftchatSection from '@/components/home/WhySoftchatSection';
import NewsletterSection from '@/components/home/NewsletterSection';

const Home = () => {
  return (
    <Layout>
      <HeroSection />
      <ProblemSolutionSection />
      <FeaturesSection />
      <ScreenshotCarousel />
      <WhySoftchatSection />
      <NewsletterSection />
    </Layout>
  );
};

export default Home;
