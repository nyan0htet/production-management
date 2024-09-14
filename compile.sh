rm -rf dist
mkdir dist
npx tsc
cp -r src/asset dist
cp -r dist/* app