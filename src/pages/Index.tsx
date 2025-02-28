
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { 
  ArrowRight, 
  Check, 
  Star, 
  ChevronDown, 
  CreditCard, 
  DollarSign, 
  BarChart, 
  LineChart, 
  Search,
  Shield,
  Zap
} from "lucide-react";

const Index = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState("");
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  
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
      icon: <Check className="text-primary" />
    },
    {
      title: "Suporte 24/7",
      description: "Estamos aqui para ajudar você em qualquer momento.",
      icon: <Check className="text-primary" />
    },
    {
      title: "Integração Fácil",
      description: "Configure em minutos e comece a usar.",
      icon: <Check className="text-primary" />
    },
    {
      title: "Resultados Garantidos",
      description: "Satisfação garantida ou seu dinheiro de volta.",
      icon: <Check className="text-primary" />
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
    { title: "Payments", description: "Pagamentos online", icon: <CreditCard className="w-6 h-6 text-primary" /> },
    { title: "Terminal", description: "Pagamentos presenciais", icon: <CreditCard className="w-6 h-6 text-primary" /> },
    { title: "Connect", description: "Pagamentos para plataformas", icon: <CreditCard className="w-6 h-6 text-primary" /> },
    { title: "Billing", description: "Assinaturas e pagamentos por uso", icon: <CreditCard className="w-6 h-6 text-primary" /> },
  ];

  const solutionsDropdownItems = [
    { title: "Comércio eletrônico", description: "Soluções para e-commerce", icon: <DollarSign className="w-6 h-6 text-primary" /> },
    { title: "Marketplace", description: "Plataformas multivendedor", icon: <DollarSign className="w-6 h-6 text-primary" /> },
    { title: "SaaS", description: "Para empresas de software", icon: <BarChart className="w-6 h-6 text-primary" /> },
    { title: "Financeiro", description: "Soluções para finanças", icon: <LineChart className="w-6 h-6 text-primary" /> },
  ];

  // Handler para simular o subscrine de um plano
  const handleSubscribe = (planType: string) => {
    toast.info(`Redirecionando para o checkout do plano ${planType}...`);
  };

  // Funções para gerenciar o hover nos planos (efeito de escalada)
  const handleMouseEnter = (planType: string) => {
    setHoveredPlan(planType);
  };

  const handleMouseLeave = () => {
    setHoveredPlan(null);
  };

  return (
    <div className="min-h-screen font-glacial">
      {/* Header */}
      <Header />
      
      {/* Hero Section */}
      <section id="inicio" className="pt-32 pb-20 px-6 gradient-wave text-foreground relative overflow-hidden">
        <div className="container mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className="text-left relative z-10">
            <h1 className="text-4xl md:text-6xl font-codec-bold mb-6 animate-fadeIn leading-tight text-white">
              Infraestrutura financeira para a internet
            </h1>
            <p className="text-lg md:text-xl mb-8 animate-fadeIn font-codec text-white/90 max-w-lg">
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
                  className="px-4 py-3 rounded-md w-full sm:w-64 text-gray-800 border border-gray-300"
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
                    <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-r from-primary/20 to-secondary/50 rounded-b-lg"></div>
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
        <div className="absolute -bottom-24 left-0 right-0 h-24 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSIxMDAiIHZpZXdCb3g9IjAgMCAxNDQwIDEwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAwQzEyMCAyMCAyNDAgMjAgMzYwIDIwQzQ4MCAyMCA2MDAgNDAgNzIwIDUwQzg0MCA2MCA5NjAgNjAgMTA4MCA2MEMxMjAwIDYwIDEzMjAgNDAgMTQ0MCAwVjEwMEgwVjBaIiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==')]"></div>
      </section>

      {/* Features Section */}
      <section id="recursos" className="py-20 px-6 mt-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-codec-bold text-center mb-12 animate-on-scroll">
            Por Que Escolher Nossa Solução
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 animate-on-scroll hover:shadow-lg transition-shadow border border-primary/10">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-codec mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section - Updated to match Admin Subscription styling */}
      <section id="precos" className="py-20 px-6 gradient-plans relative">
        <div className="container mx-auto space-y-10">
          <h2 className="text-3xl font-bold text-primary text-center">Planos de Assinatura</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Plano Básico */}
            <Card 
              className={`p-6 flex flex-col h-full border border-primary/20 transition-all duration-300 hover:shadow-lg ${
                hoveredPlan === 'basic' ? 'transform scale-105' : ''
              }`}
              onMouseEnter={() => handleMouseEnter('basic')}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative overflow-hidden">
                <div className="flex items-center gap-2 z-10 relative">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <CreditCard className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary">Básico</h3>
                </div>
              </div>
              
              <div className="space-y-1 mt-6">
                <p className="text-4xl font-bold text-primary">R$ 29<span className="text-sm font-normal text-gray-500">/mês</span></p>
                <p className="text-sm text-gray-500">Ideal para pequenos negócios</p>
              </div>
              
              <ul className="space-y-3 mt-6 flex-grow">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-secondary" />
                  <span>Até 100 usuários</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-secondary" />
                  <span>Relatórios básicos</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-secondary" />
                  <span>Suporte por email</span>
                </li>
              </ul>
              
              <Button 
                className="w-full bg-white hover:bg-white/90 text-primary border border-primary/20 mt-6"
                onClick={() => handleSubscribe('basic')}
              >
                Assinar Plano Básico
              </Button>
            </Card>

            {/* Plano Pro */}
            <Card 
              className={`p-6 flex flex-col h-full border-2 border-secondary bg-gradient-to-b from-primary to-primary/90 text-white shadow-xl transition-all duration-300 hover:shadow-2xl ${
                hoveredPlan === 'pro' ? 'transform scale-105' : ''
              }`}
              onMouseEnter={() => handleMouseEnter('pro')}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative overflow-hidden">
                <div className="flex items-center gap-2 z-10 relative">
                  <div className="p-2 bg-secondary/20 rounded-full">
                    <Shield className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold">Pro</h3>
                </div>
              </div>
              
              <div className="space-y-1 mt-6">
                <p className="text-4xl font-bold">R$ 59<span className="text-sm font-normal text-white/70">/mês</span></p>
                <p className="text-sm text-white/70">Para negócios em crescimento</p>
              </div>
              
              <ul className="space-y-3 mt-6 flex-grow">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-secondary" />
                  <span>Até 1000 usuários</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-secondary" />
                  <span>Relatórios avançados</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-secondary" />
                  <span>Suporte prioritário</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-secondary" />
                  <span>API access</span>
                </li>
              </ul>
              
              <Button 
                className="w-full bg-secondary hover:bg-secondary/90 text-primary mt-6"
                onClick={() => handleSubscribe('pro')}
              >
                Assinar Plano Pro
              </Button>
            </Card>

            {/* Plano Enterprise */}
            <Card 
              className={`p-6 flex flex-col h-full border border-primary/20 transition-all duration-300 hover:shadow-lg ${
                hoveredPlan === 'enterprise' ? 'transform scale-105' : ''
              }`}
              onMouseEnter={() => handleMouseEnter('enterprise')}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative overflow-hidden">
                <div className="flex items-center gap-2 z-10 relative">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary">Enterprise</h3>
                </div>
              </div>
              
              <div className="space-y-1 mt-6">
                <p className="text-4xl font-bold text-primary">R$ 99<span className="text-sm font-normal text-gray-500">/mês</span></p>
                <p className="text-sm text-gray-500">Para grandes empresas</p>
              </div>
              
              <ul className="space-y-3 mt-6 flex-grow">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-secondary" />
                  <span>Usuários ilimitados</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-secondary" />
                  <span>Relatórios personalizados</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-secondary" />
                  <span>Suporte 24/7</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-secondary" />
                  <span>API dedicated</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-secondary" />
                  <span>Setup personalizado</span>
                </li>
              </ul>
              
              <Button 
                className="w-full bg-white hover:bg-white/90 text-primary border border-primary/20 mt-6"
                onClick={() => handleSubscribe('enterprise')}
              >
                Assinar Plano Enterprise
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="depoimentos" className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-codec-bold text-center mb-12 animate-on-scroll">
            O Que Nossos Clientes Dizem
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8 animate-on-scroll hover:shadow-lg transition-shadow border border-primary/10">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-secondary" size={16} fill="hsl(var(--secondary))" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 text-base leading-relaxed">"{testimonial.comment}"</p>
                <div>
                  <p className="font-codec text-lg">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 gradient-wave text-white">
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
              className="animate-on-scroll bg-secondary text-primary hover:bg-secondary/90"
            >
              Comece Gratuitamente
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="animate-on-scroll bg-transparent border border-white/30 text-white hover:bg-white/10"
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
