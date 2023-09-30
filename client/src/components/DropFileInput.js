import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';


const DropFileInput = (props) => {
  const wrapperRef = useRef(null);
  const [fileList, setFileList] = useState([]);

  const onDragEnter = () => wrapperRef.current.classList.add('border-blue-500', 'bg-blue-100');
  const onDragLeave = () => wrapperRef.current.classList.remove('border-blue-500', 'bg-blue-100');
  const onDrop = () => wrapperRef.current.classList.remove('border-blue-500', 'bg-blue-100');

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      const updatedList = [newFile];
      setFileList(updatedList);
      props.onFileChange(updatedList);
    }
  };

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    props.onFileChange(updatedList);
  };

  return (
    <div className='mt-10 ml-20'>
        <input type="file" onChange={onFileDrop} />
    </div>
  );
};

DropFileInput.propTypes = {
  onFileChange: PropTypes.func,
};

export default DropFileInput;
