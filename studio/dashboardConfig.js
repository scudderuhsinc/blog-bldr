export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-eleventy-blog'
      }
    },
    { name: 'structure-menu' },
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5dc591e6c69d7280df2d69a3',
                  title: 'Sanity Studio',
                  name: 'blog-bldr-studio',
                  apiId: '4930ad85-8dcd-4070-9557-cc850918f23a'
                },
                {
                  buildHookId: '5dc591e66e24ff5918998952',
                  title: 'Blog Website',
                  name: 'blog-bldr',
                  apiId: '892ff561-7a70-4b43-9a7e-18f179f06148'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/scudderuhsinc/blog-bldr',
            category: 'Code'
          },
          { title: 'Frontend', value: 'https://blog-bldr.netlify.com', category: 'apps' }
        ]
      }
    },
    { name: 'project-users', layout: { height: 'auto' } },
    {
      name: 'document-list',
      options: { title: 'Recent blog posts', order: '_createdAt desc', types: ['post'] },
      layout: { width: 'medium' }
    }
  ]
}
