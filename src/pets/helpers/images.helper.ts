export const fileFilter = (file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return callback(new Error('Invalid format type'), false);
  }
  return callback(null, true);
};
