
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-16 md:py-20 px-4 md:px-6 text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-codec-bold mb-4 md:mb-6 animate-on-scroll">
          Pronto para Começar?
        </h2>
        <p className="text-base md:text-lg mb-6 md:mb-8 animate-on-scroll font-codec max-w-xl mx-auto">
          Junte-se a milhares de clientes satisfeitos e transforme seu negócio hoje
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            size="lg"
            className="animate-on-scroll bg-secondary text-primary hover:bg-secondary/90 w-full sm:w-auto"
          >
            Comece Gratuitamente
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="animate-on-scroll bg-transparent border border-white/30 text-white hover:bg-white/10 w-full sm:w-auto"
          >
            Saiba mais
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
