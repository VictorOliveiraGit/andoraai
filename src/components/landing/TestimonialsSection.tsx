
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
    <section id="depoimentos" className="py-16 md:py-20 px-4 md:px-6 bg-white text-foreground">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-codec-bold text-center mb-8 md:mb-12 animate-on-scroll">
          O Que Nossos Clientes Dizem
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 md:p-8 animate-on-scroll hover:shadow-lg transition-shadow border border-primary/10">
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
