import S from '@sanity/desk-tool/structure-builder'
import Blogs from 'react-icons/lib/go/settings'
import Roles from 'react-icons/lib/go/key'
import Users from 'react-icons/lib/go/person'
import Posts from 'react-icons/lib/go/file-text'
//import Import from 'react-icons/lib/go/git-pull-request'
import Categories from 'react-icons/lib/go/file-directory'

const hiddenDocTypes=listItem =>
  !['blog', 'role', 'user', 'post', 'baldwin', 'category'].includes(listItem.getId())

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Blogs')
        .icon(Blogs)
        .schemaType('blog')
        .child(S.documentTypeList('blog').title('Blogs')),
      S.listItem()
        .title('Roles')
        .icon(Roles)
        .schemaType('role')
        .child(S.documentTypeList('role').title('Roles')),
      S.listItem()
        .title('Users')
        .icon(Users)
        .schemaType('user')
        .child(S.documentTypeList('user').title('Users')),
      S.listItem()
        .title('Posts')
        .icon(Posts)
        .schemaType('post')
        .child(S.documentTypeList('post').title('Posts')),
      // S.listItem()
      // .title('Import')
      // .icon(Import)
      // .schemaType('baldwin')
      // .child(S.documentTypeList('baldwin').title('Baldwin Publishing')),
      S.listItem()
        .title('Categories')
        .icon(Categories)
        .schemaType('category')
        .child(S.documentTypeList('category').title('Categories')),
      // This returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above
      ...S.documentTypeListItems().filter(hiddenDocTypes)
    ])
