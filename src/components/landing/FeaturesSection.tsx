
import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeaturesSection = () => {
  const features: Feature[] = [
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

  return (
    <section id="recursos" className="py-16 md:py-20 px-4 md:px-6 mt-16 bg-white text-foreground relative">
      {/* Tech pattern background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5')] bg-cover bg-center opacity-10"></div>
        
        {/* Circuit board patterns */}
        <div className="absolute top-0 right-0 w-1/3 h-64 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475')] bg-no-repeat bg-cover opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-48 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475')] bg-no-repeat bg-cover opacity-15 transform rotate-180"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <h2 className="text-2xl md:text-3xl font-codec-bold text-center mb-8 md:mb-12 animate-on-scroll">
          Por Que Escolher Nossa Solução
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 animate-on-scroll hover:shadow-lg transition-all border border-primary/10 backdrop-blur-sm bg-white/95">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-codec mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
