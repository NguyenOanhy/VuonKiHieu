import React from 'react';
import PropTypes from 'prop-types';


const UploadButton = (props) => {
  return (
    <button className="border-2" onClick={props.onClick}>
      Upload Button
    </button>
  );
};

UploadButton.propTypes = {
  onClick: PropTypes.func,
};

export default UploadButton;
