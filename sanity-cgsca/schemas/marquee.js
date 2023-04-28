export default {
    name: 'marquee',
    type: 'document',
      title: 'Marquee',
    fields: [
      {
        name: 'text',
        type: 'string',
        title: 'Text',
        validation : Rule => Rule.required()
      },
      {
        name : 'link',
        type : 'string',
        title : 'Link',
      },
    ]
  }