export const currencyFormat = (value: number) => {
  return new Intl.NumberFormat("es-NI", {
    style: "currency",
    currency: "NIO",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(value);
};
