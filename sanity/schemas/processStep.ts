import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'processStep',
  title: 'Process Step',
  type: 'document',
  fields: [
    defineField({
      name: 'number',
      title: 'Step Number',
      type: 'string',
      description: 'e.g., "01", "02"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Step Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g., "1-2 weeks"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'iconName',
      title: 'Icon Name',
      type: 'string',
      description: 'Name of the SVG icon to use (e.g., "chat", "design", "check")',
      options: {
        list: [
          { title: 'Chat (Consultation)', value: 'chat' },
          { title: 'Design (Planning)', value: 'design' },
          { title: 'Check (Approval)', value: 'check' },
          { title: 'Tools (Fabrication)', value: 'tools' },
          { title: 'Building (Installation)', value: 'building' },
          { title: 'Star (Completion)', value: 'star' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in the timeline (1, 2, 3...)',
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      number: 'number',
      order: 'order',
    },
    prepare({ title, number, order }) {
      return {
        title: `${number}. ${title}`,
        subtitle: `Order: ${order}`,
      }
    },
  },
})
