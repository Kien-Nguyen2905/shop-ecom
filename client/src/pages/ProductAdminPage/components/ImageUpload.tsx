import { forwardRef } from 'react';
import { Upload, UploadFile, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';

interface ImageUploadProps {
  images: UploadFile[];
  onChange: (fileList: UploadFile[]) => void;
  onPreview: (file: UploadFile) => void;
}

const ImageUpload = forwardRef<HTMLInputElement, ImageUploadProps>(
  ({ images, onChange, onPreview }: ImageUploadProps, ref) => {
    return (
      <div>
        <ImgCrop rotationSlider>
          <Upload
            ref={ref} //Forward ref to the Upload component
            listType="picture-card"
            fileList={images}
            onPreview={onPreview}
            onChange={({ fileList }) => onChange(fileList)}
            beforeUpload={() => false} // Prevent auto upload
          >
            {images.length < 4 && (
              <Button icon={<UploadOutlined />}>Upload</Button>
            )}
          </Upload>
        </ImgCrop>
        {images.length === 3 && (
          <p>You can upload up to 3 images per variant.</p>
        )}
      </div>
    );
  },
);

export default ImageUpload;
