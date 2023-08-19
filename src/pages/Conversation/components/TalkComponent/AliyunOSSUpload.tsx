import { Icon } from '@/components/Icon';
import type { UploadProps } from 'antd';
import { Upload } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { useMemo, useState } from 'react';
// @ts-ignore
import { sendFileSha1 } from '@/services/public';
import CrypotJS from 'crypto-js';

interface OSSDataType {
  dir: string;
  expire: string;
  host: string;
  accessId: string;
  policy: string;
  signature: string;
  [key: string]: any;
}

interface AliyunOSSUploadProps {
  accept: string;
  value?: UploadFile[];
  onChange?: (fileList: UploadFile[]) => void;
}

const AliyunOSSUpload = ({
  value: fileValue,
  accept,
  onChange,
}: AliyunOSSUploadProps) => {
  const [OSSData, setOSSData] = useState<OSSDataType>();
  const [value, setValue] = useState<UploadFile[]>(fileValue || []);

  const handleChange: UploadProps['onChange'] = async ({ fileList }) => {
    console.log('fileListfileListfileListfileListfileList', fileList);
    setValue(fileList);
    onChange?.(fileList);
  };

  const beforeUpload: UploadProps['beforeUpload'] = async (file) => {
    console.log(file, '~~~~~~~~~~');
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // @ts-ignore
      file.base64 = reader.result;
      console.log(444444444, reader.result);
    };
    const fileSha1 = CrypotJS.SHA1(file).toString();
    // const fileBase64 = CrypotJS.enc.BASE64.parse(file);
    // console.log('@@@@@@@@@', fileBase64);
    const res = await sendFileSha1({ file_sha1: fileSha1 });
    if (res.data) {
      const newOssData = JSON.parse(res.data);
      const suffix = file.name.slice(file.name.lastIndexOf('.'));
      const filename = Date.now() + suffix;
      // @ts-ignore
      file.url = newOssData.dir + filename;
      // @ts-ignore
      file.sha1 = fileSha1;
      // @ts-ignore
      // file.base64 = fileBase64;
      setOSSData(newOssData);
      return file;
    } else {
      return false;
    }
  };

  const uploadProps: UploadProps = useMemo(() => {
    // console.log(value[0], 'value');
    return {
      name: 'file',
      maxCount: 1,
      accept: accept,
      fileList: value,
      action: OSSData?.host,
      beforeUpload,
      onChange: handleChange,
      data: {
        key: `${OSSData?.dir}${value[0]?.name}`,
        success_action_status: 200,
        OSSAccessKeyId: OSSData?.accessId,
        policy: OSSData?.policy,
        Signature: OSSData?.signature,
        callback: OSSData?.callback,
      },
      showUploadList: false,
    };
  }, [OSSData, value]);

  return (
    <Upload {...uploadProps}>
      <Icon
        type="icon-qvbilam-videotupian"
        style={{ cursor: 'pointer', fontSize: 30 }}
      />
    </Upload>
  );
};

export { AliyunOSSUpload };
