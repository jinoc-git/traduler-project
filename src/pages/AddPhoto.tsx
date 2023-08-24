import React from 'react';

import AddPicture from '@components/addpicture/AddPicture';

const AddPhoto = () => {
  const handleFile = (file: File) => {
    console.log('File received:', file);
  };

  return (
    <>
      <h2> 사진</h2>
      <h3>10개 까지 추가 가능합니다.</h3>
      <AddPicture handleFile={handleFile} />;
    </>
  );
};

export default AddPhoto;
