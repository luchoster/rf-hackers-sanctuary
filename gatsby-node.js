exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          // {
          //   test: require.resolve('./node_modules/react-device-detect'),
          //   use: loaders.null()
          // }
          // {
          //   test: require.resolve('./node_modules/resize-observer-polyfill'),
          //   use: loaders.null()
          // }
        ]
      }
    })
  } else {
    actions.setWebpackConfig({
      module: {
        rules: [
          // {
          //   test: require.resolve('./node_modules/zdog/js/dragger.js'),
          //   use: 'imports-loader?this=>window',
          // },
          // {
          //   test: '/zfont/',
          //   use: 'imports-loader?this=>window',
          // },
          // {
          //   test: /\.(mp3)$/i,
          //   use: [
          //     {
          //       loader: 'file-loader',
          //     },
          //   ],
          // },
        ]
      }
    })
  }
}
