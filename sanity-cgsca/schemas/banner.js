export default {
    name: 'banner',
    type: 'document',
      title: 'Banner Images',
    fields: [
      {
        name: 'image',
        type: 'image',
        title: 'Image',
        options : {
            hotspot : true,
        },
        validation : Rule => Rule.required()
      },
      {
        name : 'link',
        type : 'string',
        title : 'Link'
      },
      {
        name : 'caption',
        type : 'string',
        title : 'Caption',
      }
    ]
  }