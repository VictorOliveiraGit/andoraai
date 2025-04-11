import { Check, Users, BarChart, Zap, MessageSquare, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeaturesSection = () => {
  const features: Feature[] = [
    {
      title: "Chatbot com IA",
      description: "IA treinada para entender seu produto e converter clientes.",
      icon: <Robot className="text-secondary" />
    },
    {
      title: "Qualificação Automática",
      description: "Identifica leads prontos para compra e prioriza atendimento.",
      icon: <Users className="text-secondary" />
    },
    {
      title: "Métricas Detalhadas",
      description: "Acompanhe taxas de conversão e comportamento dos clientes.",
      icon: <BarChart className="text-secondary" />
    },
    {
      title: "Integrações",
      description: "Conecte com seu CRM, e-commerce e ferramentas de pagamento.",
      icon: <Zap className="text-secondary" />
    },
  ];

  return (
    <section id="recursos" className="py-16 md:py-24 px-4 md:px-6 mt-16 bg-white text-foreground relative">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuitPattern" patternUnits="userSpaceOnUse" width="100" height="100">
              <path d="M 50 0 L 50 35 M 50 65 L 50 100" stroke="#000" strokeWidth="0.5" />
              <path d="M 0 50 L 35 50 M 65 50 L 100 50" stroke="#000" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="3" fill="#000" />
              <circle cx="50" cy="35" r="3" fill="#000" />
              <circle cx="50" cy="65" r="3" fill="#000" />
              <circle cx="35" cy="50" r="3" fill="#000" />
              <circle cx="65" cy="50" r="3" fill="#000" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuitPattern)" />
        </svg>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-codec-bold mb-4 animate-on-scroll">
            Por Que Escolher a Andora
          </h2>
          <p className="text-muted-foreground animate-on-scroll">
            Nossa plataforma combina o poder da IA com a simplicidade do WhatsApp para transformar seu atendimento e aumentar suas vendas
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 animate-on-scroll hover:shadow-lg transition-all duration-300 border-none bg-gradient-to-br from-white to-gray-50 hover:translate-y-[-5px]">
              <div className="bg-primary/5 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-codec mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center text-primary">
                  <Check className="mr-2 h-4 w-4" /> 
                  <span className="text-sm">Incluído em todos os planos</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6 md:p-8 mt-12 animate-on-scroll">
          <div className="grid md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2">
              <h3 className="text-xl md:text-2xl font-codec mb-3">Pronto para automatizar seu atendimento?</h3>
              <p className="text-muted-foreground">
                Comece com 7 dias gratuitos e veja como a Andora pode transformar seu negócio.
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <a href="#precos" className="inline-flex items-center bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Ver Planos
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Robot = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v4" />
    <line x1="8" y1="16" x2="8" y2="16" />
    <line x1="16" y1="16" x2="16" y2="16" />
  </svg>
);

export default FeaturesSection;
