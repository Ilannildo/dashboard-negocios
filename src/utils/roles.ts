export function validateCpf(cpf: string) {
  let Soma;
  let Resto;
  Soma = 0;

  if (cpf === "00000000000") {
    return false;
  }

  for (let i = 1; i <= 9; i++) {
    Soma += parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
  }

  Resto = (Soma * 10) % 11;

  if (Resto === 10 || Resto === 11) {
    Resto = 0;
  }

  if (Resto !== parseInt(cpf.substring(9, 10), 10)) {
    return false;
  }

  Soma = 0;
  for (let i = 1; i <= 10; i++) {
    Soma += parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
  }

  Resto = (Soma * 10) % 11;

  if (Resto === 10 || Resto === 11) {
    Resto = 0;
  }
  if (Resto !== parseInt(cpf.substring(10, 11), 10)) {
    return false;
  }
  return true;
}

// export function validateCNPJ(cnpj: string) {
//   cnpj = cnpj.replace(/[^\d]+/g, "");
//   console.log(cnpj);

//   if (cnpj === "") {
//     return false;
//   }

//   if (cnpj.length !== 14) {
//     return false;
//   }

//   // Elimina CNPJs invalidos conhecidos
//   if (
//     cnpj === "00000000000000" ||
//     cnpj === "11111111111111" ||
//     cnpj === "22222222222222" ||
//     cnpj === "33333333333333" ||
//     cnpj === "44444444444444" ||
//     cnpj === "55555555555555" ||
//     cnpj === "66666666666666" ||
//     cnpj === "77777777777777" ||
//     cnpj === "88888888888888" ||
//     cnpj === "99999999999999"
//   ) {
//     return false;
//   }

//   let totalLength = cnpj.length - 2;
//   let numbers = cnpj.substring(0, totalLength);
//   let digits = cnpj.substring(totalLength);
//   let sum = 0;
//   let pos = totalLength - 7;
//   for (let i = totalLength; i >= 1; i--) {
//     sum += Number(numbers.charAt(totalLength - i)) * pos--;
//     if (pos < 2) pos = 9;
//   }
//   let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
//   if (result !== Number(digits.charAt(0))) {
//     return false;
//   }

//   totalLength = totalLength + 1;
//   numbers = cnpj.substring(0, totalLength);
//   sum = 0;
//   pos = totalLength - 7;
//   for (let i = totalLength; i >= 1; i--) {
//     sum += Number(numbers.charAt(totalLength - i)) * pos--;
//     if (pos < 2) pos = 9;
//   }
//   result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
//   if (result !== Number(digits.charAt(1))) {
//     return false;
//   }

//   return true;
// }

export function validateCNPJ(cnpj: string) {
  // Remover caracteres não numéricos
  cnpj = cnpj.replace(/[^\d]+/g, "");

  // Verificar se o tamanho é 14
  if (cnpj.length !== 14) return false;

  // Verificar se não é um número repetido
  if (
    cnpj === "00000000000000" ||
    cnpj === "11111111111111" ||
    cnpj === "22222222222222" ||
    cnpj === "33333333333333" ||
    cnpj === "44444444444444" ||
    cnpj === "55555555555555" ||
    cnpj === "66666666666666" ||
    cnpj === "77777777777777" ||
    cnpj === "88888888888888" ||
    cnpj === "99999999999999"
  )
    return false;

  // Validação do primeiro dígito verificador
  let size = cnpj.length - 2;
  let numbers = cnpj.substring(0, size);
  let digits = cnpj.substring(size);
  let sum = 0;
  let pos = size - 7;
  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0))) return false;

  // Validação do segundo dígito verificador
  size = size + 1;
  numbers = cnpj.substring(0, size);
  sum = 0;
  pos = size - 7;
  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(1))) return false;

  return true;
}

export const verifyRevenue = (port: string) => {
  let revenue = 0;

  if (port === "Microempreendedor Individual") revenue = 81000;
  if (port === "Microempresa") revenue = 360000;
  if (port === "Pequena empresa") revenue = 4800000;
  if (port === "Média empresa") revenue = 300000000;
  if (port === "Grande empresa") revenue = 300000000;

  return revenue;
};

export const validateEmail = (email: string) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const formatExpirationDate = (value: string) => {
  return value
    .replace(
      /[^0-9]/g,
      "" // To allow only numbers
    )
    .replace(
      /^([2-9])$/g,
      "0$1" // To handle 3 > 03
    )
    .replace(
      /^(1{1})([3-9]{1})$/g,
      "0$1/$2" // 13 > 01/3
    )
    .replace(
      /^0{1,}/g,
      "0" // To handle 00 > 0
    )
    .replace(
      /^([0-1]{1}[0-9]{1})([0-9]{1,4}).*/g,
      "$1/$2" // To handle 113 > 11/3
    );
};
