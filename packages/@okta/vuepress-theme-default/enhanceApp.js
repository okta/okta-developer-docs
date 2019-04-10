import StackSelector from './components/StackSelector';
import NextSection from './components/NextSection';

export default ({ Vue }) => {
  Vue.component('StackSelector', StackSelector); // Force global register
  Vue.component('NextSection', NextSection); // Force global register
};
