
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { ArrowUpRight, TrendingUp, Phone, MessageSquare, Globe, DollarSign } from "lucide-react";

// Dados fictícios para demonstração - em um app real viriam de uma API
const conversionData = {
  overall: {
    total: 183,
    converted: 79,
    rate: 43.2
  },
  platforms: [
    { name: "Website", total: 87, converted: 32, rate: 36.8, color: "#4f46e5" },
    { name: "WhatsApp", total: 45, converted: 24, rate: 53.3, color: "#22c55e" },
    { name: "Telefone", total: 33, converted: 18, rate: 54.5, color: "#3b82f6" },
    { name: "Instagram", total: 12, converted: 3, rate: 25.0, color: "#ec4899" },
    { name: "Indicação", total: 6, converted: 2, rate: 33.3, color: "#f59e0b" }
  ],
  monthly: [
    { month: "Jan", converted: 8, notConverted: 12 },
    { month: "Fev", converted: 7, notConverted: 10 },
    { month: "Mar", converted: 10, notConverted: 11 },
    { month: "Abr", converted: 12, notConverted: 14 },
    { month: "Mai", converted: 9, notConverted: 12 },
    { month: "Jun", converted: 11, notConverted: 13 },
    { month: "Jul", converted: 13, notConverted: 16 }
  ],
  services: [
    { name: "Consulta Inicial", total: 65, converted: 35, rate: 53.8 },
    { name: "Avaliação Detalhada", total: 42, converted: 21, rate: 50.0 },
    { name: "Acompanhamento", total: 38, converted: 15, rate: 39.5 },
    { name: "Sessão de Terapia", total: 24, converted: 8, rate: 33.3 },
    { name: "Outros", total: 14, converted: 0, rate: 0.0 }
  ],
  comparison: {
    thisMonth: {
      total: 29,
      converted: 13,
      rate: 44.8
    },
    lastMonth: {
      total: 25,
      converted: 10,
      rate: 40.0
    },
    percentageChange: 12.0
  }
};

const COLORS = ["#4f46e5", "#22c55e", "#3b82f6", "#ec4899", "#f59e0b", "#64748b"];

