import { NAME_SPACE } from '@/components/constant';
import { InboxOutlined, RedoOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import { Button, Divider, message, Upload as UploadContent } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';

const { Dragger } = UploadContent;

// interface Props {
// }

const Upload: React.FC = () => {
  const [videoInfo, setVideo] = useState<UploadFile>({
    uid: 'rc-upload-1668087788638-4',
    lastModified: 1660582809620,
    lastModifiedDate: '2022-08-15T17:00:09.620Z',
    name: 'noface.gif',
    size: 4417,
    type: 'image/gif',
    percent: 100,
    originFileObj: {
      uid: 'rc-upload-1668087788638-4',
    },
    status: 'done',
    response: {
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      thumbUrl:
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    xhr: {},
  });

  const draggerProps: UploadProps = {
    name: 'file',
    maxCount: 1,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
        setVideo(info.file);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  // 上传视频区
  const RenderUpload = () => {
    return (
      <div className={styles[`${NAME_SPACE}-upload`]}>
        <Dragger {...draggerProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-hint">点击或拖拽到此处上传</p>
        </Dragger>
      </div>
    );
  };

  const progress = {
    strokeColor: {
      '0%': '#108ee9',
      '100%': '#87d068',
    },
    strokeWidth: 3,
    format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
  };

  // 编辑上传视频信息
  const RenderVideoInfo = () => {
    return (
      <div className={styles[`${NAME_SPACE}-videoinfo`]}>
        <h3>发布视频</h3>
        <Divider />
        <UploadContent {...draggerProps} progress={progress}>
          <Button icon={<RedoOutlined />}>更换视频</Button>
        </UploadContent>
        <span>{videoInfo.name}</span>
      </div>
    );
  };

  return !!videoInfo ? <RenderVideoInfo /> : <RenderUpload />;
};

export default Upload;
