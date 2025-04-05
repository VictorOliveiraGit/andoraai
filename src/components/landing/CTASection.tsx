
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-16 md:py-20 px-4 md:px-6 text-white relative">
      {/* Tech-AI inspired background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/90 z-0"></div>
        
        {/* Light bulb tech background */}
        <div className="absolute top-0 right-0 w-full h-full opacity-10">
          <div className="absolute top-0 right-0 w-1/3 h-2/3 bg-[url('https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b')] bg-no-repeat bg-cover bg-right-top"></div>
        </div>
        
        {/* AI circuit patterns */}
        <div className="absolute inset-0 z-0">
          <svg className="w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400">
            <path d="M50,50 L750,50" stroke="#c6ba77" strokeWidth="1" strokeDasharray="10,10" />
            <path d="M50,100 L750,100" stroke="#c6ba77" strokeWidth="1" strokeDasharray="10,10" />
            <path d="M50,150 L750,150" stroke="#c6ba77" strokeWidth="1" strokeDasharray="10,10" />
            <path d="M50,200 L750,200" stroke="#c6ba77" strokeWidth="1" strokeDasharray="10,10" />
            <path d="M50,250 L750,250" stroke="#c6ba77" strokeWidth="1" strokeDasharray="10,10" />
            <path d="M50,300 L750,300" stroke="#c6ba77" strokeWidth="1" strokeDasharray="10,10" />
            <path d="M50,350 L750,350" stroke="#c6ba77" strokeWidth="1" strokeDasharray="10,10" />
            
            <path d="M100,50 L100,350" stroke="#c6ba77" strokeWidth="1" strokeDasharray="10,10" />
            <path d="M200,50 L200,350" stroke="#c6ba77" strokeWidth="1" strokeDasharray="10,10" />
            <path d="M300,50 L300,350" stroke="#c6ba77" strokeWidth="1" strokeDasharray="10,10" />
            <path d="M400,50 L400,350" stroke="#c6ba77" strokeWidth="1" strokeDasharray="10,10" />
            <path d="M500,50 L500,350" stroke="#c6ba77" strokeWidth="1" strokeDasharray="10,10" />
            <path d="M600,50 L600,350" stroke="#c6ba77" strokeWidth="1" strokeDasharray="10,10" />
            <path d="M700,50 L700,350" stroke="#c6ba77" strokeWidth="1" strokeDasharray="10,10" />
            
            <circle cx="400" cy="200" r="20" fill="none" stroke="#c6ba77" strokeWidth="1" />
            <circle cx="400" cy="200" r="40" fill="none" stroke="#c6ba77" strokeWidth="1" />
            <circle cx="400" cy="200" r="60" fill="none" stroke="#c6ba77" strokeWidth="1" />
            <circle cx="400" cy="200" r="80" fill="none" stroke="#c6ba77" strokeWidth="1" />
          </svg>
        </div>
        
        {/* Animated tech elements */}
        <div className="absolute top-10 right-10 w-10 h-10 rounded-full bg-secondary/20 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-16 h-16 rounded-full bg-secondary/10 animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>
      
      <div className="container mx-auto text-center relative z-10">
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
