import StackSelector from './components/StackSelector';
import NextSectionLink from './components/NextSectionLink';

export default ({ Vue }) => {
  Vue.component('StackSelector', StackSelector); // Force global register
  Vue.component('NextSectionLink', NextSectionLink); // Force global register
};
