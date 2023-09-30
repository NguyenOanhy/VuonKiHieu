import React from 'react';

const Card = (props) => {
  return (
    <div className={`bg-main-100 w-50 p-1 m-4 rounded-lg ${props.className}`}>
      {props.children}
    </div>
  );
};

export default Card;
