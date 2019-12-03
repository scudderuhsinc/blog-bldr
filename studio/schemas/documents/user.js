export default {
  name: 'user',
  type: 'document',
  title: 'User',
  fields: [
    {
      name: 'name',
      description: "The user name",
      type: 'string',
      title: 'User Name'
    },
    {
      name: 'email',
      description: "the user's email address",
      type: 'string'
    },
    {
      tile: 'Author Details',
      name: 'authorDetails',
      type: 'document',
      fields: [
        {
          name: 'firstName',
          description: "Author's first name",
          type: 'string',
          title: 'First Name'
        },
        {
          name: 'lastName',
          description: "Author's last name",
          type: 'string',
          title: 'Last Name'
        },
        {
          name: 'suffix',
          description: "Any suffix to follow the author's last name (i.e. 'Jr.', 'MD', 'PhD')",
          type: 'string',
          title: 'Suffix'
        },
        {
          name: 'slug',
          type: 'slug',
          title: 'Slug',
          description: "Some blogs require a slug to be set to be able to show a author's profile",
          options: {
            source: user => `${user.firstName}-${user.lastName}`,
            maxLength: 100,
            slugify: input => input
              .toLowerCase()
              .replace(/\s+/g, '-')
              .slice(0, 99)
          }
        },
        {
          name: 'image',
          type: 'mainImage',
          title: 'Image',
          decription: "HTTPS URL to the user's profile image"
        },
        {
          name: 'bio',
          type: 'bioPortableText',
          title: 'Biography'
        },
        {
          name: 'display',
          type: 'boolean',
          decription: 'Show this author along with their posts.'
        },
      ]
    },
    {
      title: 'Access Administration',
      name: 'accessRights',
      type: 'document',
      fields: [
        {
          name: 'blogs',
          title: 'Blogs',
          description: 'Creates Post content for:',
          type: 'array',
          of: [
            {
              type: 'reference',
              to: {
                type: 'blog'
              }
            }
          ]
        },
        {
          name: 'id',
          description: "The user's ID as listed in the /studio/role_<roll-name>.json, starting with 'e-'<unique-string> ",
          type: 'slug',
          options: {
            source: user => `e-${user.name}`,
            maxLength: 100,
            slugify: input => input
              .toLowerCase()
              .replace(/\s+/g, '-')
              .slice(0, 99)
          } //, readOnly: true
        },
        {
          name: 'role',
          description: "Add user to manage.sanity.io/projects/<project-id> with either administrator or editor",
          type: 'reference',
          to: [
            {
              type: 'role'
            }
          ]
        },
        {
          name: 'sessionLabel',
          type: 'string',
          description: "label for the session"
        },
        {
          name: 'sessionExpires',
          description: "ISO timestamp for when the session should expire",
          type: 'date',
          options: {
            dateFormat: 'YYYY-MM-DD',
            calendarTodayLabel: 'Today'
          }
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'accessRights.role.name',
      media: 'authorDetails.image'
    }
  }
}
