
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const DetailedHistory = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico Detalhado</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">Data</th>
                <th className="px-6 py-3">Produto</th>
                <th className="px-6 py-3">Cliente</th>
                <th className="px-6 py-3">Valor</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, index) => (
                <tr key={index} className="bg-white border-b">
                  <td className="px-6 py-4">{new Date().toLocaleDateString()}</td>
                  <td className="px-6 py-4">Produto {String.fromCharCode(65 + index)}</td>
                  <td className="px-6 py-4">Cliente {index + 1}</td>
                  <td className="px-6 py-4">R$ {(Math.random() * 1000).toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      index % 3 === 0 ? 'bg-green-100 text-green-800' : 
                      index % 3 === 1 ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {index % 3 === 0 ? 'Completo' : index % 3 === 1 ? 'Pendente' : 'Cancelado'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
