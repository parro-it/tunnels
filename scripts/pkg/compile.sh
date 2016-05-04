rm -rf dist;
mkdir dist
babel src --out-dir dist/src;
cp *.js *.json dist;
cp src/*.css src/*.html src/*.png dist/src;
cd dist;
npm i --production;
node_modules/.bin/electron-rebuild -e ../node_modules/electron-prebuilt;
cd ..;

