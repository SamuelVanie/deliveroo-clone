import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'stripeKey',
  title: 'Stripe key',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name of the user',
      type: 'string',
    }),
    defineField({
      name: 'key',
      title: 'Stripe key',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
