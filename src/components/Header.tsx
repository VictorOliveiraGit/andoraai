import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Menu, LogIn, UserPlus, ChevronDown, Apple } from "lucide-react";
import { toast } from "sonner";
import logo from '../../public/logo-andora.svg'

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [activeDropdown, setActiveDropdown] = useState("");
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    if (isContactOpen || isLoginOpen || isRegisterOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    const handleScroll = () => {
      const sections = [
        { id: 'inicio', ref: document.getElementById('inicio') },
        { id: 'como-funciona', ref: document.getElementById('como-funciona') },
        { id: 'recursos', ref: document.getElementById('recursos') },
        { id: 'depoimentos', ref: document.getElementById('depoimentos') },
        { id: 'precos', ref: document.getElementById('precos') }
      ];
      
      const currentPosition = window.scrollY + 100;
      for (const section of sections) {
        if (section.ref) {
          const offsetTop = section.ref.offsetTop;
          const offsetHeight = section.ref.offsetHeight;
          
          if (currentPosition >= offsetTop && currentPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isContactOpen, isLoginOpen, isRegisterOpen]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setIsMenuOpen(false);
    }
  };

  const menuItems = [
    { label: "Início", href: "#inicio", id: "inicio" },
    { label: "Como Funciona", href: "#como-funciona", id: "como-funciona" },
    { label: "Recursos", href: "#recursos", id: "recursos" },
    { label: "Depoimentos", href: "#depoimentos", id: "depoimentos" },
    { label: "Preços", href: "#precos", id: "precos" }
  ];

  const sourceOptions = [
    "Google",
    "Redes Sociais",
    "Indicação",
    "Email Marketing",
    "Outro"
  ];

  const dropdownMenus = {
    produtos: [
      { title: "Payments", description: "Pagamentos online" },
      { title: "Terminal", description: "Pagamentos presenciais" },
      { title: "Connect", description: "Pagamentos para marketplaces" },
      { title: "Billing", description: "Assinaturas e cobranças" },
    ],
    solucoes: [
      { title: "E-commerce", description: "Para lojas online" },
      { title: "Marketplace", description: "Plataformas multivendedor" },
      { title: "SaaS", description: "Para empresas de software" },
      { title: "Financeiro", description: "Soluções para bancos" },
    ],
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (username === "admin" && password === "admin") {
      setIsLoginOpen(false);
      toast.success("Login realizado com sucesso! Redirecionando para Admin Andora.");
      navigate("/admin-andora");
    } 
    else if (username === "victor" && password === "victor") {
      setIsLoginOpen(false);
      toast.success("Login realizado com sucesso! Redirecionando para Admin Dashboard.");
      navigate("/admin");
    }
    else {
      toast.error("Usuário ou senha inválidos");
    }
  };

  const handleSocialLogin = (provider) => {
    toast.success(`Redirecionando para login com ${provider}...`);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      toast.error("As senhas não coincidem!");
      return;
    }
    toast.success("Conta criada com sucesso! Faça login para continuar.");
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  };

  const toggleDropdown = (dropdown) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown("");
    } else {
      setActiveDropdown(dropdown);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <nav className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Logo Andora" height="20" className="h-8 md:h-10 w-auto" />
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              {menuItems.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === item.id ? 'text-primary font-semibold' : 'text-gray-700 hover:text-primary'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => setIsLoginOpen(true)}
              className="text-gray-700 hover:bg-gray-100"
              modalTrigger={true}
            >
              Entrar
            </Button>
            <Button 
              onClick={() => setIsContactOpen(true)}
              className="bg-primary text-white hover:bg-primary/90"
            >
              Fale com nossa equipe
            </Button>
          </div>

          <button
            className="md:hidden p-2 rounded-md"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 mt-2">
            <div className="flex flex-col space-y-3">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-700 hover:text-primary py-2 text-left"
                >
                  {item.label}
                </button>
              ))}
              <hr className="my-2" />
              <Button 
                variant="ghost" 
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsLoginOpen(true);
                }}
                className="justify-start text-gray-700 hover:bg-gray-100"
              >
                Entrar
              </Button>
              <Button 
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsContactOpen(true);
                }}
                className="bg-primary text-white hover:bg-primary/90"
              >
                Fale com nossa equipe
              </Button>
            </div>
          </div>
        )}
      </nav>

      <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
        <DialogContent className="sm:max-w-md max-w-[95vw] w-full mx-auto bg-primary border-primary">
          <DialogHeader>
            <DialogTitle className="text-center">Entre em Contato</DialogTitle>
          </DialogHeader>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nome</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md bg-primary placeholder:text-white !text-white"
                placeholder="Seu nome"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded-md bg-primary placeholder:text-white !text-white"
                placeholder="seu@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Onde nos conheceu?</label>
              <select className="w-full p-2 border rounded-md bg-primary !text-white">
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
                className="w-full p-2 border rounded-md bg-primary placeholder:text-white !text-white"
                rows={4}
                placeholder="Sua mensagem..."
              />
            </div>
            <Button className="w-full bg-secondary !hover:bg-gray-500 border-primary text-primary" type="submit" variant="secondary">
              Enviar Mensagem
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogContent className="!text-white border-primary sm:max-w-md max-w-[95vw] w-full mx-auto p-4 sm:p-6 bg-primary">
          <DialogHeader className="text-center">
            <div className="mx-auto mb-4">
              <img 
                src="/logo-andora.svg" 
                alt="Logo" 
                className="w-16 h-16 mx-auto"
              />
            </div>
            <DialogTitle className="text-xl text-center">Faça seu login</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2 bg-white text-black"
                onClick={() => handleSocialLogin("Google")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="w-5 h-5">
                  <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.691 0 3.225.6 4.425 1.583l3.715-3.715A11.945 11.945 0 0 0 12 0C7.392 0 3.397 2.6 1.385 6.461l3.881 3.304z"/>
                  <path fill="#34A853" d="M16.041 18.013C14.951 18.716 13.529 19.091 12 19.091c-2.676 0-4.959-1.483-6.168-3.662L2.289 18.24A11.944 11.944 0 0 0 12 24c3.059 0 5.842-1.154 7.961-3.039l-3.92-2.948z"/>
                  <path fill="#4285F4" d="M19.834 11.23a9.31 9.31 0 0 0-.207-1.995H12v3.818h4.537a3.97 3.97 0 0 1-1.679 2.575l3.92 2.948c2.327-2.153 3.641-5.348 3.056-9.345z"/>
                  <path fill="#FBBC05" d="M5.832 14.045a7.073 7.073 0 0 1-.389-2.315c0-.79.14-1.56.389-2.272L2.289 6.461A11.86 11.86 0 0 0 1.091 12c0 1.902.445 3.7 1.198 5.29l3.543-3.245z"/>
                </svg>
                Google
              </Button>
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2 bg-white text-black"
                onClick={() => handleSocialLogin("Apple")}
              >
                <Apple className="w-5 h-5 text-black" />
                Apple
              </Button>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-500"></span>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-primary text-white">ou continue com</span>
              </div>
            </div>
            
            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <label className="block text-sm font-medium mb-1">Usuário</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md bg-white text-black placeholder-primary"
                  placeholder="Digite seu usuário"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Senha</label>
                <input
                  type="password"
                  className="w-full p-2 border rounded-md bg-white text-black placeholder-primary"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="text-right">
                <Button 
                  variant="link" 
                  className="text-sm text-white p-0 h-auto"
                  type="button"
                >
                  Esqueci minha senha
                </Button>
              </div>
              <Button className="w-full bg-secondary " type="submit" variant="secondary">
                Entrar
              </Button>
            </form>
            
            <p className="text-center text-sm text-white">
              Não tem uma conta?{" "}
              <Button 
                variant="link" 
                className="p-0 h-auto text-secondary"
                onClick={() => {
                  setIsLoginOpen(false);
                  setIsRegisterOpen(true);
                }}
              >
                Registre-se
              </Button>
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
        <DialogContent className="text-white sm:max-w-md max-w-[95vw] w-full mx-auto p-4 sm:p-6 bg-primary border-primary">
          <DialogHeader className="text-center">
            <div className="mx-auto mb-4">
              <img 
                src="/logo-andora.svg" 
                alt="Logo" 
                className="w-16 h-16 mx-auto"
              />
            </div>
            <DialogTitle className="text-xl text-center">Criar Conta</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2 bg-white text-black"
                onClick={() => handleSocialLogin("Google")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="w-5 h-5">
                  <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.691 0 3.225.6 4.425 1.583l3.715-3.715A11.945 11.945 0 0 0 12 0C7.392 0 3.397 2.6 1.385 6.461l3.881 3.304z"/>
                  <path fill="#34A853" d="M16.041 18.013C14.951 18.716 13.529 19.091 12 19.091c-2.676 0-4.959-1.483-6.168-3.662L2.289 18.24A11.944 11.944 0 0 0 12 24c3.059 0 5.842-1.154 7.961-3.039l-3.92-2.948z"/>
                  <path fill="#4285F4" d="M19.834 11.23a9.31 9.31 0 0 0-.207-1.995H12v3.818h4.537a3.97 3.97 0 0 1-1.679 2.575l3.92 2.948c2.327-2.153 3.641-5.348 3.056-9.345z"/>
                  <path fill="#FBBC05" d="M5.832 14.045a7.073 7.073 0 0 1-.389-2.315c0-.79.14-1.56.389-2.272L2.289 6.461A11.86 11.86 0 0 0 1.091 12c0 1.902.445 3.7 1.198 5.29l3.543-3.245z"/>
                </svg>
                Google
              </Button>
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2 bg-white text-black"
                onClick={() => handleSocialLogin("Apple")}
              >
                <Apple className="w-5 h-5 text-black" />
                Apple
              </Button>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-500"></span>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-primary text-white">ou preencha o formulário</span>
              </div>
            </div>
            
            <form className="space-y-4" onSubmit={handleRegister}>
              <div>
                <label className="block text-sm font-medium mb-1">Nome</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md bg-white text-black placeholder-primary"
                  placeholder="Seu nome completo"
                  value={registerData.name}
                  onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border rounded-md bg-white text-black placeholder-primary"
                  placeholder="seu@email.com"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Senha</label>
                <input
                  type="password"
                  className="w-full p-2 border rounded-md bg-white text-black placeholder-primary"
                  placeholder="Digite sua senha"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Confirmar Senha</label>
                <input
                  type="password"
                  className="w-full p-2 border rounded-md bg-white text-black placeholder-primary"
                  placeholder="Confirme sua senha"
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                  required
                />
              </div>
              <Button className="w-full bg-secondary" type="submit" variant="secondary">
                Criar Conta
              </Button>
              <p className="text-center text-sm text-white">
                Já tem uma conta?{" "}
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-primary text-secondary"
                  onClick={() => {
                    setIsRegisterOpen(false);
                    setIsLoginOpen(true);
                  }}
                >
                  Faça login
                </Button>
              </p>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;
