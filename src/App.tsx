import { useState } from 'react';
import SelectionScreen from './components/SelectionScreen';
import Hero from './components/Hero';
import About from './components/About';
import SkillsWheel from './components/SkillsWheel';
import Works from './components/Works';
import Contact from './components/Contact';
import ScrollSideNav from './components/ScrollSideNav';

function App() {
  const [theme, setTheme] = useState<'selection' | 'red' | 'blue'>('selection');

  if (theme === 'selection') {
    return <SelectionScreen onSelect={setTheme} />;
  }

  return (
    <main className={`min-h-screen w-full flex flex-col bg-background relative overflow-hidden ${theme === 'red' ? 'theme-red' : 'theme-blue'}`}>
      <ScrollSideNav theme={theme} />
      <Hero theme={theme} onThemeChange={setTheme} />
      <About theme={theme} />
      <SkillsWheel theme={theme} />
      <Works theme={theme} />
      <Contact theme={theme} />
    </main>
  );
}

export default App;
