import { Layout } from 'antd';
import { useTranslation } from 'react-i18next';

const { Footer: FooterUI } = Layout;

function Footer() {
  const { t } = useTranslation();

  return <FooterUI>{t('common.copyright', { year: new Date().getFullYear() })}</FooterUI>;
}

export default Footer;
