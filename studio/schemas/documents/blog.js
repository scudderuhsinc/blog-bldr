export default {
    name: 'blog',
    type: 'document',
    title: 'Blogs',
    __experimental_actions: ['update', /* 'create', 'delete', */ 'publish'],
    fields: [
        {
            name: 'owner',
            title: 'Owner',
            type: 'string',
            description: `Blog's Parent facility or System`
        },
        {
            name: 'id',
            title: 'Blog Code',
            type: 'string',
            description: `unique 4 letter lowercase code`,
            validation: Rule => Rule.error('You have to fill out 4 charactors, all lowercase.').lowercase().required(),
            options: {
                maxLength: 4
            }
        },
        {
            name: 'keywords',
            type: 'array',
            title: 'Keywords',
            description: 'Add keywords that describes your blog.',
            of: [{ type: 'string' }],
            options: {
                layout: 'tags'
            }
        },
        {
            name: 'description',
            type: 'text',
            title: 'Description',
            description: 'Describe your blog for search engines and social media.'
        },
        {
            name: 'links',
            title: 'URLs',
            type: 'object',
            fields: [
                {
                    title: 'Development URL',
                    name: 'dev',
                    type: 'url'
                },
                {
                    title: 'Production URL',
                    name: 'prod',
                    type: 'url'
                }
            ]
        }
    ],
    preview: {
        select: {
            title: 'owner',
            subtitle: 'id'
        }
    }
}