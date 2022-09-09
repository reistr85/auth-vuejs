import { dateTime } from './dateTime';
import { situation } from '@/utils/enums';

export const baseFields = {
  situation: situation.ACTIVE,
  situation_formatted: 'Ativo',
  created_at: dateTime,
  updated_at: dateTime,
  deleted_at: null,
};