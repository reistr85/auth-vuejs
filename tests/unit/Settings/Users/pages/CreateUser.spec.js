import { shallowMount } from '@vue/test-utils';
import CreateUser from '@/views/Settings/Users/pages/CreateUser';

describe('Tests component CreateUser', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(CreateUser);
  });

  it('should contais components PageHeader, PageContent and DynamicFormPage', () => {
    expect(wrapper.findComponent({ name: 'PageHeader' }).exists()).toBeTruthy();
    expect(wrapper.findComponent({ name: 'PageContent' }).exists()).toBeTruthy();
    expect(wrapper.findComponent({ name: 'DynamicFormPage' }).exists()).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  })

  it('should exists state schema and service', () => {
    expect(wrapper.vm.schema).toBeTruthy();
    expect(wrapper.vm.service).toBeTruthy();
  })
})