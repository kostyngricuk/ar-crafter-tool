import { GithubOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import { Typography } from 'antd';
import UploadForm from 'features/UploadForm';
import { useTranslation } from 'react-i18next';

const { Header, Content, Footer } = Layout;
const { Title, Link } = Typography;

function App() {
  const { t } = useTranslation();

  return (
    <Layout style={styles.layout}>
      <Header style={styles.header}>
        <Link style={styles.linkGH} href="https://github.com/kostyngricuk/ar-crafter-tool" target="_blank">
          <GithubOutlined />
        </Link>
      </Header>
      <Content style={styles.content}>
        <Title>{t('home.title')}</Title>
        <UploadForm />
      </Content>
      <Footer>{t('common.copyright', { year: new Date().getFullYear() })}</Footer>
    </Layout>
  );
}

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  linkGH: {
    color: '#fff',
    fontSize: '20px',
  },
  layout: {
    minHeight: '100vh',
  },
  content: {
    padding: '50px',
  },
};

export default App;
