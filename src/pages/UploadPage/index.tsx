import { Layout, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import UploadForm from 'src/features/UploadForm';

const { Content } = Layout;
const { Title } = Typography;

function UploadPage() {
  const { t } = useTranslation();

  return (
    <Content style={{ padding: '50px' }}>
      <Title>{t('home.title')}</Title>
      <UploadForm />
    </Content>
  );
}

export default UploadPage;
