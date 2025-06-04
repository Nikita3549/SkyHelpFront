import React from 'react';

const HeaderSection = () => {
  return (
    <>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Hi! Let's start with getting your boarding pass.
      </h2>
      <p className="text-gray-600 mb-6">
        Please upload your boarding pass as a PNG, JPG or PDF. Max size 15MB
      </p>
    </>
  );
};

export default HeaderSection;
