module.exports = (function () {

  const sortString = (a, b) => a.toLowerCase().localeCompare(b.toLowerCase());

  const shortestArray = (arrayA, arrayB) => (arrayA.length > arrayB.length ? arrayB : arrayA);

  return {
    sortString: sortString,
    shortestArray: shortestArray
  };
})();