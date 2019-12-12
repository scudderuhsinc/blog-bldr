const imageUrl=require('./imageUrl')
const embedYouTube=require('./embedYouTube')

// Learn more on https://www.sanity.io/docs/guides/introduction-to-portable-text
module.exports={
  types: {
    // authorReference: ({ node }) => `[${node.name}](/authors/${node.slug.current})`,
    code: ({ node }) =>
      '```'+node.language+'\n'+node.code+'\n```',
    mainImage: ({ node }) => `![${node.alt}](${imageUrl(node).width(600).url()})`,
    youtube: ({ node }) => embedYouTube(node)
  }
}
