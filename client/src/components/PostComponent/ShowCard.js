import React from 'react';

const ShowCard = (props) => {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  console.log(props)
  return (
    <div className="m-10 mx-auto">
      {props.newpost.map((post) => (
        <ul>
          <li key={post.id} className="border border-gray-300 rounded-lg my-2 p-4">
            <div className="flex justify-between mt-2 ">
              <div className="text-black">
                <p className="text-xl font-bold capitalize">{post.title}</p>
                <p className="text-sm font-light text-gray-500">{year}-{month < 10 ? `0${month}` : `${month}`}-{date}</p>
              </div>
              <div className=" p-2 rounded-md">
                <p className="text-sm font-semibold">{post.category}</p>
              </div>
            </div>
            <p className="text-black mt-2">{post.content}</p>
            <video id="videoPlayer" width="320" height="240" controls className='border border-2px'>
                <source src={post.image} type="video/mp4" />
              </video>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default ShowCard;
