import { check } from '@/utils/icons';
import CreateAccountPayment from '@/locales/pt-BR/accountPayments/CreateAccountPayment';
import ListBoxes from '@/locales/pt-BR/boxes/ListBoxes';
import ShowBox from '@/locales/pt-BR/boxes/ShowBox';
import CreateOrderService from '@/locales/pt-BR/orderServices/CreateOrderService';
import ListOrderServices from '@/locales/pt-BR/orderServices/ListOrderServices';
import Calendars from '@/locales/pt-BR/calendars';
import Appointments from '@/locales/pt-BR/appointments';

export default {
  default: {
    alerts: {
      createdRegister: 'Registro criado com sucesso',
      updatedRegister: 'Registro atualizado com sucesso',
      deletedRegister: 'Registro excluído com sucesso',
      errorCreatingRegister: 'Erro ao criar o registro',
      success: 'Realizado com sucesso',
      error: 'Error, tente novamente',
    },
    dynamicListPage: {
      listActions: {
        icon: check,
        label: 'Ativar/Desativar',
        action: 'situation',
      }
    },
    dynamicFormPage: {},
  },
  accountPayments: {
    createAccountPayment: CreateAccountPayment,
  },
  boxes: {
    listBoxes: ListBoxes,
    showBox: ShowBox,
  },
  orderServices: {
    listOrderServices: ListOrderServices,
    createOrderService: CreateOrderService,
  },
  calendars: { ...Calendars },
  appointments: { ...Appointments }
};