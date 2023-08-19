import { Button, Checkbox, Input } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';
const { TextArea } = Input;

const WsTool: React.FC = () => {
  // 服务是否开启
  const [serverOpen, setServerOpen] = useState<boolean>(false);
  // 发送时是否清空文本框
  const [isClear, setIsClear] = useState<boolean>(false);
  const [serverUrl, setServerUrl] = useState<string>(
    'ws://192.168.199.135:9704/ws?u=1',
  );
  const [seconds, setSeconds] = useState<string>('1');

  // 连接服务，关闭服务
  const onLinkServer = () => {
    // if (serverOpen){

    // }
    setServerOpen((pre) => !pre);
  };
  return (
    <div className={styles['ws-warp']}>
      <div className={styles['ws-warp-content']}>
        <div className={styles['ws-warp-content-server']}>
          <div className={styles['ws-warp-content-server-form']}>
            <div className={styles['ws-warp-content-server-form-line']}>
              <span className={styles['ws-warp-content-server-form-title']}>
                服务器配置 状态: {serverOpen ? '开启连接' : '连接关闭'}
              </span>
            </div>
            <div className={styles['ws-warp-content-server-form-line']}>
              <Input.Group compact>
                <Input
                  addonBefore="服务地址"
                  style={{ width: 400 }}
                  value={serverUrl}
                  onChange={(e) => setServerUrl(e.target.value)}
                />
                <Button
                  type="primary"
                  danger={serverOpen}
                  onClick={onLinkServer}
                >
                  {!serverOpen ? '开启连接' : '关闭连接'}
                </Button>
              </Input.Group>
            </div>
            <div className={styles['ws-warp-content-server-form-line']}>
              <span className={styles['ws-warp-content-server-form-title']}>
                发包设置
              </span>
            </div>
            <div className={styles['ws-warp-content-server-form-line']}>
              <Input.Group compact>
                <Input
                  addonBefore="每隔"
                  disabled={!serverOpen}
                  style={{ width: 100 }}
                  value={seconds}
                  onChange={(e) => setSeconds(e.target.value)}
                />
                <Input
                  addonBefore="秒发送内容"
                  disabled={!serverOpen}
                  style={{ width: 300 }}
                  defaultValue="PING"
                />
                <Button type="primary" disabled={!serverOpen}>
                  开始发送
                </Button>
              </Input.Group>
            </div>
            <div className={styles['ws-warp-content-server-form-line']}>
              <TextArea
                rows={4}
                disabled={!serverOpen}
                placeholder="需要发送到服务端的内容"
              />
            </div>
            <div className={styles['ws-warp-content-server-form-line']}>
              <Checkbox
                disabled={!serverOpen}
                onChange={(e) => setIsClear(e.target.checked)}
              >
                发包清空输入
              </Checkbox>
            </div>
            <div className={styles['ws-warp-content-server-form-line']}>
              <Button disabled={!serverOpen} type="primary" block>
                发送到服务端
              </Button>
            </div>
          </div>
        </div>
        <div className={styles['ws-warp-content-view']}></div>
      </div>
    </div>
  );
};
export default WsTool;
