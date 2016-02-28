import validateIP from 'validate-ip-node';
import isFQDN from '../modules/isFQDN';

const FQDNOpts = {
  require_tld: false
};

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

  if (
    !errors.hostAddress &&
    !isFQDN(tunnel.hostAddress, FQDNOpts) &&
    !validateIP(tunnel.hostAddress)
    ) {

    errors.hostAddress = 'Should be a valid IP address or hostname';
  }

  return errors;
}
