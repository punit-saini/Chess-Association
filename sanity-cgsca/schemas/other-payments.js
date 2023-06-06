export default {
    name: 'payments',
    type: 'document',
      title: 'Payments',
    fields: [
      {
        name: 'name',
        type: 'string',
        title: 'name',
        validation : Rule => Rule.required()
      },
      {
        name : 'mobile',
        type : 'string',
        title : 'Mobile',
        validation : Rule => Rule.required()
      },
      {
        name : 'email',
        type : 'string',
        title : 'Email',
        validation : Rule => Rule.required()
      },
      {
        name : 'amount',
        type : 'string',
        title : 'Amount',
        validation : Rule => Rule.required()
      },
      {
        name : 'approvalStatus',
        type : 'boolean',
        title : 'Approval Status',
        validation : Rule => Rule.required()
      },
      {
        name : 'description',
        type : 'string',
        title : 'Description',
      }, 
      {
        name : 'paymentProof',
        type : 'string',
        title : 'Payment Proof',
        validation : Rule => Rule.required()
      },
    ]
  }