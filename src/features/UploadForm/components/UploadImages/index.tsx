import { InboxOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import { Upload } from 'antd';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

const { Dragger } = Upload;

function UploadImages() {
  const { t } = useTranslation();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => setFileList(newFileList);

  const handleDrop: UploadProps['onDrop'] = e => console.log(e);

  const props: UploadProps = useMemo(
    () => ({
      name: 'file',
      multiple: true,
      action: '', // TODO: add backend endpoint
      fileList,
      listType: 'picture',
      onChange: handleChange,
      onDrop: handleDrop,
    }),
    [fileList],
  );

  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">{t('formUpload.fields.dragAndDrop')}</p>
    </Dragger>
  );
}

export default UploadImages;
