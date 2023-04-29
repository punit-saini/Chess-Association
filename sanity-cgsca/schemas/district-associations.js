export default {
    name: 'districtAssociations',
    type: 'document',
      title: 'District Associations',
    fields: [
      {
        name: 'name',
        type: 'string',
        title: 'name',
        validation : Rule => Rule.required()
      },
      {
        name : 'address',
        type : 'string',
        title : 'Address',
        validation : Rule => Rule.required()
      },
      {
        name : 'contactPerson',
        type : 'string',
        title : 'Contact Person',
        validation : Rule => Rule.required()
      },
      {
        name : 'phone',
        type : 'string',
        title : 'Phone',
        validation : Rule => Rule.required()
      },
      {
        name : 'email',
        type : 'string',
        title : 'email'
      },
    ]
  }