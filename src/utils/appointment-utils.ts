// Helper function to get status label in Portuguese
export const getStatusLabel = (status: string) => {
  switch (status) {
    case 'scheduled': return 'Agendado';
    case 'pending': return 'Pendente';
    case 'completed': return 'Concluído';
    case 'in-progress': return 'Em Atendimento';
    case 'canceled': return 'Cancelado';
    case 'delayed': return 'Atrasado';
    default: return status;
  }
};

// Helper function to get status color
export const getStatusColor = (status: string) => {
  switch (status) {
    case 'scheduled': return 'bg-blue-100 text-blue-700';
    case 'pending': return 'bg-yellow-100 text-yellow-700';
    case 'completed': return 'bg-green-100 text-green-700';
    case 'in-progress': return 'bg-purple-100 text-purple-700';
    case 'canceled': return 'bg-red-100 text-red-700';
    case 'delayed': return 'bg-orange-100 text-orange-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

// Format phone input with mask
export const formatPhoneNumber = (value: string): string => {
  const digitsOnly = value.replace(/\D/g, ''); // Remove non-digits
  
  // Apply formatting based on the length of the input
  let formattedValue = '';
  if (digitsOnly.length <= 2) {
    formattedValue = digitsOnly;
  } else if (digitsOnly.length <= 7) {
    formattedValue = `(${digitsOnly.slice(0, 2)}) ${digitsOnly.slice(2)}`;
  } else if (digitsOnly.length <= 11) {
    formattedValue = `(${digitsOnly.slice(0, 2)}) ${digitsOnly.slice(2, 7)}-${digitsOnly.slice(7)}`;
  } else {
    // Limit to 11 digits (2 DDD + 9 phone)
    formattedValue = `(${digitsOnly.slice(0, 2)}) ${digitsOnly.slice(2, 7)}-${digitsOnly.slice(7, 11)}`;
  }
  
  return formattedValue;
};
