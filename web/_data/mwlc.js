const BlocksToMarkdown=require('@sanity/block-content-to-markdown')
const groq=require('groq')
const client=require('../utils/sanityClient.js')
const serializers=require('../utils/serializers')
const overlayDrafts=require('../utils/overlayDrafts')
const hasToken=!!client.config().token

const fs=require('fs')

function generatePost(post) {
  return {
    ...post,
    body: BlocksToMarkdown(post.body, { serializers, ...client.config() })
  }
}

async function getPosts() {
  // Learn more: https://www.sanity.io/docs/data-store/how-queries-work
  const filter=groq`*[_type == "post" && defined(slug) && publishedAt < now() && blog->id == "mwlc"]`
  const projection=groq`{
    _id,
    publishedAt,
    title,
    slug,
    teaser,
    "authorDisplay": author->authorDetails.display,
    "author": author->name,
    "authorImgSrc": author->authorDetails.image.asset->url,
    "authorImg": author->authorDetails.image,
    "blogId": blog->id,
    "blogName": blog->owner,
    "imgSrc": mainImage.asset->url,
    "imgAlt": mainImage.alt,
    body
  }`
  const order=`| order(publishedAt asc)`
  const query=[filter, projection, order].join(' ')
  const docs=await client.fetch(query).catch(err => console.error(err))
  const reducedDocs=overlayDrafts(hasToken, docs)
  //console.log(`Post: `+JSON.stringify(reducedDocs[0]))
  //console.log(`preparePosts: `+JSON.stringify(docs, null, '\t'))
  const preparePosts=reducedDocs.map(generatePost)

  return preparePosts
}

module.exports=getPosts
