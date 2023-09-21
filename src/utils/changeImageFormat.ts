import imageCompression from 'browser-image-compression';
import heic2any from 'heic2any';

export const changeFormatAndCompression = async (file: File) => {
  let acceptFile = file;

  const options = {
    maxSizeMB: 5,
    maxWidthOrHeight: 1920,
  };

  const isIOSImage =
    file.type === 'image/heic' ||
    file.type === 'image/HEIC' ||
    file.type === 'image/HEIF' ||
    file.type === 'image/heif';

  if (isIOSImage) {
    const convertedBlob = await heic2any({
      blob: file,
      toType: 'image/jpeg', // JPEG로 변환
    });

    const convertedFile = new File(
      [convertedBlob as Blob],
      file.name.split('.')[0] + '.jpeg',
      {
        type: 'image/jpeg',
      },
    );

    acceptFile = convertedFile;
  }

  const compressedFile = await imageCompression(acceptFile, options);
  const url = URL.createObjectURL(compressedFile);

  return { compressedFile, url };
};
