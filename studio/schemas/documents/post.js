import { format } from 'date-fns'

export default {
  name: 'post',
  type: 'document',
  title: 'Post',
  fields: [
    {
      name: 'blog',
      title: 'Blog',
      description: 'Define the blog to display this post.',
      type: 'reference',
      to: [{ type: 'blog' }],
      validation: Rule => Rule.error('You have to define the blog.').required()
    },
    {
      name: 'author',
      title: 'Author',
      description: "Hidden by default, set 'display' in User -> Author Details.",
      type: 'reference',
      to: { type: 'user' },
      validation: Rule => Rule.error('You have to define an author.').required()
    },
    {
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published at',
      description: 'This can be used to schedule post for publishing.'
    },
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Titles should be catchy, descriptive, and not too long.',
      validation: Rule => Rule.error('You have to define title.').required()
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'The title slug to show the post, trimmed to 96 characters.',
      validation: Rule => Rule.error('Define a 96 charactor, all lowercase and without spaces (replace with "-"), or hit the [generate] button.').required(),
      options: {
        source: 'title',
        maxLength: 96,
        slugify: input => input
          .toLowerCase()
          .replace(/\s+/g, '-')
          .slice(0, 95)
      }
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: {
            type: 'category'
          }
        }
      ]
    },
    {
      name: 'mainImage',
      type: 'mainImage',
      title: 'Main Image'
    },
    {
      name: 'teaser',
      type: 'string',
      title: 'Post Teaser',
      description: "A catchy, descriptive, and not too long teaser text for this post; or define with shortcodes <!-- Teaser Start --> and <!-- Teaser End --> to the post's body text.",
      options: {
        maxLength: 140
      }
    },
    {
      name: 'body',
      type: 'bodyPortableText',
      title: 'Body'
    },

    {
      name: 'excerpt',
      type: 'excerptPortableText',
      title: 'Excerpt',
      description:
        'This ends up on summary pages, on Google, when people share your post in social media.'
    },
  ],
  orderings: [
    {
      name: 'publishingDateAsc',
      title: 'Publishing date new–>old',
      by: [
        {
          field: 'publishedAt',
          direction: 'asc'
        },
        {
          field: 'title',
          direction: 'asc'
        }
      ]
    },
    {
      name: 'publishingDateDesc',
      title: 'Publishing date old->new',
      by: [
        {
          field: 'publishedAt',
          direction: 'desc'
        },
        {
          field: 'title',
          direction: 'asc'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      publishedAt: 'publishedAt',
      author: 'author.authorDetails.firstName',
      media: 'mainImage'
    },
    prepare({ title='No title', publishedAt, slug={}, media }) {
      const dateSegment=format(publishedAt, 'YYYY/MM')
      const path=`/${dateSegment}/${slug.current}/`
      return {
        title,
        media,
        subtitle: publishedAt? path:'Missing publishing date'
      }
    }
  }
}
