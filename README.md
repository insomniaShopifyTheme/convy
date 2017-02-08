Install
=====================

Make sure `config.yml` file is setup properly. [Docs here](http://shopify.github.io/themekit/configuration/).

#### 1. Install gulp
```
npm install
```

### Development

#### 2. Run gulp watch
```
gulp watch
```

#### 3. Run Shopify theme kit
```
theme watch
```

### Release

#### 4. Build `theme.js` and `theme.scss` files
```
gulp styles
gulp scripts
```

#### 5. Upload everything to shopify
```
theme replace
```

#### 6. Download `.zip` file in shopify admin