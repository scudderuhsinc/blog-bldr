export default {
    name: 'role',
    type: 'document',
    title: 'Role',
    fields: [
        {
            name: 'name',
            type: 'string',
            description: 'Human readable name.'
        },
        {
            name: 'groupName',
            type: 'string',
            description: "Label for the user group, as used in user access sessions and defined in /studio/role_<roll-name>.json (ie '_id':'_.groups.contributing_writer')",
            options: {
                source: 'name',
                maxLength: 30,
                slugify: input => input
                    .toLowerCase()
                    .replace(/\s+/g, '_')
                    .slice(0, 200)
            }

        },
        {
            name: 'description',
            type: 'text',
            title: 'Description',
            description: 'Describe this role and all associated privilages.'
        }
    ]
}