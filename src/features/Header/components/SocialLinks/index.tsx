import { GithubOutlined } from '@ant-design/icons';
import { Flex, Typography } from 'antd';

const { Link } = Typography;

function SocialLinks() {
  return (
    <Flex>
      <Link style={styles.github} href="https://github.com/kostyngricuk/ar-crafter-tool" target="_blank">
        <GithubOutlined />
      </Link>
    </Flex>
  );
}

const styles = {
  github: {
    color: '#fff',
    fontSize: '20px',
  },
};

export default SocialLinks;
