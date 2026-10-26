import { Architecture } from "./components/Architecture";
import { Ask } from "./components/Ask";
import { Contact, Footer } from "./components/Contact";
import { Experience } from "./components/Experience";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Impact } from "./components/Impact";
import { Palette } from "./components/Palette";
import { Skills } from "./components/Skills";
import { Terminal } from "./components/Terminal";
import { Toast } from "./components/Toast";
import { Tour } from "./components/Tour";

export default function App() {
  return (
    <div id="top">
      <a
        href="#main"
        class="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-[110] focus:bg-ink focus:px-4 focus:py-2 focus:text-canvas"
      >
        Skip to content
      </a>
      <div class="grain" aria-hidden="true" />
      <Header />
      <main id="main" class="mx-auto max-w-6xl px-5">
        <Hero />
        <Impact />
        <Experience />
        <Architecture />
        <Skills />
        <div class="no-print">
          <Terminal />
        </div>
        <Ask />
        <Contact />
      </main>
      <Footer />
      <Palette />
      <Toast />
      <Tour />
    </div>
  );
}
