const numberToWords = require('number-to-words');

exports.convertNumberToWords = (req, res) => {
  const { number } = req.body;

  if (
    typeof number !== 'number' ||
    number < 0 ||
    number > 999 ||
    !Number.isInteger(number)
  ) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid input. Provide a valid integer between 0 and 999.',
    });
  }

  try {
    const words = numberToWords.toWords(number);
    res.json({ status: 'success', words });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Conversion failed. Try again later.',
    });
  }
};
