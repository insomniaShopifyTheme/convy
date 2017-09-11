Install
=====================
master [![CircleCI](https://circleci.com/gh/tabarnapp/theme_konversion/tree/master.svg?style=svg&circle-token=c94c418c03e77b85e74db8d005c6661297f3d90e)](https://circleci.com/gh/tabarnapp/theme_konversion/tree/master)


Make sure `config.yml` file is setup properly. [Docs here](http://shopify.github.io/themekit/configuration/).

#### 1. Install gulp and dependecies
```
npm install
```

#### 2. Configure Shopify Theme Kit
```
cp config.example.yml src/config.yml
```

then edit `src/config.yml`

#### 3. Set up theme settings for your development store
```
cp src/config/settings_data.default.json src/config/settings_data.json
```

#### 4. Provide your license key

Paste you license key to `src/config/settings_data.json > current > license_key`


### Development

#### 1. Run gulp with default task (builds all files and then watches for changes in scripts and css) 
```
gulp
```

#### 2. Run Shopify theme kit
```
cd ./dist && theme watch
```

### Release

Bump version at `src/config/settings_schema.json` and `src/scripts/setup.js`

#### 1. Gulp tasks
```
gulp  //builds theme and starts watching
gulp build //just builds the theme, no watching for changes
gulp styles       //builds scss files => ./build/assets/theme.css.liquid
gulp scripts      //builds scripts => ./build/assets/theme.js.liquid
gulp sync_files   //copy rest of the files to ./build
gulp zip //builds theme && zips it
```

#### 2. Upload everything to shopify
```
gulp build
cd ./dist
theme replace
```

#### 3. Download `.zip` file in shopify admin