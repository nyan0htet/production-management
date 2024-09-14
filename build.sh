rm -rf app
mkdir app
cp -r src/index.html app
./compile.sh
$(pwd)/nwjs/nwjs-sdk-v0.91.0-win-x64/nw.exe .