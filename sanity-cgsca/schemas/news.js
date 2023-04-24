
export default {
    name: 'news',
    type: 'document',
      title: 'News',
    fields: [
      {
        name: 'newsTitle',
        type: 'string',
        title: 'News Title',
        validation : Rule => Rule.required(),
      },
      {
        name : 'image',
        type : 'image',
        title : 'Image',
        validation : Rule => Rule.required(),
      },
      {
        name : 'articleLink',
        type : 'string',
        title : 'Article Link',
        validation : Rule => Rule.required(),
      }
    ]
  }