import moment from "moment/moment";

function formatarEmReal(valor) {
  if (isNaN(valor)) return 0;

  return Number(valor).toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
}

function formatarData(data) {
  return moment(data).locale("pt-br").format("DD/MM/YYYY");
}

function formatCnpjCpf(value)
{
  const cnpjCpf = value.replace(/\D/g, '');
  
  if (cnpjCpf.length === 11) {
    return cnpjCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3-\$4");
  } 
  
  return cnpjCpf.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3/\$4-\$5");
}

export default {
  formatarEmReal,
  formatarData,
  formatCnpjCpf
};
