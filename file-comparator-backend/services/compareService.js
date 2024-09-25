exports.compare = (file1Data, file2Data) => {
  const obj1 = JSON.parse(file1Data);
  const obj2 = JSON.parse(file2Data);

  const differentKeys = [];
  const sameKeysDifferentValues = [];

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // Compare keys
  keys1.forEach((key) => {
    if (!keys2.includes(key)) {
      differentKeys.push(key);
    } else if (obj1[key] !== obj2[key]) {
      sameKeysDifferentValues.push(key);
    }
  });

  // Check keys in obj2 not in obj1
  keys2.forEach((key) => {
    if (!keys1.includes(key)) {
      differentKeys.push(key);
    }
  });

  return { differentKeys, sameKeysDifferentValues };
};
