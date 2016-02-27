export default function validate(tunnel) {
  const errors = {};
  const requiredFields = [
    'name',
    'hostAddress',
    'remotePort',
    'localPort',
    'userName'
  ].concat(
    tunnel.authType === 'keyfile'
    ? ['keyFile', 'passphrase']
    : ['password']
  );
  requiredFields
    .filter(f => !tunnel[f])
    .forEach(f => {
      errors[f] = 'Required';
    });

  return errors;
}
