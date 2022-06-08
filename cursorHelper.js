const readCursor = (cursor, numElements, close = false) => {
  return new Promise((resolve, reject) => {
    cursor.read(numElements, (error, rows) => {
      if (error) {
        reject(error);
      } else {
        resolve(rows);
        if (close) {
          cursor.close();
        }
      }
    });
  });
};
module.exports = { readCursor };
