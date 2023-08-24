const ALLOW_FILE_EXTENTION = 'jpg,jpeg,png';

const removeFileName = (fileName: string): string => {
  const extentionIndex = fileName.lastIndexOf('.');
  if (extentionIndex < 0) {
    return '';
  }

  const removedFileName = fileName.substring(extentionIndex + 1).toLowerCase();
  return removedFileName;
};

const fileValidator = ({ name }: { name: string }): boolean => {
  const extention = removeFileName(name);

  const isValidExtention =
    ALLOW_FILE_EXTENTION.includes(extention) && extention !== '';

  if (isValidExtention) {
    return true;
  }
  return false;
};

export default fileValidator;
