
import { Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from '../../public/logo-andora.svg';
import LogoVariado from '../../public/logotipo_variado.png'

const Footer = () => {
  return (
    <footer className="bg-primary mt-20" id="contato">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 pb-12 border-b border-white/10">
          <div>
            <img src={LogoVariado} alt="Andora" className="mb-4 h-12" />
            <p className="text-sm text-white/80 mb-6">
              Transformamos o WhatsApp em uma máquina de vendas com Inteligência Artificial.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/70 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Produto</h3>
            <ul className="space-y-2">
              <li>
                <a href="#recursos" className="text-sm text-white/80 hover:text-white transition-colors">
                  Recursos
                </a>
              </li>
              <li>
                <a href="#precos" className="text-sm text-white/80 hover:text-white transition-colors">
                  Preços
                </a>
              </li>
              <li>
                <a href="#depoimentos" className="text-sm text-white/80 hover:text-white transition-colors">
                  Depoimentos
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/80 hover:text-white transition-colors">
                  Integrações
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/80 hover:text-white transition-colors">
                  Status
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Empresa</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-sm text-white/80 hover:text-white transition-colors">
                  Sobre nós
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/80 hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/80 hover:text-white transition-colors">
                  Carreiras
                </a>
              </li>
              <li>
                <a href="#contato" className="text-sm text-white/80 hover:text-white transition-colors">
                  Contato
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/80 hover:text-white transition-colors">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/80 hover:text-white transition-colors">
                  Termos de Uso
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Assine nossa newsletter</h3>
            <p className="text-sm text-white/80 mb-4">
              Receba dicas, atualizações e ofertas exclusivas.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Seu e-mail" 
                className="bg-white/10 rounded-l-md px-4 py-2 text-white placeholder:text-white/50 border border-white/20 focus:outline-none focus:border-white/40 flex-1"
              />
              <Button className="rounded-l-none bg-secondary text-primary hover:bg-secondary/90">
                <Send size={16} />
              </Button>
            </div>
            <p className="text-xs text-white/60 mt-2">
              Ao se inscrever, você concorda com nossa política de privacidade.
            </p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center text-white/70 text-sm">
          <div className="mb-4 md:mb-0">
            <p>© {new Date().getFullYear()} Andora AI. Todos os direitos reservados.</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white transition-colors">Termos</a>
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
