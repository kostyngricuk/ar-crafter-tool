import { Layout } from 'antd';
import Footer from 'features/Footer';
import Header from 'features/Header';

import Root from './pages';

function App() {
  return (
    <Layout style={styles.wrapper}>
      <Header />
      <Root />
      <Footer />
    </Layout>
  );
}

const styles = {
  wrapper: {
    minHeight: '100vh',
  },
};

export default App;
