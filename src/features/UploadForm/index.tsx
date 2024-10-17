import type { UploadFile } from 'antd';
import { Button, Form, FormProps, Radio, Spin } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import UploadImages from './components/UploadImages';

enum EFormat {
  glb = 'glb',
  obj = 'obj',
}

function UploadForm() {
  const { t } = useTranslation();

  const [format, setFormat] = useState<EFormat>(EFormat.glb);
  const [inProgress, setInProgress] = useState<boolean>(false);
  type FieldType = {
    imagesValue?: UploadFile[];
    formatValue: EFormat;
  };

  const onFinish: FormProps<FieldType>['onFinish'] = values => {
    console.log('Success:', values);
    setInProgress(true);
  };

  const onValuesChange = ({ formatValue }: { formatValue: EFormat }) => {
    setFormat(formatValue);
  };

  return (
    <>
      <Form
        initialValues={{
          imagesValue: [],
          formatValue: format,
        }}
        onFinish={onFinish}
        onValuesChange={onValuesChange}
        autoComplete="off"
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 10 }}
        labelAlign="left"
        disabled={inProgress}
      >
        <Form.Item
          label={t('formUpload.fields.images')}
          name="imagesValue"
          rules={[{ required: true, message: t('errors.fields.required') }]}
        >
          <UploadImages />
        </Form.Item>
        <Form.Item label={t('formUpload.fields.format')} name="formatValue">
          <Radio.Group>
            <Radio.Button value={EFormat.glb}>.glb</Radio.Button>
            <Radio.Button value={EFormat.obj}>.obj</Radio.Button>
          </Radio.Group>
        </Form.Item>
        {inProgress ? (
          <Spin />
        ) : (
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {t('formUpload.fields.submit')}
            </Button>
          </Form.Item>
        )}
      </Form>
    </>
  );
}

export default UploadForm;
