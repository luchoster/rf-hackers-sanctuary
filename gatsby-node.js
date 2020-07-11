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

async function createSinglePages(graphql, actions, reporter) {
  const { createPage } = actions
  const result = await graphql(`
    {
      allSanityPage {
        edges {
          node {
            _id
            slug {
              current
            }
          }
        }
      }
      allSanityPost {
        edges {
          node {
            slug {
              current
            }
            _id
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const pages = (result.data.allSanityPage || {}).edges || []
  const posts = (result.data.allSanityPost || {}).edges || []

  pages.forEach((edge, index) => {
    const { _id, slug = {} } = edge.node
    const path = `${slug.current}/`

    reporter.info(`Creating page: ${path}`)

    createPage({
      path,
      component: require.resolve('./src/templates/page.js'),
      context: { _id }
    })
  })
  posts.forEach((edge, index) => {
    const { _id, slug = {} } = edge.node
    const path = `blog/${slug.current}/`

    reporter.info(`Creating post: ${path}`)

    createPage({
      path,
      component: require.resolve('./src/templates/post.js'),
      context: { _id }
    })
  })
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  await createSinglePages(graphql, actions, reporter)
}
