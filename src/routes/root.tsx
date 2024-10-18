import { Layout } from 'antd';
import Footer from 'features/Footer';
import Header from 'features/Header';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

function Root() {
  return (
    <Layout style={styles.wrapper}>
      <Header />
      <Content style={{ padding: '50px' }}>
        <Outlet />
      </Content>
      <Footer />
    </Layout>
  );
}

const styles = {
  wrapper: {
    minHeight: '100vh',
  },
};

export default Root;
