const groq=require('groq')
const client=require('../utils/sanityClient')
// const env=require('./app')

module.exports=async function () {
  // arguments at load
  // console.log(env.blog)
  // console.log(env.target)
  return await client.fetch(groq`
    *[_id == "siteSettings"]{
      ...,
      author->
    }[0]
  `)
}
