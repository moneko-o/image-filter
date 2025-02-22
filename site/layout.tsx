import mdStyle from 'neko-ui/es/md-style';
import theme from 'neko-ui/es/theme';

import Footer from '@/components/footer';

import ChangeLog from '../CHANGELOG.md';
import Readme from '../README.md';

import BackdropFilter from './components/backdrop-filter';

import './layout.global.css';

import 'neko-ui/es/back-top';

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
        {/* <n-md text={Readme} not-render={true} line-number={false} picture-viewer={false} /> */}
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
