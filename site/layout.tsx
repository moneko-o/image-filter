import theme from 'neko-ui/es/theme';

import Footer from '@/components/footer';

import ChangeLog from '../CHANGELOG.md?raw';
import Readme from '../README.md?raw';

import BackdropFilter from './components/backdrop-filter';

import './layout.global.css';

import 'neko-ui/es/md';
import 'neko-ui/es/back-top';
import 'neko-ui/es/color-palette';

function App() {
  const { baseStyle } = theme;

  return (
    <>
      <style textContent={baseStyle()} />
      <div class="layout">
        <n-md text={Readme} not-render={true} line-number={false} picture-viewer={false} />
        <BackdropFilter />
        <n-md text={ChangeLog} not-render={true} line-number={false} picture-viewer={false} />
        <Footer />
      </div>
      <n-back-top css=".back-top {position: fixed;}" />
      <div class="n-site-bg" />
    </>
  );
}

export default App;
