import { check } from '@/utils/icons';
import { login } from '@/locales/pt-BR/auth';

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
  auth: {
    login,
  },
};