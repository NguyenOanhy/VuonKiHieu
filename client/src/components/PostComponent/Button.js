import React from 'react';

const Button = (props) => {
  return (
    <button
      className="w-32 ml-auto mt-8 px-4 py-2 bg-purple-800 rounded-lg text-white text-lg font-semibold"
      type={props.type || 'button'}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
