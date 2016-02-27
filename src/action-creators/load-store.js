import store from 'store';
import map from 'map-obj';
import values from 'object-values';

function loadAndConvertStore() {
  const storeVersion = store.get('version');
  if (!storeVersion) {
    const tunnels = store.getAll();
    return values(tunnels).map( t => {
      return map(t, (key, value) => [
        (key.slice(0, 6) === 'tunnel' ? key[6].toLowerCase() + key.slice(7) : key),
        value
      ]);
    });
  }

  return store.get('tunnels');
}

export function loadStore() {
  return {
    type: 'LOAD_STORE',
    tunnels: loadAndConvertStore()
  };
}
