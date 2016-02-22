export default function validate(tunnel) {
  const errors = {};
  if (!tunnel.name) {
    errors.name = 'Required';
  }
  return errors;
}
