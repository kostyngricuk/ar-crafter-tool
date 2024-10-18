import { Flex, Layout } from 'antd';

import Logo from './components/Logo';
import SocialLinks from './components/SocialLinks';

const { Header: HeaderUI } = Layout;

function Header() {
  return (
    <HeaderUI>
      <Flex align="center" justify="space-between" style={{ height: '100%' }}>
        <Logo />
        <SocialLinks />
      </Flex>
    </HeaderUI>
  );
}

export default Header;
