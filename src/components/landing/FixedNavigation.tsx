
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import logo from '../../../public/logo-andora.svg';

const FixedNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 shadow-sm backdrop-blur-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <img src={logo} alt="Andora" className="h-8 md:h-10" />
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('recursos')}
              className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
            >
              Funcionalidades
            </button>
            <button 
              onClick={() => scrollToSection('depoimentos')}
              className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
            >
              Depoimentos
            </button>
            <button 
              onClick={() => scrollToSection('precos')}
              className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
            >
              Preços
            </button>

            <div className="relative group">
              <button className="flex items-center text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                Recursos <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="py-1">
                  <button 
                    onClick={() => scrollToSection('inicio')}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    WhatsApp Bot
                  </button>
                  <button 
                    onClick={() => scrollToSection('recursos')}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Integração com CRM
                  </button>
                  <button 
                    onClick={() => scrollToSection('recursos')}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Automações
                  </button>
                </div>
              </div>
            </div>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => document.getElementById('header')?.querySelector('button[modalTrigger=true]')?.click()}
              className="text-gray-700 hover:bg-gray-100"
            >
              Entrar
            </Button>
            <Button 
              className="bg-primary text-white hover:bg-primary/90"
              onClick={() => scrollToSection('inicio')}
            >
              Começar grátis
            </Button>
          </div>
          
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className={`w-6 h-0.5 bg-gray-800 transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-gray-800 mt-1.5 transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-gray-800 mt-1.5 transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden absolute w-full bg-white shadow-lg transition-all duration-300 ${mobileMenuOpen ? 'max-h-96 border-t' : 'max-h-0 overflow-hidden'}`}>
        <div className="container mx-auto px-4 py-4 space-y-4">
          <button 
            onClick={() => scrollToSection('recursos')}
            className="block w-full text-left py-2 text-gray-700 hover:text-primary transition-colors border-b border-gray-100"
          >
            Funcionalidades
          </button>
          <button 
            onClick={() => scrollToSection('depoimentos')}
            className="block w-full text-left py-2 text-gray-700 hover:text-primary transition-colors border-b border-gray-100"
          >
            Depoimentos
          </button>
          <button 
            onClick={() => scrollToSection('precos')}
            className="block w-full text-left py-2 text-gray-700 hover:text-primary transition-colors border-b border-gray-100"
          >
            Preços
          </button>
          <button 
            onClick={() => document.getElementById('header')?.querySelector('button[modalTrigger=true]')?.click()}
            className="block w-full text-left py-2 text-gray-700 hover:text-primary transition-colors border-b border-gray-100"
          >
            Entrar
          </button>
          <Button 
            className="w-full bg-primary text-white hover:bg-primary/90"
            onClick={() => scrollToSection('inicio')}
          >
            Começar grátis
          </Button>
        </div>
      </div>
    </header>
  );
};

export default FixedNavigation;
