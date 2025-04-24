import { BackTop, mdStyle, registry, theme } from 'neko-ui';

import Footer from '@/components/footer';

import ChangeLog from '../CHANGELOG.md';
import Readme from '../README.md';

import BackdropFilter from './components/backdrop-filter';

import './layout.global.css';

registry(BackTop);

function App() {
  const { baseStyle } = theme;

  return (
    <>
      <style textContent={baseStyle()} />
      <style textContent={mdStyle} />
      <div class="layout">
        <div class="n-md-box">
          <div class="n-md-body">
            <Readme />
          </div>
        </div>
        <BackdropFilter />
        <div class="n-md-box">
          <div class="n-md-body">
            <ChangeLog />
          </div>
        </div>
        <Footer />
      </div>
      <n-back-top css=".back-top {position: fixed;}" />
      <div class="n-site-bg" />
    </>
  );
}

export default App;
