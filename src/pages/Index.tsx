
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Check, Star } from "lucide-react";

const Index = () => {
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
    },
    {
      title: "Suporte 24/7",
      description: "Estamos aqui para ajudar você em qualquer momento.",
    },
    {
      title: "Integração Fácil",
      description: "Configure em minutos e comece a usar.",
    },
    {
      title: "Resultados Garantidos",
      description: "Satisfação garantida ou seu dinheiro de volta.",
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

  return (
    <div className="min-h-screen font-glacial">
      <Header />
      
      {/* Hero Section */}
      <section id="inicio" className="pt-32 pb-20 px-6 bg-secondary text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-codec-bold mb-6 animate-fadeIn">
            Transforme Seu Negócio Hoje
          </h1>
          <p className="text-lg md:text-xl mb-8 animate-fadeIn font-codec">
            A solução completa para impulsionar seus resultados
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center animate-fadeIn">
            <Button size="lg" className="bg-primary text-secondary hover:bg-primary/90">
              Comece Agora
              <ArrowRight className="ml-2" size={16} />
            </Button>
            <Button variant="outline" size="lg" className="text-[#150640] border-white hover:bg-white/10">
              Saiba Mais
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="recursos" className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-codec-bold text-center mb-12 animate-on-scroll text-secondary">
            Por Que Escolher Nossa Solução
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 animate-on-scroll">
                <h3 className="text-xl font-codec mb-3 text-secondary">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="planos" className="py-20 px-6 bg-secondary text-white">
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
                    ? "border-primary bg-white text-secondary transform scale-105 border-secondary" 
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
                      <Check size={20} className="mr-2 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${
                    plan.highlighted 
                      ? "bg-primary text-secondary hover:bg-primary/90"
                      : "bg-primary text-secondary hover:bg-primary/90"
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
          <h2 className="text-3xl font-codec-bold text-center mb-12 animate-on-scroll text-secondary">
            O Que Nossos Clientes Dizem
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8 animate-on-scroll">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-primary" size={16} fill="#C6BA77" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 text-base leading-relaxed">"{testimonial.comment}"</p>
                <div>
                  <p className="font-codec text-secondary text-lg">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-secondary text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-codec-bold mb-6 animate-on-scroll">
            Pronto para Começar?
          </h2>
          <p className="text-lg mb-8 animate-on-scroll font-codec">
            Junte-se a milhares de clientes satisfeitos e transforme seu negócio hoje
          </p>
          <Button
            size="lg"
            className="animate-on-scroll bg-primary text-secondary hover:bg-primary/90"
          >
            Comece Gratuitamente
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
