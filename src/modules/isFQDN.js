const defaultOptions = {
  require_tld: true,
  allow_underscores: false,
  allow_trailing_dot: false,
};

export default function isFDQN(_str, options = defaultOptions) {
  let str;

  /* Remove the optional trailing dot before checking validity */
  if (options.allow_trailing_dot && _str[_str.length - 1] === '.') {
    str = _str.substring(0, _str.length - 1);
  } else {
    str = _str;
  }

  const parts = str.split('.');
  if (options.require_tld) {
    const tld = parts.pop();
    if (!parts.length || !/^([a-z\u00a1-\uffff]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {
      return false;
    }
  }
  for (let part, i = 0; i < parts.length; i++) {
    part = parts[i];
    if (options.allow_underscores) {
      if (part.indexOf('__') >= 0) {
        return false;
      }
      part = part.replace(/_/g, '');
    }
    if (!/^[a-z\u00a1-\uffff0-9-]+$/i.test(part)) {
      return false;
    }
    if (/[\uff01-\uff5e]/.test(part)) {
          // disallow full-width chars
      return false;
    }
    if (part[0] === '-' || part[part.length - 1] === '-') {
      return false;
    }
  }
  return true;
}
