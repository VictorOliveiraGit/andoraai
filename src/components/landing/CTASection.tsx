
import { Button } from "@/components/ui/button";
import { MessageSquare, ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-16 md:py-20 px-4 md:px-6 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-primary z-0">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10" style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
        
        {/* Neural network design element */}
        <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-20 pointer-events-none">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="ctaGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="white" stopOpacity="0.5" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </radialGradient>
            </defs>
            
            {/* Nodes and connections */}
            <g fill="white" stroke="white" strokeWidth="0.5">
              <circle cx="100" cy="100" r="5" />
              <circle cx="60" cy="60" r="3" />
              <circle cx="140" cy="60" r="3" />
              <circle cx="60" cy="140" r="3" />
              <circle cx="140" cy="140" r="3" />
              <circle cx="30" cy="100" r="3" />
              <circle cx="170" cy="100" r="3" />
              
              <line x1="100" y1="100" x2="60" y2="60" />
              <line x1="100" y1="100" x2="140" y2="60" />
              <line x1="100" y1="100" x2="60" y2="140" />
              <line x1="100" y1="100" x2="140" y2="140" />
              <line x1="100" y1="100" x2="30" y2="100" />
              <line x1="100" y1="100" x2="170" y2="100" />
            </g>
            
            <circle cx="100" cy="100" r="50" fill="url(#ctaGradient)" />
          </svg>
        </div>
      </div>
      
      <div className="container mx-auto text-center relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block mb-5 animate-on-scroll">
            <span className="py-1 px-3 bg-white/20 rounded-full text-sm font-medium">
              Comece em 5 minutos
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-codec-bold mb-4 md:mb-6 animate-on-scroll">
            Transforme seu WhatsApp em uma máquina de vendas
          </h2>
          
          <p className="text-base md:text-lg mb-8 md:mb-10 animate-on-scroll font-codec max-w-xl mx-auto text-white/90">
            Andora automatiza conversas, qualifica leads e fecha vendas — enquanto você se concentra no que realmente importa.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
            <Button
              size="lg"
              className="animate-on-scroll bg-secondary text-primary hover:bg-secondary/90 w-full sm:w-auto group transition-all duration-300"
            >
              Começar Gratuitamente
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="animate-on-scroll bg-transparent border border-white/30 text-white hover:bg-white/10 w-full sm:w-auto group"
            >
              <MessageSquare className="mr-2 w-4 h-4" />
              Agendar Demonstração
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto animate-on-scroll">
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold">7 dias</div>
              <div className="text-white/70 text-sm">Teste grátis completo</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold">5 minutos</div>
              <div className="text-white/70 text-sm">Para configurar</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold">Sem cartão</div>
              <div className="text-white/70 text-sm">Necessário para testar</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
