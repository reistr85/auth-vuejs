import TextField from '@/components/vuetify/TextField';
import TextFieldPercent from '@/components/vuetify/TextFieldPercent';
import TextFieldMoney from '@/components/vuetify/TextFieldMoney';
import TextFieldInteger from '@/components/vuetify/TextFieldInteger';
import TextFieldSimpleMask from '@/components/vuetify/TextFieldSimpleMask';
import Select from '@/components/vuetify/Select';
import DataPicker from '@/components/vuetify/DataPicker';

export default {
  text: TextField,
  password: TextField,
  select: Select,
  dataPicker: DataPicker,
  percent: TextFieldPercent,
  money: TextFieldMoney,
  integer: TextFieldInteger,
  simpleMask: TextFieldSimpleMask,
}