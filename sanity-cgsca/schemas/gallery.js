export default {
    name: 'gallery',
    type: 'document',
      title: 'Gallery',
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Title',
        validation: Rule => [Rule.required().max(50).warning('Shorter titles are usually better'),Rule.required().min(10).error('A title of min. 10 characters is required')]
      },
      { 
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'title',
          maxLength: 200, // will be ignored if slugify is set
          slugify: input => input
                               .toLowerCase()
                               .replace(/\s+/g, '-')
                               .slice(0, 50)
        },
        validation: Rule => Rule.required()
      },
      {
        name : 'description',
        type: 'array', 
        of: [{type: 'block'}],
        title : 'Description',
      },
      {
        name: 'image',
        title: 'Image',
        validation: Rule => Rule.required(),
        type: 'array',
        of: [{ type: 'image' }],
        options: {
          hotspot: true,
        }
      }
    ]
  }