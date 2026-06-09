import FAQ from '../../components/home/FAQ';
import Hero from '../../components/home/Hero';
import HowToConnect from '../../components/home/HowToConnect';
import MeetOurMedium from '../../components/home/MeetOutMedium';
import WhyChoose from '../../components/home/WhyChoose';

export default function Home() {

  return (
    <main className="flex flex-col min-h-screen w-full overflow-hidden">
      <Hero />
      <FAQ />
      <HowToConnect />
      <WhyChoose />
      <MeetOurMedium />
    </main>
  );
}



