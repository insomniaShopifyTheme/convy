Install
=====================
Master status [![CircleCI](https://circleci.com/gh/tabarnapp/theme_konversion/tree/master.svg?style=svg)](https://circleci.com/gh/tabarnapp/theme_konversion/tree/master)


Make sure `config.yml` file is setup properly. [Docs here](http://shopify.github.io/themekit/configuration/).

#### 1. Install gulp and dependecies
```
npm install
```

### Development

#### 2. Run gulp with default task (builds all files and then watches for changes in scripts and css) 
```
gulp
```

#### 3. Run Shopify theme kit
```
cd ./dist && theme watch
```

### Release

#### 4. Gulp tasks
```
gulp  //builds theme and starts watching
gulp build //just builds the theme, no watching for changes
gulp styles       //builds scss files => ./build/assets/theme.css.liquid
gulp scripts      //builds scripts => ./build/assets/theme.js.liquid
gulp sync_files   //copy rest of the files to ./build
gulp zip //builds theme && zips it
```

#### 5. Upload everything to shopify
```
gulp build
cd ./dist
theme replace
```

#### 6. Download `.zip` file in shopify admin