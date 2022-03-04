/* eslint-disable */
import Vue from 'vue'

export const getText = (items, value) => {
  let text = '';
  items.forEach((item) => {
    if(item.value == value) text = item.text
  })

  return text;
}

export const getValue = (items, text) => {
  let value = '';
  items.forEach((item) => {
    if(item.text == text) value = item.value
  })

  return value;
}

export const formatCurrency = (value, params = false) => {
  value = parseFloat(value);

  if(!params)
    return `R$ ${value.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.")}`;

  if(params.type === 'percent')
    return `${value.toFixed(params.precision ? params.precision : 2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.")}%`;

  if(params.type === 'decimal')
    return `${value.toFixed(params.precision ? params.precision : 2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.")}`;

  if(params.type === 'no_decimal')
    return "R$";
}

export const formatDatePT = (date) => {
  if(date){
    if(date.length >= 10){
      return date.substring(8,10)+"/"+date.substring(5,7)+"/"+date.substring(0,4);
    }
  }
}

export const formatPhone = (value) => {
  if(value){
    if(value.length === 10){
      return `(${value.substring(0,2)})${value.substring(2,6)}-${value.substring(6,10)}`;
    }else if(value.length === 11){
      return `(${value.substring(0,2)})${value.substring(2,7)}-${value.substring(7,11)}`;
    }else{
      return '-';
    }
  }

  return '-';
}

export const formatCpfCnpj = (value) => {
  if(value){
    if(value.length === 14) {
      return `${value.substring(0, 2)}.${value.substring(2, 5)}.${value.substring(5, 8)}/${value.substring(8, 12)}-${value.substring(12, 14)}`;
    }else if(value.length === 11) {
      return `${value.substring(0, 3)}.${value.substring(3, 6)}.${value.substring(6, 9)}-${value.substring(9, 11)}`;
    }
  }

  return '-';
}

export const alertConfirmation = (title, text, type, showCancelButton = true) => {
  return new Promise((resolve, reject) => {
    Vue.prototype.$fire({
      title,
      text,
      type,
      showCancelButton,
    }).then((res) => {
      if(res.value === undefined) resolve(false);
      resolve(true);  
    }).catch((err) => {
      reject(err);
    });
  })
}

export function formatDate(date, getHours = false) {
  if (!date) return null;
  const d = new Date(new Date(date).toUTCString().substr(0, 25));
  if (getHours) {
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()} - ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
  }
  return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
}

export function formatDateEN(date, getHours = false) {
  if (!date) return null;
  const d = new Date(new Date(date).toUTCString().substr(0, 25));
  if (getHours) {
    return `${d.getFullYear()}-${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
  }
  
  return `${date.substring(6,10)}-${date.substring(3,5)}-${date.substring(0,2)}`;
}

export function getCompany() {
  return JSON.parse(localStorage.getItem(`${process.env.VUE_APP_NAME}.company`)) || {};
}

export function getUser() {
  return JSON.parse(localStorage.getItem(`${process.env.VUE_APP_NAME}.user`)) || {};
}

export function messageErrors(err) {
  let message = '';

  if(err.status === 422){
    if(err.data.errors?.length) {
      Object.keys(err.data.errors).forEach(function(key) {
        message += `<li class="item-error">${err.data.errors[key][0]}</li>`;
      });
    } else {
      message += `<li class="item-error">${err.data.message}</li>`;
    }
  }else{
    message += `<li class="item-error">Erro desconhecido, tente novamente.</li>`;
  }
  
  return message;
}

export function moneyOptions(precision = 2) {
  return {
    locale: "pt-BR",
    prefix: "",
    suffix: "",
    length: 11,
    precision: precision
  }
}

export function parseStringFloatDecimal(value) {
  value = value.replace('.', '')
  value = value.replace(',', '.')
  return value > 0;
}

export function verifyItemSigleVariation(productVariation) {
  if(productVariation.variation_values.length === 1) {
    return productVariation.variation_values[0].variation.global === 'yes' ? true : false
  }else{
    return false;
  }
}

export function limitCharacters(string, length = 50) {
  if(string.length <= length)
    return string;
    
  return `${string.substr(0, length)}...`;
}

export const isLogged = localStorage.getItem(`${process.env.VUE_APP_NAME}.access_token`) ? true : false;

export const typePageOptions = {
  list: 'list',
  create: 'create',
  show: 'show',
  statement: 'statement'
}

export function mountParamsRequestFilter(params, filter, customFields) {
  return { ...params, page: params?.page || 1, per_page: params?.per_page || 10, filter, customFields: customFields.map((item) => {
    return { field: item }
  })}
}