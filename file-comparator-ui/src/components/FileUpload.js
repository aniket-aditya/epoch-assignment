import React, { useState } from 'react';
import axios from 'axios';

const allowedExtensions = ['json', 'txt'];

const FileUpload = () => {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const validateFiles = () => {
    const file1Extension = file1?.name.split('.').pop();
    const file2Extension = file2?.name.split('.').pop();

    if (!file1 || !file2) {
      setError('Both files must be provided.');
      return false;
    }
    if (
      !allowedExtensions.includes(file1Extension) ||
      !allowedExtensions.includes(file2Extension)
    ) {
      setError(`Allowed file types: ${allowedExtensions.join(', ')}`);
      return false;
    }
    setError('');
    return true;
  };

  const handleFileChange1 = (e) => setFile1(e.target.files[0]);
  const handleFileChange2 = (e) => setFile2(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!validateFiles()) return;

    const formData = new FormData();
    formData.append('files', file1);
    formData.append('files', file2);

    try {
      const response = await axios.post('/compare', formData);
      setResult(response.data.result);
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          'Error comparing files. Please, try again!'
      );
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>File 1:</label>
          <input type='file' onChange={handleFileChange1} />
        </div>
        <div>
          <label>File 2:</label>
          <input type='file' onChange={handleFileChange2} />
        </div>
        {error && <p className='error'>{error}</p>}
        <button type='submit'>Compare</button>
      </form>

      {result && (
        <div>
          <h3>Comparison Result</h3>
          <pre>
            <code>{JSON.stringify(result, null, 2)}</code>
          </pre>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
