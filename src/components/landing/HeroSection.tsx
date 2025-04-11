
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section id="inicio" className="pt-24 md:pt-32 pb-20 px-4 md:px-6 text-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/90 z-0">
        <div className="absolute inset-0 opacity-10" style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
        <div className="absolute inset-0 opacity-20">
          <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
              <radialGradient id="circleGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="white" stopOpacity="0.3" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <circle cx="500" cy="500" r="300" fill="url(#circleGradient)" />
          </svg>
        </div>
      </div>
      
      <div className="container mx-auto grid md:grid-cols-2 gap-10 items-center relative z-10">
        <div className="text-left relative z-10">
          <span className="inline-block bg-secondary/90 text-primary py-1 px-3 rounded-full text-sm font-medium mb-4 animate-pulse">
            Inteligência Artificial no WhatsApp
          </span>
          <h1 className="text-3xl md:text-5xl font-codec-bold mb-6 animate-fadeIn leading-tight text-white">
            Transforme suas vendas com IA no WhatsApp. Em tempo real. No automático.
          </h1>
          <p className="text-base md:text-xl mb-8 animate-fadeIn font-codec text-white/90 max-w-lg">
            Andora automatiza conversas, qualifica leads e fecha vendas — enquanto você dorme. Sem programação e com resultados imediatos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-secondary text-primary hover:bg-secondary/90 group transition-all duration-300 animate-fadeIn">
              Testar Agora
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 animate-fadeIn">
              Ver Como Funciona
            </Button>
          </div>
          <div className="mt-8 flex items-center text-white/80 text-sm">
            <div className="flex -space-x-2 mr-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-300 to-gray-100 border-2 border-white flex items-center justify-center text-xs text-gray-800 font-medium">
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <span>+1.200 empresas já transformaram seus resultados</span>
          </div>
        </div>
        <div className="relative hidden md:block animate-fadeIn">
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full filter blur-3xl -z-10"></div>
          <div className="relative bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 shadow-xl">
            <div className="bg-white p-5 rounded-lg shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="18px" height="18px">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-gray-800 font-semibold">Atendimento WhatsApp</h3>
                  <p className="text-gray-500 text-sm">Agora com IA</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex">
                  <div className="bg-gray-100 rounded-lg py-2 px-3 max-w-[70%] text-sm">
                    Olá! Estou interessado nos planos de assinatura.
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-green-100 rounded-lg py-2 px-3 max-w-[70%] text-sm">
                    Olá! Temos planos a partir de R$49/mês com todos os recursos. Qual o seu segmento de negócio?
                  </div>
                </div>
                <div className="flex">
                  <div className="bg-gray-100 rounded-lg py-2 px-3 max-w-[70%] text-sm">
                    E-commerce de roupas
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-green-100 rounded-lg py-2 px-3 max-w-[70%] text-sm">
                    Perfeito! Para e-commerce recomendamos o plano Pro. Posso demonstrar como aumentar suas vendas em 43%?
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="h-10 flex-1 border border-gray-300 rounded-full px-4 text-sm flex items-center text-gray-400">
                    Enviar mensagem...
                  </div>
                  <button className="ml-2 w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="18px" height="18px">
                      <path d="M0 0h24v24H0z" fill="none"/>
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/10">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white text-xs">Taxa de Conversão</span>
                  <span className="text-green-400 text-xs">+43%</span>
                </div>
                <div className="text-white font-medium">24.8%</div>
                <div className="mt-2 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-green-400 rounded-full" style={{ width: "70%" }}></div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/10">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white text-xs">Tempo de Resposta</span>
                  <span className="text-green-400 text-xs">2s</span>
                </div>
                <div className="text-white font-medium">Instantâneo</div>
                <div className="mt-2 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-green-400 rounded-full" style={{ width: "90%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-24 left-0 right-0 h-24 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSIxMDAiIHZpZXdCb3g9IjAgMCAxNDQwIDEwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAwQzEyMCAyMCAyNDAgMjAgMzYwIDIwQzQ4MCAyMCA2MDAgNDAgNzIwIDUwQzg0MCA2MCA5NjAgNjAgMTA4MCA2MEMxMjAwIDYwIDEzMjAgNDAgMTQ0MCAwVjEwMEgwVjBaIiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==')]"></div>
    </section>
  );
};

export default HeroSection;
