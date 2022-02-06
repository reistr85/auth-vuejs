import { shallowMount } from '@vue/test-utils';
import ListUsers from '@/views/Settings/Users/pages/ListUsers';

describe('Tests component ListUsers', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(ListUsers);
  });

  it('should contais components PageHeader, PageContent and DynamicListPage', () => {
    expect(wrapper.findComponent({ name: 'PageHeader' }).exists()).toBeTruthy();
    expect(wrapper.findComponent({ name: 'PageContent' }).exists()).toBeTruthy();
    expect(wrapper.findComponent({ name: 'DynamicListPage' }).exists()).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  })

  it('should exists state schema and service', () => {
    expect(wrapper.vm.schema).toBeTruthy();
    expect(wrapper.vm.service).toBeTruthy();
  })
})