import { ComponentMeta } from '@storybook/react';
import { Upload } from './upload';
import Button from '../Button/button';
import Icon from '../Icon/icon';

export default {
  title: 'Upload',
  id: 'Upload',
  component: Upload,
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
} as ComponentMeta<typeof Upload>;

export const ASimpleUpload = (args: any) => (
  <Upload {...args} action="https://www.mocky.io/v2/5cc8019d300000980a055e76">
    <Button size="lg" btnType="primary">
      <Icon icon="upload" /> click to upload{' '}
    </Button>
  </Upload>
);
ASimpleUpload.storyName = 'Upload component';
export const BCheckUpload = (args: any) => {
  const checkFileSize = (file: File) => {
    if (Math.round(file.size / 1024) > 50) {
      alert('file too big');
      return false;
    }
    return true;
  };
  return (
    <Upload
      {...args}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      beforeUpload={checkFileSize}
    >
      <Button size="lg" btnType="primary">
        <Icon icon="upload" /> maximum 50kb!{' '}
      </Button>
    </Upload>
  );
};
BCheckUpload.storyName = 'check the file size before uploading';
export const CDragUpload = (args: any) => (
  <Upload
    {...args}
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    name="fileName"
    multiple
    drag
  >
    <Icon icon="upload" size="5x" theme="secondary" />
    <br />
    <p>drag here to upload</p>
  </Upload>
);
CDragUpload.storyName = 'drag upload';
