
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ArrowRight, 
  Check, 
  Star, 
  ChevronDown, 
  CreditCard, 
  DollarSign, 
  BarChart, 
  LineChart, 
  Search
} from "lucide-react";

const Index = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState("");
  
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
    });

    document.querySelectorAll(".animate-on-scroll").forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      title: "Solução Completa",
      description: "Tudo que você precisa para crescer seu negócio.",
      icon: <Check className="text-secondary" />
    },
    {
      title: "Suporte 24/7",
      description: "Estamos aqui para ajudar você em qualquer momento.",
      icon: <Check className="text-secondary" />
    },
    {
      title: "Integração Fácil",
      description: "Configure em minutos e comece a usar.",
      icon: <Check className="text-secondary" />
    },
    {
      title: "Resultados Garantidos",
      description: "Satisfação garantida ou seu dinheiro de volta.",
      icon: <Check className="text-secondary" />
    },
  ];

  const plans = [
    {
      name: "Starter",
      price: "R$ 49",
      period: "/mês",
      description: "Perfeito para começar",
      features: [
        "Até 1.000 usuários",
        "Suporte básico",
        "Atualizações gratuitas",
        "API limitada",
      ],
      highlighted: false,
    },
    {
      name: "Pro",
      price: "R$ 99",
      period: "/mês",
      description: "Para negócios em crescimento",
      features: [
        "Até 10.000 usuários",
        "Suporte prioritário",
        "Atualizações premium",
        "API completa",
        "Dashboard avançado",
      ],
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "R$ 249",
      period: "/mês",
      description: "Para grandes empresas",
      features: [
        "Usuários ilimitados",
        "Suporte dedicado 24/7",
        "Customizações exclusivas",
        "API ilimitada",
        "Recursos enterprise",
      ],
      highlighted: false,
    },
  ];

  const testimonials = [
    {
      name: "Ana Silva",
      role: "CEO",
      comment: "A melhor decisão que tomamos para nossa empresa.",
    },
    {
      name: "Carlos Santos",
      role: "Diretor de Marketing",
      comment: "Resultados impressionantes desde o primeiro dia.",
    },
    {
      name: "Maria Oliveira",
      role: "Gerente de Projetos",
      comment: "Superou todas as nossas expectativas.",
    },
  ];

  const handleDropdownToggle = (dropdown: string) => {
    if (isDropdownOpen === dropdown) {
      setIsDropdownOpen("");
    } else {
      setIsDropdownOpen(dropdown);
    }
  };

  const productDropdownItems = [
    { title: "Payments", description: "Pagamentos online", icon: <CreditCard className="w-6 h-6 text-secondary" /> },
    { title: "Terminal", description: "Pagamentos presenciais", icon: <CreditCard className="w-6 h-6 text-secondary" /> },
    { title: "Connect", description: "Pagamentos para plataformas", icon: <CreditCard className="w-6 h-6 text-secondary" /> },
    { title: "Billing", description: "Assinaturas e pagamentos por uso", icon: <CreditCard className="w-6 h-6 text-secondary" /> },
  ];

  const solutionsDropdownItems = [
    { title: "Comércio eletrônico", description: "Soluções para e-commerce", icon: <DollarSign className="w-6 h-6 text-secondary" /> },
    { title: "Marketplace", description: "Plataformas multivendedor", icon: <DollarSign className="w-6 h-6 text-secondary" /> },
    { title: "SaaS", description: "Para empresas de software", icon: <BarChart className="w-6 h-6 text-secondary" /> },
    { title: "Financeiro", description: "Soluções para finanças", icon: <LineChart className="w-6 h-6 text-secondary" /> },
  ];

  const partners = [
    "/lovable-uploads/03437dee-3573-4420-bc7a-01e1be5c3d7f.png",
    "/lovable-uploads/84035efb-a614-408b-899f-ff3878cf0a51.png",
  ];

  return (
    <div className="min-h-screen font-glacial">
      {/* Header com dropdown menus inspirado na imagem do Stripe */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-primary to-secondary">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-10">
              <a href="/" className="text-2xl font-bold text-white">
                Andora
              </a>

              <div className="hidden lg:flex items-center space-x-8">
                <div className="relative">
                  <button 
                    className="text-white flex items-center gap-1 hover:opacity-80 transition-colors"
                    onClick={() => handleDropdownToggle("produtos")}
                  >
                    Produtos <ChevronDown size={16} />
                  </button>
                  {isDropdownOpen === "produtos" && (
                    <div className="absolute left-0 mt-2 w-80 bg-white shadow-xl rounded-lg p-4 z-50 grid grid-cols-1 gap-2">
                      {productDropdownItems.map((item, idx) => (
                        <a key={idx} href="#" className="flex items-start p-2 hover:bg-gray-50 rounded-md">
                          <div className="mr-3 mt-1">{item.icon}</div>
                          <div>
                            <p className="font-medium text-gray-900">{item.title}</p>
                            <p className="text-sm text-gray-500">{item.description}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative">
                  <button 
                    className="text-white flex items-center gap-1 hover:opacity-80 transition-colors"
                    onClick={() => handleDropdownToggle("solucoes")}
                  >
                    Soluções <ChevronDown size={16} />
                  </button>
                  {isDropdownOpen === "solucoes" && (
                    <div className="absolute left-0 mt-2 w-80 bg-white shadow-xl rounded-lg p-4 z-50 grid grid-cols-1 gap-2">
                      {solutionsDropdownItems.map((item, idx) => (
                        <a key={idx} href="#" className="flex items-start p-2 hover:bg-gray-50 rounded-md">
                          <div className="mr-3 mt-1">{item.icon}</div>
                          <div>
                            <p className="font-medium text-gray-900">{item.title}</p>
                            <p className="text-sm text-gray-500">{item.description}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                <a href="#" className="text-white hover:opacity-80 transition-colors">
                  Desenvolvedores
                </a>

                <a href="#" className="text-white hover:opacity-80 transition-colors">
                  Recursos
                </a>

                <a href="#precos" className="text-white hover:opacity-80 transition-colors">
                  Preços
                </a>
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-4">
              <a 
                href="/admin" 
                className="text-white hover:opacity-80 transition-colors flex items-center gap-1"
              >
                Entrar <ArrowRight size={16} />
              </a>
              <Button className="bg-white text-primary hover:bg-white/90">
                Fale com nossa equipe
              </Button>
            </div>

            <button
              className="lg:hidden text-white"
              onClick={() => setIsDropdownOpen(isDropdownOpen ? "" : "mobile")}
            >
              {isDropdownOpen ? <span>✕</span> : <span>☰</span>}
            </button>
          </div>

          {isDropdownOpen === "mobile" && (
            <div className="lg:hidden py-4">
              <div className="flex flex-col space-y-4">
                <a href="#" className="text-white">Produtos</a>
                <a href="#" className="text-white">Soluções</a>
                <a href="#" className="text-white">Desenvolvedores</a>
                <a href="#" className="text-white">Recursos</a>
                <a href="#precos" className="text-white">Preços</a>
                <a href="/admin" className="text-white">Entrar</a>
                <Button className="bg-white text-primary hover:bg-white/90 w-full">
                  Fale com nossa equipe
                </Button>
              </div>
            </div>
          )}
        </nav>
      </header>
      
      {/* Hero Section - Inspirado na imagem do Stripe */}
      <section id="inicio" className="pt-32 pb-20 px-6 bg-gradient-to-r from-primary to-secondary text-white relative overflow-hidden">
        <div className="container mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className="text-left relative z-10">
            <h1 className="text-4xl md:text-6xl font-codec-bold mb-6 animate-fadeIn leading-tight">
              Infraestrutura financeira para a internet
            </h1>
            <p className="text-lg md:text-xl mb-8 animate-fadeIn font-codec opacity-90 max-w-lg">
              Faça como os milhões de empresas que confiam na Andora
              para receber pagamentos online e presenciais, oferecer
              serviços financeiros integrados, capacitar modelos de
              receita personalizados e aumentar os lucros nos negócios.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Seu e-mail"
                  className="px-4 py-3 rounded-md w-full sm:w-64 text-gray-800"
                />
              </div>
              <Button size="lg" className="bg-secondary text-primary hover:bg-secondary/90">
                Comece agora
                <ArrowRight className="ml-2" size={16} />
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white p-6 rounded-xl shadow-xl transform md:translate-y-10">
              <div className="text-center mb-4">
                <h3 className="text-gray-800 text-lg font-medium">Analytics Dashboard</h3>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Volume líquido</p>
                    <p className="text-gray-800 font-medium">R$ 3.528.198,72</p>
                    <p className="text-xs text-gray-500">14:00</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Ontem</p>
                    <p className="text-gray-800 font-medium">R$ 2.931.556,34</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg h-24 flex items-center justify-center">
                  <div className="w-full h-12 bg-white rounded-lg relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-r from-primary/30 to-secondary/70 rounded-b-lg"></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between">
                      <p className="text-xs text-gray-500">Volume de vendas</p>
                      <p className="text-xs text-green-500">+32.8%</p>
                    </div>
                    <p className="text-gray-800 font-medium">R$ 39.274,29</p>
                    <p className="text-xs text-gray-500">R$ 29.573,54</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between">
                      <p className="text-xs text-gray-500">Novos clientes</p>
                      <p className="text-xs text-green-500">+29.7%</p>
                    </div>
                    <p className="text-gray-800 font-medium">37</p>
                    <p className="text-xs text-gray-500">28</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="recursos" className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-codec-bold text-center mb-12 animate-on-scroll text-primary">
            Por Que Escolher Nossa Solução
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 animate-on-scroll hover:shadow-lg transition-shadow border border-secondary/20">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-codec mb-3 text-primary">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="precos" className="py-20 px-6 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-codec-bold text-center mb-12 animate-on-scroll">
            Escolha o Plano Ideal
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`p-6 animate-on-scroll ${
                  plan.highlighted 
                    ? "border-secondary bg-white text-primary transform scale-105" 
                    : "bg-white/5 text-white"
                }`}
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-codec-bold mb-2">{plan.name}</h3>
                  <div className="text-3xl font-codec mb-2">
                    {plan.price}
                    <span className="text-sm">{plan.period}</span>
                  </div>
                  <p className="text-sm opacity-80">{plan.description}</p>
                </div>
                <ul className="space-y-4 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check size={20} className="mr-2 text-secondary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${
                    plan.highlighted 
                      ? "bg-secondary text-primary hover:bg-secondary/90"
                      : "bg-secondary text-primary hover:bg-secondary/90"
                  }`}
                >
                  Começar Agora
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="depoimentos" className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-codec-bold text-center mb-12 animate-on-scroll text-primary">
            O Que Nossos Clientes Dizem
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8 animate-on-scroll hover:shadow-lg transition-shadow border border-secondary/20">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-secondary" size={16} fill="#C6BA77" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 text-base leading-relaxed">"{testimonial.comment}"</p>
                <div>
                  <p className="font-codec text-primary text-lg">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-10 px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20">
            {partners.map((partner, index) => (
              <img 
                key={index} 
                src={partner} 
                alt={`Partner ${index + 1}`} 
                className="h-8 md:h-10 opacity-70 hover:opacity-100 transition-opacity"
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-codec-bold mb-6 animate-on-scroll">
            Pronto para Começar?
          </h2>
          <p className="text-lg mb-8 animate-on-scroll font-codec">
            Junte-se a milhares de clientes satisfeitos e transforme seu negócio hoje
          </p>
          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              className="animate-on-scroll bg-white text-primary hover:bg-white/90"
            >
              Comece Gratuitamente
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="animate-on-scroll border-white text-white hover:bg-white/10"
            >
              Saiba mais
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
