rm -rf dist;
babel src --out-dir dist/src;
cp *.js *.json src/*.css src/*.html src/*.png dist;
cd dist;
npm i --production;
cd ..;

