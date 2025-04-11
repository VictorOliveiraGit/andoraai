
import { Star, Quote } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  comment: string;
  rating: number;
  image: string;
}

const TestimonialsSection = () => {
  const testimonials: Testimonial[] = [
    {
      name: "Ana Silva",
      role: "Diretora de Marketing",
      company: "E-commerce Fashion",
      comment: "Aumentamos nossas conversões em 38% no primeiro mês. O mais impressionante é que os clientes nem percebem que estão falando com uma IA!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
    },
    {
      name: "Carlos Santos",
      role: "CEO",
      company: "Agência Digital",
      comment: "Conseguimos escalar nosso atendimento sem aumentar a equipe. Os leads são qualificados automaticamente e só entramos quando estão prontos para fechar.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
    },
    {
      name: "Maria Oliveira",
      role: "Gerente de Vendas",
      company: "SaaS Enterprise",
      comment: "Incrível como a IA da Andora entende o contexto das perguntas dos clientes e fornece respostas precisas sobre nossos produtos complexos.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1553514029-1318c9127859?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
    },
  ];

  const stats = [
    { value: "3.2x", label: "Mais conversões" },
    { value: "24/7", label: "Atendimento" },
    { value: "93%", label: "Satisfação" },
    { value: "-62%", label: "Custos de suporte" },
  ];

  return (
    <section id="depoimentos" className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-b from-white to-gray-50 text-foreground">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-2xl md:text-3xl font-codec-bold mb-4 animate-on-scroll">
              O Que Nossos Clientes Dizem
            </h2>
            <p className="text-lg text-muted-foreground mb-6 animate-on-scroll">
              Empresas de todos os tamanhos estão transformando seu atendimento e aumentando suas vendas com a Andora
            </p>
            
            <div className="grid grid-cols-2 gap-6 animate-on-scroll">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute top-0 right-0 -mt-6 -mr-6">
              <Quote className="h-24 w-24 text-secondary opacity-20" />
            </div>
            <Card className="animate-on-scroll hover:shadow-lg transition-shadow border border-primary/10 p-6 bg-white">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
                    alt="Depoimento em destaque"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Ricardo Almeida</h4>
                  <p className="text-sm text-muted-foreground">Diretor Comercial, Tech Solutions</p>
                </div>
              </div>
              
              <p className="text-lg italic mb-4">
                "A Andora transformou completamente nosso funil de vendas. Integramos com nosso CRM e agora temos uma visão clara de cada interação com o cliente. Fechamos 27% mais negócios no trimestre passado."
              </p>
              
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-400" size={18} fill="currentColor" />
                ))}
              </div>
            </Card>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 md:p-8 animate-on-scroll hover:shadow-lg transition-shadow border border-primary/10">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-xs text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
              
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={i < testimonial.rating ? "text-yellow-400" : "text-gray-300"} 
                    size={16} 
                    fill={i < testimonial.rating ? "currentColor" : "none"} 
                  />
                ))}
              </div>
              
              <p className="text-muted-foreground mb-4 text-base leading-relaxed">"{testimonial.comment}"</p>
              
              <div className="pt-2 border-t border-gray-100">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-xs text-green-600">Resultados verificados</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
