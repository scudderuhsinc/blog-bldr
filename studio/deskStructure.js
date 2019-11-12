import S from '@sanity/desk-tool/structure-builder'
import MdSettings from 'react-icons/lib/md/settings'
import MdPerson from 'react-icons/lib/md/person'

const hiddenDocTypes=listItem =>
  !['category', 'user', 'post', 'siteSettings'].includes(listItem.getId())

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Blogs')
        .icon(MdSettings)
        .schemaType('blog')
        .child(S.documentTypeList('blog').title('Blogs')),
      // S.listItem()
      //   .title('Role')
      //   .icon(MdSettings)
      //   .schemaType('role')
      //   .child(S.documentTypeList('role').title('Roles')),
      S.listItem()
        .title('User')
        .icon(MdPerson)
        .schemaType('user')
        .child(S.documentTypeList('user').title('Users')),
      S.listItem()
        .title('Blog posts')
        .schemaType('post')
        .child(S.documentTypeList('post').title('Posts')),
      S.listItem()
        .title('Categories')
        .schemaType('category')
        .child(S.documentTypeList('category').title('Categories')),
      // This returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above
      ...S.documentTypeListItems().filter(hiddenDocTypes)
    ])
