const { DateTime }=require("luxon");
const util=require('util')
const CleanCSS=require("clean-css");
const env=require('./_data/app')

module.exports=function (eleventyConfig) {
  // Get any Enviornmental Variables from CLI
  // BLOG=mwlc TARGET=dev npx @11ty/eleventy --serve
  //console.log(`ENV: `+env.target)
  var target="production"
  // if (typeof env.target!='undefined'&&env.target=='dev'||env.target=='development') {
  //   target="_sites/development"
  // } else if (typeof env.target=='undefined') {
  //   target="_sites/production"
  // }
  //process.env.TARGET='undefined'
  // console.log(env.target)

  // json formatting
  eleventyConfig.addNunjucksFilter("json", function (obj) {
    var json=JSON.stringify(obj, null, '\t')
    //console.log(`filter: `+json)
    return json
  });

  // Short code to return post's Teaser Text
  // https://keepinguptodate.com/pages/2019/06/creating-blog-with-eleventy/
  eleventyConfig.addShortcode('teaser', post => extractTeaser(post));

  // https://www.11ty.io/docs/quicktips/inline-css/
  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  eleventyConfig.addFilter("debug", function (value) {
    return util.inspect(value, { compact: false })
  });

  eleventyConfig.addFilter("readableDate", dateObj => {
    return new Date(dateObj).toDateString()
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd');
  });

  let markdownIt=require("markdown-it");
  let markdownItAnchor=require("markdown-it-anchor");
  let options={
    html: true,
    breaks: true,
    linkify: true
  };
  let opts={
    permalink: true,
    permalinkClass: "direct-link",
    permalinkSymbol: "#"
  };

  eleventyConfig.setLibrary("md", markdownIt(options)
    .use(markdownItAnchor, opts)
  );

  eleventyConfig.addFilter("markdownify", function (value) {
    const md=new markdownIt(options)
    //console.log(`mdify: `+value)
    return md.render(value)
  })
  return {
    templateFormats: [
      "md",
      "njk",
      "html",
      "liquid"
    ],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about it.
    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for URLs (it does not affect your file structure)
    pathPrefix: "/",
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_sites"
    }
  };
}

function extractTeaser(post) {
  // no body
  let teasertxt=null
  const markdownIt=require('markdown-it');
  let options={
    html: true,
    breaks: true,
    linkify: true
  }
  const md=new markdownIt(options)
  // no body text
  if (!post.hasOwnProperty('body')) {
    console.warn('Failed to extract teaser: Document has no property "body".');
    return null;
  }
  // teaser is defined
  if (post.teaser!=''||post.teaser!='undefined'||post.teaser!=null) {
    teasertxt=post.teaser+` ...`
  }
  const content=post.body
  let txt=null
  // The start and end separators to try and match to extract the teaser text
  const separatorsList=[
    { start: '<!-- Teaser Start -->', end: '<!-- Teaser End -->' },
    { start: '<p>', end: '</p>' }
  ];

  separatorsList.some(separators => {
    const startPosition=content.indexOf(separators.start)
    const endPosition=content.lastIndexOf(separators.end)
    if (startPosition!==-1&&endPosition!==-1) {
      txt=content.substring(startPosition+separators.start.length, endPosition).trim()+` ..`
      return true; // Exit out of array loop on first match
    }
  })
  // Search for short codes
  if (txt==''||txt=='undefined'||txt==null) {
    // No <!-- Teaser --> shortcodes in body copy
    teasertxt=md.render(post.body.substring(0, 12).trim()+` ..`)
  } else {
    // <!-- Teaser --> shortcodes in body copy
    teasertxt=md.render(txt)
  }
  //console.log(`at F(n): `+teasertxt)
  return teasertxt
}