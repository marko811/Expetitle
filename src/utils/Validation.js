const Email = text => {
  let error = '';
  let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (text === '') {
    error = 'Please complete Email field';
  } else if (reg.test(text) === false) {
    error = 'Invalid email format';
  } else {
    error = '';
  }
  return error;
};

const Password = text => {
  let error = '';
  if (text === '') {
    error = 'Please complete Password field';
  } else if (text.length < 8) {
    error = 'Passwords must be at least 8 characters in length';
  } else {
    error = '';
  }
  return error;
};

export default {
  Email,
  Password,
};
