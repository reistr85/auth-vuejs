import { parseStringFloatDecimal } from '@/utils';

const required = value => !!value || 'Obrigatório.';
const requiredSelectMultiple = value => !!value.length || 'Obrigatório.'
const money = value => parseStringFloatDecimal(value) || 'Digite valor maior que zero.';
const biggerZero = value => value > 0 || 'Digite valor maior que zero.';

export { required, requiredSelectMultiple, money, biggerZero }
