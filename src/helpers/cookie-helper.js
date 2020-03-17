const setToken = token => {
  document.cookie = `token=${token}`;
};

const getToken = () => {
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
    '$1'
  );

  return token;
};

const deleteToken = () => {
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};

export { setToken, getToken, deleteToken };
