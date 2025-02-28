
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

  useEffect(() => {
    if (isContactOpen || isLoginOpen || isRegisterOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [isContactOpen, isLoginOpen, isRegisterOpen]);

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

  const handleSocialLogin = (provider: string) => {
    toast.success(`Redirecionando para login com ${provider}...`);
    // Implementação de integração de login social seria feita aqui
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      toast.error("As senhas não coincidem!");
      return;
    }
    toast.success("Conta criada com sucesso! Faça login para continuar.");
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  };

  const toggleDropdown = (dropdown: string) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown("");
    } else {
      setActiveDropdown(dropdown);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-700 via-purple-500 to-orange-400">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <a href="/" className="text-2xl font-bold text-white">
              <img src={logo} alt="Logo Andora" height="20" className='max-w-[70px]'/>
            </a>

            <div className="hidden md:flex items-center space-x-8">
              <div className="relative">
                <button 
                  className="text-white flex items-center gap-1 hover:opacity-80 transition-colors"
                  onClick={() => toggleDropdown("produtos")}
                >
                  Produtos <ChevronDown size={16} />
                </button>
                {activeDropdown === "produtos" && (
                  <div className="absolute left-0 mt-2 w-64 bg-white shadow-xl rounded-lg p-4 z-50">
                    {dropdownMenus.produtos.map((item, idx) => (
                      <a key={idx} href="#" className="block p-2 hover:bg-gray-50 rounded-md">
                        <p className="font-medium text-gray-900">{item.title}</p>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative">
                <button 
                  className="text-white flex items-center gap-1 hover:opacity-80 transition-colors"
                  onClick={() => toggleDropdown("solucoes")}
                >
                  Soluções <ChevronDown size={16} />
                </button>
                {activeDropdown === "solucoes" && (
                  <div className="absolute left-0 mt-2 w-64 bg-white shadow-xl rounded-lg p-4 z-50">
                    {dropdownMenus.solucoes.map((item, idx) => (
                      <a key={idx} href="#" className="block p-2 hover:bg-gray-50 rounded-md">
                        <p className="font-medium text-gray-900">{item.title}</p>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <a href="#recursos" className="text-white hover:opacity-80 transition-colors">
                Recursos
              </a>
              <a href="#precos" className="text-white hover:opacity-80 transition-colors">
                Preços
              </a>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => setIsLoginOpen(true)}
              className="text-white hover:bg-white/10"
            >
              Entrar
            </Button>
            <Button 
              onClick={() => setIsContactOpen(true)}
              className="bg-white text-purple-600 hover:bg-white/90"
            >
              Fale com nossa equipe
            </Button>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <div className="py-2 border-b border-white/20">
                <button 
                  className="flex items-center justify-between w-full text-white"
                  onClick={() => toggleDropdown("produtos")}
                >
                  <span>Produtos</span>
                  <ChevronDown size={16} />
                </button>
                {activeDropdown === "produtos" && (
                  <div className="mt-2 pl-4 space-y-2">
                    {dropdownMenus.produtos.map((item, idx) => (
                      <a key={idx} href="#" className="block text-white/80 hover:text-white">
                        {item.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <div className="py-2 border-b border-white/20">
                <button 
                  className="flex items-center justify-between w-full text-white"
                  onClick={() => toggleDropdown("solucoes")}
                >
                  <span>Soluções</span>
                  <ChevronDown size={16} />
                </button>
                {activeDropdown === "solucoes" && (
                  <div className="mt-2 pl-4 space-y-2">
                    {dropdownMenus.solucoes.map((item, idx) => (
                      <a key={idx} href="#" className="block text-white/80 hover:text-white">
                        {item.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <a href="#recursos" className="text-white hover:text-white/80 py-2 border-b border-white/20">
                Recursos
              </a>
              <a href="#precos" className="text-white hover:text-white/80 py-2 border-b border-white/20">
                Preços
              </a>
              <Button 
                variant="ghost" 
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsLoginOpen(true);
                }}
                className="text-white hover:bg-white/10"
              >
                Entrar
              </Button>
              <Button 
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsContactOpen(true);
                }}
                className="bg-white text-purple-600 hover:bg-white/90"
              >
                Fale com nossa equipe
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
                src="/logo-andora.svg" 
                alt="Logo" 
                className="w-16 h-16 mx-auto"
              />
            </div>
            <DialogTitle className="text-xl text-center">Faça seu login</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Opções de Login Social */}
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2"
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
                className="w-full flex items-center justify-center gap-2"
                onClick={() => handleSocialLogin("Apple")}
              >
                <Apple className="w-5 h-5 text-black" />
                Apple
              </Button>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300"></span>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">ou continue com</span>
              </div>
            </div>
            
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
            
            <p className="text-center text-sm text-gray-500">
              Não tem uma conta?{" "}
              <Button 
                variant="link" 
                className="p-0 h-auto text-primary"
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
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center">
            <div className="mx-auto mb-4">
              <img 
                src="/logo-andora.svg" 
                alt="Logo" 
                className="w-16 h-16 mx-auto"
              />
            </div>
            <DialogTitle className="text-xl">Criar Conta</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Opções de Registro Social */}
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2"
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
                className="w-full flex items-center justify-center gap-2"
                onClick={() => handleSocialLogin("Apple")}
              >
                <Apple className="w-5 h-5 text-black" />
                Apple
              </Button>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300"></span>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">ou preencha o formulário</span>
              </div>
            </div>
            
            <form className="space-y-4" onSubmit={handleRegister}>
              <div>
                <label className="block text-sm font-medium mb-1">Nome</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
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
                  className="w-full p-2 border rounded-md"
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
                  className="w-full p-2 border rounded-md"
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
                  className="w-full p-2 border rounded-md"
                  placeholder="Confirme sua senha"
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                  required
                />
              </div>
              <Button className="w-full" type="submit">
                Criar Conta
              </Button>
              <p className="text-center text-sm text-gray-500">
                Já tem uma conta?{" "}
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-primary"
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
