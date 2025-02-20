
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Sobre Nós</h3>
            <p className="text-sm text-muted-foreground">
              Oferecemos soluções inovadoras para transformar sua experiência digital.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#inicio" className="text-sm hover:text-primary/80 transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="#recursos" className="text-sm hover:text-primary/80 transition-colors">
                  Recursos
                </a>
              </li>
              <li>
                <a href="#depoimentos" className="text-sm hover:text-primary/80 transition-colors">
                  Depoimentos
                </a>
              </li>
              <li>
                <a href="#contato" className="text-sm hover:text-primary/80 transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="text-sm">Email: contato@empresa.com</li>
              <li className="text-sm">Telefone: (11) 1234-5678</li>
              <li className="text-sm">Endereço: Rua Example, 123</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Redes Sociais</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary/80 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-primary/80 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-primary/80 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-primary/80 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Sua Empresa. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