const ConversionRates = () => {
  const [timeFrame, setTimeFrame] = useState<"all" | "month" | "quarter">("all");
  
  // Função que seria usada para filtrar os dados com base no período selecionado
  // (em um app real, isso provavelmente seria feito via API)
  const getFilteredData = () => {
    // Para este exemplo, vamos usar os mesmos dados para todos os períodos
    return conversionData;
  };
  
  const data = getFilteredData();
  
  // Dados para o gráfico de pizza
  const pieData = data.platforms.map(platform => ({
    name: platform.name,
    value: platform.converted,
    color: platform.color
  }));
  
  // Para o gráfico de barras de taxas de conversão por plataforma
  const rateData = data.platforms.map(platform => ({
    name: platform.name,
    rate: platform.rate
  }));
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Taxa de Conversão de Atendimentos</h2>
        <Select value={timeFrame} onValueChange={(value: "all" | "month" | "quarter") => setTimeFrame(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todo período</SelectItem>
            <SelectItem value="quarter">Último trimestre</SelectItem>
            <SelectItem value="month">Último mês</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Cartões de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Taxa de Conversão Global</span>
              <div className="flex items-end justify-between mt-2">
                <span className="text-3xl font-bold">{data.overall.rate}%</span>
                <span className="text-sm text-muted-foreground">
                  {data.overall.converted} / {data.overall.total} atendimentos
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Plataforma Mais Eficiente</span>
              <div className="flex items-end justify-between mt-2">
                <span className="text-3xl font-bold">{data.platforms.reduce((prev, current) => 
                  (prev.rate > current.rate) ? prev : current).name}</span>
                <span className="text-sm text-muted-foreground">
                  {data.platforms.reduce((prev, current) => 
                  (prev.rate > current.rate) ? prev : current).rate}% de conversão
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Comparação com Mês Anterior</span>
              <div className="flex items-end justify-between mt-2">
                <span className="text-3xl font-bold">{data.comparison.thisMonth.rate}%</span>
                <div className="flex items-center gap-1 text-green-600">
                  <ArrowUpRight className="h-4 w-4" />
                  <span className="text-sm font-medium">+{data.comparison.percentageChange}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Maior Volume de Leads</span>
              <div className="flex items-end justify-between mt-2">
                <span className="text-3xl font-bold">{data.platforms.reduce((prev, current) => 
                  (prev.total > current.total) ? prev : current).name}</span>
                <span className="text-sm text-muted-foreground">
                  {data.platforms.reduce((prev, current) => 
                  (prev.total > current.total) ? prev : current).total} leads
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Abas para diferentes visualizações */}
      <Tabs defaultValue="platforms" className="w-full">
        <TabsList>
          <TabsTrigger value="platforms">Por Plataforma</TabsTrigger>
          <TabsTrigger value="monthly">Mensal</TabsTrigger>
          <TabsTrigger value="services">Por Serviço</TabsTrigger>
        </TabsList>
        
        {/* Conteúdo da aba de plataformas */}
        <TabsContent value="platforms" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Gráfico de pizza */}
            <Card>
              <CardHeader>
                <CardTitle>Conversões por Plataforma</CardTitle>
                <CardDescription>
                  Distribuição dos atendimentos convertidos por plataforma de origem
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} convertidos`, ""]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Gráfico de barras */}
            <Card>
              <CardHeader>
                <CardTitle>Taxa de Conversão por Plataforma</CardTitle>
                <CardDescription>
                  Porcentagem de atendimentos que se converteram em vendas por plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={rateData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                      <YAxis dataKey="name" type="category" width={100} />
                      <Tooltip formatter={(value) => [`${value}%`, "Taxa de Conversão"]} />
                      <Legend />
                      <Bar dataKey="rate" name="Taxa de Conversão" fill="#4f46e5" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Lista detalhada */}
          <Card>
            <CardHeader>
              <CardTitle>Detalhamento por Plataforma</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {data.platforms.map((platform, index) => (
                  <div 
                    key={index} 
                    className="border rounded-lg p-4 flex flex-col"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {platform.name === "Website" && <Globe className="h-5 w-5" style={{ color: platform.color }} />}
                      {platform.name === "WhatsApp" && <MessageSquare className="h-5 w-5" style={{ color: platform.color }} />}
                      {platform.name === "Telefone" && <Phone className="h-5 w-5" style={{ color: platform.color }} />}
                      {platform.name === "Instagram" && <MessageSquare className="h-5 w-5" style={{ color: platform.color }} />}
                      {platform.name === "Indicação" && <TrendingUp className="h-5 w-5" style={{ color: platform.color }} />}
                      <span className="font-medium">{platform.name}</span>
                    </div>
                    
                    <div className="flex justify-between items-center mt-2">
                      <div>
                        <span className="text-sm text-muted-foreground">Total</span>
                        <p className="font-medium">{platform.total}</p>
                      </div>
                      
                      <div>
                        <span className="text-sm text-muted-foreground">Convertidos</span>
                        <p className="font-medium">{platform.converted}</p>
                      </div>
                      
                      <div>
                        <span className="text-sm text-muted-foreground">Taxa</span>
                        <p className="font-medium">{platform.rate}%</p>
                      </div>
                    </div>
                    
                    <div className="mt-3 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full" 
                        style={{ 
                          width: `${platform.rate}%`,
                          backgroundColor: platform.color
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Conteúdo da aba mensal */}
        <TabsContent value="monthly" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Evolução Mensal das Conversões</CardTitle>
              <CardDescription>
                Comparativo entre atendimentos convertidos e não convertidos por mês
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data.monthly}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="converted" name="Convertidos" stackId="a" fill="#4f46e5" />
                    <Bar dataKey="notConverted" name="Não Convertidos" stackId="a" fill="#e5e7eb" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Mês Atual</p>
                        <p className="text-2xl font-bold">{data.comparison.thisMonth.rate}%</p>
                        <p className="text-sm text-muted-foreground">
                          {data.comparison.thisMonth.converted} de {data.comparison.thisMonth.total} convertidos
                        </p>
                      </div>
                      <DollarSign className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Mês Anterior</p>
                        <p className="text-2xl font-bold">{data.comparison.lastMonth.rate}%</p>
                        <p className="text-sm text-muted-foreground">
                          {data.comparison.lastMonth.converted} de {data.comparison.lastMonth.total} convertidos
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-green-600">
                        <ArrowUpRight className="h-4 w-4" />
                        <span>+{data.comparison.percentageChange}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Conteúdo da aba de serviços */}
        <TabsContent value="services" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Taxa de Conversão por Tipo de Serviço</CardTitle>
              <CardDescription>
                Análise das conversões de acordo com o serviço solicitado inicialmente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.services}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `${value}%`} />
                    <Tooltip formatter={(value) => [`${value}%`, "Taxa de Conversão"]} />
                    <Legend />
                    <Bar dataKey="rate" name="Taxa de Conversão" fill="#4f46e5" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6 space-y-4">
                {data.services.map((service, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <p className="font-medium">{service.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {service.converted} de {service.total} convertidos
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full bg-blue-600" 
                            style={{ width: `${service.rate}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{service.rate}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConversionRates;
