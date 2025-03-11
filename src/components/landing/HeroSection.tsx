
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section id="inicio" className="pt-24 md:pt-32 pb-20 px-4 md:px-6 text-foreground relative overflow-hidden">
      <div className="container mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div className="text-left relative z-10">
          <h1 className="text-3xl md:text-6xl font-codec-bold mb-6 animate-fadeIn leading-tight text-white">
            Infraestrutura financeira para a internet
          </h1>
          <p className="text-base md:text-xl mb-8 animate-fadeIn font-codec text-white/90 max-w-lg">
            Faça como os milhões de empresas que confiam na Andora
            para receber pagamentos online e presenciais, oferecer
            serviços financeiros integrados, capacitar modelos de
            receita personalizados e aumentar os lucros nos negócios.
          </p>
        </div>
        <div className="relative hidden md:block">
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
  );
};

export default HeroSection;
