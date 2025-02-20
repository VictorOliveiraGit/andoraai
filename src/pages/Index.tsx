
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Star } from "lucide-react";

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
      title: "Inovação Constante",
      description: "Sempre à frente com as últimas tecnologias e tendências do mercado.",
    },
    {
      title: "Suporte Premium",
      description: "Equipe dedicada para ajudar você em cada etapa do processo.",
    },
    {
      title: "Design Intuitivo",
      description: "Interface pensada para proporcionar a melhor experiência possível.",
    },
    {
      title: "Resultados Reais",
      description: "Soluções que geram impacto positivo no seu negócio.",
    },
  ];

  const testimonials = [
    {
      name: "Ana Silva",
      role: "CEO",
      comment: "Transformou completamente nossa forma de trabalhar.",
    },
    {
      name: "Carlos Santos",
      role: "Diretor de Marketing",
      comment: "Resultados impressionantes desde o primeiro dia.",
    },
    {
      name: "Maria Oliveira",
      role: "Gerente de Projetos",
      comment: "A melhor decisão que tomamos para nossa empresa.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section id="inicio" className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fadeIn">
            Transforme Sua Visão em Realidade
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fadeIn">
            Soluções inovadoras para impulsionar seu negócio ao próximo nível
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center animate-fadeIn">
            <Button size="lg">
              Comece Agora
              <ArrowRight className="ml-2" size={16} />
            </Button>
            <Button variant="outline" size="lg">
              Saiba Mais
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="recursos" className="py-20 px-6 bg-secondary">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 animate-on-scroll">
            Recursos Principais
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 animate-on-scroll">
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="depoimentos" className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 animate-on-scroll">
            O Que Nossos Clientes Dizem
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 animate-on-scroll">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-yellow-400" size={16} />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">"{testimonial.comment}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 animate-on-scroll">
            Pronto para Começar?
          </h2>
          <p className="text-lg mb-8 animate-on-scroll">
            Junte-se a milhares de clientes satisfeitos e transforme seu negócio hoje
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="animate-on-scroll"
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
