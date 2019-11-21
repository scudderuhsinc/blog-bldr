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

function generatePostXML(p) {
  //console.log(`atXML`+p)
  const current={ post: [] }
  for (ea of p) {
    current.post.push({
      //blog_id: ea.blogID._ref,
      //post_id: ea._id,
      //created: ea._createdAt,
      //updated: ea._updatedAt,
      pushed: new Date().toISOString(),
      slug: ea.slug.current,
      title: ea.title,
      //mainImg: `path here`,
      //teaser: ea.body
    })
    /* create post.json */
    //fs.writeFile(`./_sites/salt/`+ea.slug.current+`/index.json`, JSON.stringify(current.post), function (err) { if (err) throw err })
  }
}

async function getPosts() {
  // Learn more: https://www.sanity.io/docs/data-store/how-queries-work
  //"authorImg": *[_type="user" && references(^.author->_ref)].user,
  //"authorImg": author->userImage,
  const filter=groq`*[_type == "post" && defined(slug) && publishedAt < now() && blog->id == "SALT"]`
  const projection=groq`{
    _id,
    publishedAt,
    title,
    slug,
    excerpt,
    teaser,
    "author": author->name,
    "authorImg": author->userImage,
    "blog": blog->id,
    "imgSrc": mainImage.asset->url,
    "imgAlt": mainImage.alt,
    body
  }`
  const order=`| order(publishedAt asc)`
  const query=[filter, projection, order].join(' ')
  const docs=await client.fetch(query).catch(err => console.error(err))
  const reducedDocs=overlayDrafts(hasToken, docs)
  //console.log(`Post: `+JSON.stringify(reducedDocs[0]))
  const preparePosts=reducedDocs.map(generatePost)
  //await generatePostXML(docs)
  //console.log(`preparePosts: `+JSON.stringify(docs, null, '\t'))
  return preparePosts
}

module.exports=getPosts
