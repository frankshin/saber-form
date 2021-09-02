function type(source) {
  var toString = Object.prototype.toString;
  var map = {
      '[object Boolean]': 'boolean',
      '[object Number]': 'number',
      '[object String]': 'string',
      '[object Function]': 'function',
      '[object Array]': 'array',
      '[object Date]': 'date',
      '[object RegExp]': 'regExp',
      '[object Undefined]': 'undefined',
      '[object Null]': 'null',
      '[object Object]': 'object',
  };
  return map[toString.call(source)];
}

export const deepCopy = (data) => {
  var t = type(data);
  var o;
  if (t === 'array') {
    o = [];
  }
  else if (t === 'object') {
    o = {};
  }
  else {
    return data;
  }
  if (t === 'array') {
    for (var i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]));
    }
  } else if (t === 'object') {
    for (var key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        o[key] = deepCopy(data[key]);
      }
    }
  }
  return o;
}
