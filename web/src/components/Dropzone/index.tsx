import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';
import './styles.css';

type Props = {
  onFileUpload: (file: File) => void;
};

const Dropzone: React.FC<Props> = ({ onFileUpload }) => {
  const [selectedFileUrl, setSelectFileUrl] = useState('');

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const fileUrl = URL.createObjectURL(file);

      setSelectFileUrl(fileUrl);
      onFileUpload(file);
    },
    [onFileUpload]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />

      {selectedFileUrl ? (
        <img src={selectedFileUrl} alt="Spot Thumbnail" />
      ) : (
        <p>
          <FiUpload className="uploadbt" />
          <br />
          Imagem do Estabelecimento
        </p>
      )}
    </div>
  );
};

export default Dropzone;
