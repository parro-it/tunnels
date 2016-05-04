rm -rf setup/${npm_package_productName}-${platform}-${arch};
electron-packager dist ${npm_package_productName} \
	--no-asar \
	--platform=${platform} \
	--arch=${arch} \
	--overwrite \
	--out=setup;

