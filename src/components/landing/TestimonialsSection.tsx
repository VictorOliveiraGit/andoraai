
import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Testimonial {
  name: string;
  role: string;
  comment: string;
}

const TestimonialsSection = () => {
  const testimonials: Testimonial[] = [
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
    <section id="depoimentos" className="py-16 md:py-20 px-4 md:px-6 bg-white text-foreground relative">
      {/* AI-inspired background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-white via-white to-white z-0"></div>
        
        {/* Code pattern background */}
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1498050108023-c5249f4df085')] bg-cover bg-center opacity-5"></div>
        
        {/* Neural network patterns */}
        <div className="absolute top-1/4 left-0 w-full h-1/2">
          <svg className="w-full h-full opacity-5" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,100 Q200,150 400,100 T800,100" fill="none" stroke="#150640" strokeWidth="1" />
            <path d="M0,150 Q200,200 400,150 T800,150" fill="none" stroke="#150640" strokeWidth="1" />
            <path d="M0,200 Q200,250 400,200 T800,200" fill="none" stroke="#150640" strokeWidth="1" />
            <path d="M0,250 Q200,300 400,250 T800,250" fill="none" stroke="#150640" strokeWidth="1" />
            <path d="M0,300 Q200,350 400,300 T800,300" fill="none" stroke="#150640" strokeWidth="1" />
          </svg>
        </div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <h2 className="text-2xl md:text-3xl font-codec-bold text-center mb-8 md:mb-12 animate-on-scroll">
          O Que Nossos Clientes Dizem
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 md:p-8 animate-on-scroll hover:shadow-lg transition-shadow border border-primary/10 bg-white/95 backdrop-blur-sm">
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
  );
};

export default TestimonialsSection;
