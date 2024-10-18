import { Typography } from 'antd';

const { Text } = Typography;

function Logo() {
  return (
    <Text strong style={{ color: '#fff', fontSize: '20px' }}>
      AR - Crafter <sup style={{ color: '#9ac0f5', fontStyle: 'italic' }}>Tool</sup>
    </Text>
  );
}

export default Logo;
