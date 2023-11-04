import moment from "moment/moment";

function formatarEmReal(valor) {
  return Number(valor).toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
}

function formatarData(data) {
  return moment(data).locale("pt-br").format("DD/MM/YYYY HH:mm:ss");
}
export default {
  formatarEmReal,
  formatarData,
};
