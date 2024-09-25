const fs = require('fs');
const path = require('path');
const fileComparisonService = require('../services/compareService');

exports.compareFiles = async (req, res, next) => {
  try {
    const files = req.files;
    if (!files || files.length !== 2) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Two files are required' });
    }

    const allowedExtensions = ['.json', '.txt'];
    const ext1 = path.extname(files[0].originalname);
    const ext2 = path.extname(files[1].originalname);

    if (
      !allowedExtensions.includes(ext1) ||
      !allowedExtensions.includes(ext2)
    ) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid file type. Only .json and .txt are allowed',
      });
    }

    const file1Size = files[0].size;
    const file2Size = files[1].size;

    if (file1Size === 0 || file2Size === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'One or both of the files are empty',
      });
    }

    const file1Data = fs.readFileSync(files[0].path, 'utf-8');
    const file2Data = fs.readFileSync(files[1].path, 'utf-8');

    const comparisonResult = fileComparisonService.compare(
      file1Data,
      file2Data
    );

    return res
      .status(200)
      .json({ status: 'success', result: comparisonResult });
  } catch (error) {
    next(error);
  }
};
