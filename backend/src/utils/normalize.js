function normalizeName(value) {
  return String(value)
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function isEmpty(value) {
  return value === undefined || value === null || String(value).trim() === "";
}

function toPositiveInt(value) {
  const number = Number(value);
  if (!Number.isInteger(number) || number <= 0) {
    return null;
  }
  return number;
}

module.exports = {
  normalizeName,
  isEmpty,
  toPositiveInt,
};
