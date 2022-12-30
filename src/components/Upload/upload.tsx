import axios, { AxiosProgressEvent } from 'axios';
import React, { ChangeEvent, FC, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Dragger from './dragger';
import UploadList from './uploadList';

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';
export interface UploadFile {
  id: string;
  size: number;
  name: string;
  status?: UploadFileStatus;
  percent: number;
  raw?: File;
  response?: any;
  error?: any;
}

export interface UploadProps {
  // upload url
  action: string;
  // uploaded file list
  defaultFileList?: UploadFile[];
  // hook before uploading
  beforeUpload?: (file: File) => boolean | Promise<File>;
  // hook when uploading
  onProgress?: (percentage: number, file: UploadFile) => void;
  onSuccess?: (data: any, file: UploadFile) => void;
  onError?: (err: any, file: UploadFile) => void;
  onChange?: (file: UploadFile) => void;
  onRemove?: (file: UploadFile) => void;
  // set upload header
  headers?: { [key: string]: any };
  name?: string;
  // extra argument while uploading
  data?: { [key: string]: any };
  // support sending cookie credentials
  withCredentials?: boolean;
  // acceptable file type
  accept?: string;
  multiple?: boolean;
  drag?: boolean;
  children?: React.ReactNode;
}

const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    defaultFileList,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
    onRemove,
    name,
    headers,
    data,
    withCredentials,
    accept,
    multiple,
    children,
    drag,
  } = props;

  const fileInput = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);
  const updateFileList = (
    updateFile: UploadFile,
    updateObj: Partial<UploadFile>
  ) => {
    setFileList((prevList) => {
      return prevList.map((file) => {
        if (file.id === updateFile.id) {
          return { ...file, ...updateObj };
        }
        return file;
      });
    });
  };

  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }
    uploadFiles(files);
    if (fileInput.current) {
      fileInput.current.value = '';
    }
  };

  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter((item) => item.id !== file.id);
    });

    if (onRemove) {
      onRemove(file);
    }
  };

  const uploadFiles = (files: FileList, test?: boolean) => {
    let postFiles = Array.from(files);
    if (test) {
      console.log('drag', postFiles[0]);
    }
    postFiles.forEach((file) => {
      if (!beforeUpload) {
        post(file);
      } else {
        const result = beforeUpload(file);
        if (result && result instanceof Promise) {
          result.then((precessedFile) => {
            post(precessedFile);
          });
        } else if (result !== false) {
          post(file);
        }
      }
    });
  };

  const post = (file: File) => {
    let _file: UploadFile = {
      id: uuidv4(),
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    };
    setFileList((prevList) => {
      return [_file, ...prevList];
    });
    const formData = new FormData();
    formData.append(name || 'file', file);
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
    }
    axios
      .post(action, formData, {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data',
        },
        withCredentials,
        onUploadProgress: (e: AxiosProgressEvent) => {
          const total = e.total as number;
          let percentage = Math.round((e.loaded * 100) / total) || 0;
          if (percentage < 100) {
            updateFileList(_file, { percent: percentage, status: 'uploading' });
            _file.status = 'uploading';
            _file.percent = percentage;
            if (onProgress) {
              onProgress(percentage, _file);
            }
          }
        },
      })
      .then((resp) => {
        updateFileList(_file, { status: 'success', response: resp.data });
        _file.status = 'success';
        _file.response = resp.data;
        if (onSuccess) {
          onSuccess(resp.data, _file);
        }
        if (onChange) {
          onChange(_file);
        }
      })
      .catch((err) => {
        updateFileList(_file, { status: 'error', error: err });
        _file.status = 'error';
        if (onError) {
          onError(err, _file);
        }
        if (onChange) {
          onChange(_file);
        }
      });
  };

  return (
    <div className="thera-upload-component">
      <div
        className="thera-upload-input"
        style={{ display: 'inline-block' }}
        onClick={handleClick}
      >
        {drag ? (
          <Dragger
            onFile={(files) => {
              uploadFiles(files, true);
            }}
          >
            {children}
          </Dragger>
        ) : (
          children
        )}

        <input
          className="thera-file-input"
          style={{ display: 'none' }}
          ref={fileInput}
          onChange={handleFileChange}
          type="file"
          accept={accept}
          multiple={multiple}
        />
      </div>
      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  );
};

export default Upload;
