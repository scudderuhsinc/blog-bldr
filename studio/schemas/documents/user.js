export default {
  name: 'user',
  type: 'document',
  title: 'User',
  fields: [
    {
      name: 'userId',
      description: "The user's ID as listed in the /studio/role_<roll-name>.json, starting with 'e-'<unique-string> ",
      type: 'string'
    },
    {
      name: 'userFullName',
      description: "The user's full name",
      type: 'string',
      title: 'Name (First Last)'
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: "Some blogs require a slug to be set to be able to show a writer's profile",
      options: {
        source: 'userFullName',
        maxLength: 100,
        slugify: input => input
          .toLowerCase()
          .replace(/\s+/g, '-')
          .slice(0, 200)
      }
    },
    {
      name: 'userEmail',
      description: "the user's email address",
      type: 'string'
    },
    {
      name: 'userImage',
      type: 'image',
      title: 'Image',
      decription: "HTTPS URL to the user's profile image"
    },
    {
      name: 'userRole',
      description: "Add user to manage.sanity.io/projects/<project-id> with either administrator or editor",
      type: 'reference',
      to: [
        {
          type: 'role'
        }
      ]
    },
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
      name: 'bio',
      type: 'bioPortableText',
      title: 'Biography'
    },
    {
      name: 'sessionExpires',
      description: "ISO timestamp for when the session should expire",
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
        calendarTodayLabel: 'Today'
      }
    },
    {
      name: 'sessionLabel',
      type: 'string',
      description: "label for the session",
      options: {
        source: 'userFullName',
        maxLength: 100,
        slugify: input => input
          .toLowerCase()
          .replace(/\s+/g, '-')
          .slice(0, 200)
      }
    },
  ],
  preview: {
    select: {
      title: 'userFullName',
      subtitle: 'userRole.name',
      media: 'userImage'
    }
  }
}
