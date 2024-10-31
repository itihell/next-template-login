export const GeneratePaginatioNumbers = (currentPage: number, totalPages: number) => {
  //TODO: Si el numero total de paginas es 7 o menor
  // vamos a mostrar todas las paginas sin puntos suspensivos
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  //TODO: Si la pagaina actual esta entre las primeras 3 paginas
  // mostrar las primeras tres paginas, puntos suspensivos y las ultimas dos paginas
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  //TODO: SI la pagina actual esta entre las ultimas 3 paginas
  // mostrar las primeras dos paginas, puntos suspensivos y las ultimas tres paginas
  if (currentPage > totalPages - 3) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  //TODO: Si la pagina actual esta entre otros lugares medios
  //mostrar las primera pagina, puntos suspensivos, la pagina actual y vecinos
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};
