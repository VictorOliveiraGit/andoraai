import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Menu, LogIn } from "lucide-react";
import { toast } from "sonner";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isContactOpen || isLoginOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [isContactOpen, isLoginOpen]);

  const menuItems = [
    { label: "Início", href: "#inicio" },
    { label: "Recursos", href: "#recursos" },
    { label: "Depoimentos", href: "#depoimentos" },
    { label: "Contato", href: "#contato" },
  ];

  const sourceOptions = [
    "Google",
    "Redes Sociais",
    "Indicação",
    "Email Marketing",
    "Outro"
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      setIsLoginOpen(false);
      toast.success("Login realizado com sucesso!");
      navigate("/admin");
    } else {
      toast.error("Usuário ou senha inválidos");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="text-2xl font-bold animate-fadeIn">
            Logo
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium hover:text-primary/80 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <Button onClick={() => setIsContactOpen(true)}>Contato</Button>
            <Button 
              variant="outline"
              onClick={() => setIsLoginOpen(true)}
              className="flex items-center gap-2"
            >
              <LogIn size={18} />
              Login
            </Button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium hover:text-primary/80 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Button onClick={() => setIsContactOpen(true)}>Contato</Button>
              <Button 
                variant="outline"
                onClick={() => setIsLoginOpen(true)}
                className="flex items-center gap-2"
              >
                <LogIn size={18} />
                Login
              </Button>
            </div>
          </div>
        )}
      </nav>

      <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Entre em Contato</DialogTitle>
          </DialogHeader>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nome</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="Seu nome"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded-md"
                placeholder="seu@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Onde nos conheceu?</label>
              <select className="w-full p-2 border rounded-md">
                <option value="">Selecione uma opção</option>
                {sourceOptions.map((option) => (
                  <option key={option} value={option.toLowerCase()}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Mensagem</label>
              <textarea
                className="w-full p-2 border rounded-md"
                rows={4}
                placeholder="Sua mensagem..."
              />
            </div>
            <Button className="w-full" type="submit">
              Enviar Mensagem
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center">
            <div className="mx-auto mb-4">
              <img 
                src="/placeholder.svg" 
                alt="Logo" 
                className="w-16 h-16 mx-auto"
              />
            </div>
            <DialogTitle className="text-xl">Faça seu login</DialogTitle>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium mb-1">Usuário</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="Digite seu usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Senha</label>
              <input
                type="password"
                className="w-full p-2 border rounded-md"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="text-right">
              <Button 
                variant="link" 
                className="text-sm text-primary hover:text-primary/80"
                type="button"
              >
                Esqueci minha senha
              </Button>
            </div>
            <Button className="w-full" type="submit">
              Entrar
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;
