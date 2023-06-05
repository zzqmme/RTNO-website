import React, { useState } from 'react';
import axios from 'axios';

const FileUploader = ({ company_name, host }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState(null);

    const MAX_CHARACTER_LIMIT = 10;


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
          const reader = new FileReader();
          reader.onload = (e) => {
            const contents = e.target.result;
            const characterCount = contents.length;
            if (characterCount <= MAX_CHARACTER_LIMIT) {
              setSelectedFile(file);
              setError(null);
            } else {
              setSelectedFile(null);
              setError(`Character count exceeds the limit of ${MAX_CHARACTER_LIMIT}`);
            }
          };
          reader.readAsText(file);
        } else {
          setSelectedFile(null);
          setError('Please upload a .docx file');
        }
      };

  const handleFileUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('company_name', company_name);
        console.log(formData)
        for (const pair of formData.entries()) {
            console.log(pair[0], pair[1]);
          }

      axios.post('/dashboard/information/file_upload', formData, {
        headers: {
              'Content-Type': 'multipart/form-data',
              "RTNO-API-KEY": `${company_name}_dashboard`,
        },
      })
      .then((response) => {
        // Handle the response from the API
        console.log(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
    }
  };

  return (
      <div className="flex flex-col items-center justify-center">
        <div className="my-4">
            <h2 className="text-lg text-center">
                Добро пожаловать на страницу редактирования и загрузки документации!
            </h2>
            <p className="text-center">
                Здесь вы можете загрузить и редактировать документацию в формате .docx.
                Пожалуйста, обратите внимание, что мы принимаем только файлы в формате .docx.
            </p>
        </div>
      <input
        type="file"
        accept=".docx"
        onChange={handleFileChange}
        className="mb-4"
      />
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={handleFileUpload}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        disabled={!selectedFile || error}
      >
        Загрузить
      </button>
    </div>
  );
  
};

export default FileUploader;
