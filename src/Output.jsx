import React, { useState } from "react";
import { useState } from "react";
const Output = ({ outPutPost }) => {
  return (
    <div className="flex justify-center flex-col text-center gap-10 ml-60 mr-60 mt-20">
      {outPutPost.map((post, index) => {
        return (
          <div className="border rounded-xl p-2">
            <p className="mb-5">{new Date().toLocaleDateString()}</p>
            <div className="border-b-1">
              <h1
                className="mb-5 font-extrabold font-serif"
                key={post.title.toUpperCase()}
                text-3xl
              >
                {post.title}
              </h1>
            </div>
            <p className="mb-5" key={index}>
              {post.body}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Output;
