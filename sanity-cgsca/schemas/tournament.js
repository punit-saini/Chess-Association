export default {
  name: 'tournament',
  type: 'document',
  title: 'Tournament',
  fields: [
    {
      name: 'date',
      type: 'date',
      title: 'Tournament Date',
      validation: Rule => Rule.required()
    },
    {
      name: 'location',
      type: 'string',
      title: 'Tournament Address'
    },
    {
      name: 'name',
      type: 'string',
      title: 'Tournament Name'
    },
    {
      name: 'time',
      type: 'string',
      title: 'Tournament Timings'
    },
    {
      name: 'file',
      type: 'file',
      title: 'File'
    },
    {
      name: 'registeredStudent',
      type: 'array',
      title: 'Registered Students',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'CGSCA_id',
              type: 'string',
              title: 'CGSCA ID'
            },
            {
              name: 'name',
              type: 'string',
              title: 'Name'
            }
          ]
        }
      ]
    }
  ]
}
