function make2DArray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function intersects(x1, y1, x2, y2, w1, w2, h1, h2) {
  return !(x1 + w1 < x2 || x2 + w2 < x1 || y1 + h1 < h2 || y2 + h2 < h1);
}
