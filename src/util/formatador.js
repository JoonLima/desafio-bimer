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
export default {
  formatarEmReal,
  formatarData,
};
