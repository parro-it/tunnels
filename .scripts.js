export default {
  lint: 'eslint .',
  package: 'rm -f setup/${npm_package_productName}-${platform}-${arch}-${npm_package_version}.zip && electron-packager .  ${npm_package_productName} --platform=${platform} --arch=${arch} --version=${npm_package_electronVersion} --ignore=\'(setup|media|test|private|node_modules/electron-packager|node_modules/electron-prebuilt)\' --overwrite --out=setup && cd setup/${npm_package_productName}-${platform}-${arch} && zip -ryXq9 ../${npm_package_productName}-${platform}-${arch}-${npm_package_version}.zip . && cd .. && rm -rf ${npm_package_productName}-${platform}-${arch}',
  'package:all': 'npm run package:darwin && npm run package:linux:x64 && npm run package:linux:ia32 && npm run package:win32:x64 && npm run package:win32:ia32',
  'package:darwin': 'platform=darwin arch=x64 npm run package',
  'package:linux:ia32': 'platform=linux arch=ia32 npm run package',
  'package:linux:x64': 'platform=linux arch=x64 npm run package',
  'package:win32:ia32': 'platform=win32 arch=ia32 npm run package',
  'package:win32:x64': 'platform=win32 arch=x64 npm run package',
  rebuild: 'electron-rebuild',
  start: 'electron .',
  test: 'eslint . && node test | faucet'
};