import { ArrowRight, MessageSquare, Bot, Zap, Database } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: <MessageSquare className="w-10 h-10 text-secondary" />,
      title: "Lead entra via WhatsApp",
      description: "Seus leads chegam pelo canal que eles já usam todos os dias, sem necessidade de baixar apps ou acessar sites.",
      highlight: "Sem atrito"
    },
    {
      icon: <Bot className="w-10 h-10 text-secondary" />,
      title: "A IA responde, filtra e qualifica",
      description: "Nossa IA entende a intenção do cliente, responde perguntas e qualifica leads prontos para compra.",
      highlight: "24/7 Automático"
    },
    {
      icon: <Database className="w-10 h-10 text-secondary" />,
      title: "Envia para CRM ou dispara gatilhos",
      description: "Leads qualificados são enviados para seu CRM ou gatilham ações automáticas de follow-up.",
      highlight: "Integração"
    },
    {
      icon: <Zap className="w-10 h-10 text-secondary" />,
      title: "Acompanhe resultados em tempo real",
      description: "Dashboard com métricas de conversão, assuntos mais comuns e oportunidades de venda.",
      highlight: "Análises"
    }
  ];

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl text-primary font-codec-bold mb-4 animate-on-scroll">
            Como Funciona
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-on-scroll">
            Um assistente inteligente que trabalha 24/7 para o sucesso do seu negócio
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="absolute top-24 left-1/2 w-0.5 h-[calc(100%-6rem)] bg-gray-200 hidden md:block"></div>
          
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 relative">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow animate-on-scroll relative ${index % 2 !== 0 ? 'md:translate-y-16' : ''}`}
              >
                {/* Connection dot */}
                <div className="absolute top-10 -right-3 w-6 h-6 rounded-full bg-secondary hidden md:block"></div>
                
                <div className="bg-primary/5 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl text-primary font-codec mb-3">{step.title}</h3>
                <p className="text-muted-foreground mb-4">{step.description}</p>
                <span className="inline-block bg-secondary/10 text-secondary py-1 px-3 rounded-full text-sm font-medium">
                  {step.highlight}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
