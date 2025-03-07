
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const About = () => {
  return (
    <div className="min-h-screen font-glacial">
      <Header />
      
      <main className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-codec-bold mb-8 text-center animate-on-scroll">
            Sobre a Andora
          </h1>
          
          <Card className="glass mb-12 animate-on-scroll">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl font-codec-bold mb-4">Nossa História</h2>
              <p className="mb-6 text-lg">
                Fundada em 2018, a Andora nasceu com a missão de transformar a maneira como as empresas realizam seus pagamentos digitais. Começamos como uma pequena startup em São Paulo e hoje estamos presentes em todo o Brasil, ajudando empresas de todos os tamanhos a simplificar suas operações financeiras.
              </p>
              <p className="text-lg">
                Nossa jornada é marcada por constante inovação e um compromisso inabalável com a excelência no atendimento ao cliente. A cada ano, expandimos nossas soluções para atender às necessidades em evolução do mercado digital.
              </p>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="glass animate-on-scroll">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-2xl font-codec-bold mb-4">Nossa Missão</h2>
                <p className="text-lg">
                  Simplificar e democratizar o acesso a soluções de pagamento digital, permitindo que empresas de todos os portes prosperem na economia digital com segurança e eficiência.
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass animate-on-scroll">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-2xl font-codec-bold mb-4">Nossa Visão</h2>
                <p className="text-lg">
                  Ser a plataforma de pagamentos mais confiável e inovadora do Brasil, tornando-se parceira indispensável para o crescimento dos nossos clientes no mundo digital.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <h2 className="text-3xl font-codec-bold mb-6 text-center animate-on-scroll">
            Nossos Valores
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="glass animate-on-scroll">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <h3 className="text-xl font-codec-bold mb-3">Inovação</h3>
                <p>
                  Buscamos constantemente novas soluções e tecnologias para melhorar nossos serviços e superar as expectativas dos clientes.
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass animate-on-scroll">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <h3 className="text-xl font-codec-bold mb-3">Transparência</h3>
                <p>
                  Promovemos relacionamentos claros e honestos com nossos clientes, parceiros e colaboradores.
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass animate-on-scroll">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <h3 className="text-xl font-codec-bold mb-3">Excelência</h3>
                <p>
                  Comprometemo-nos com a qualidade em tudo o que fazemos, buscando sempre os melhores resultados.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Separator className="my-10 opacity-30" />
          
          <div className="animate-on-scroll">
            <h2 className="text-3xl font-codec-bold mb-6 text-center">
              Nossa Equipe
            </h2>
            <p className="text-lg text-center mb-8">
              Somos uma equipe diversificada de especialistas apaixonados por tecnologia e inovação, unidos pelo propósito de transformar o cenário de pagamentos digitais no Brasil.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {["CEO & Fundador", "CTO", "Diretor Comercial", "Diretora de Operações"].map((role, index) => (
                <Card key={index} className="glass">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full bg-primary/10 mb-4 flex items-center justify-center">
                      <span className="text-4xl">👤</span>
                    </div>
                    <h3 className="text-lg font-codec-bold">Liderança Andora</h3>
                    <p className="text-sm opacity-80">{role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
