import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'statistic',
  title: 'Statistic',
  type: 'document',
  fields: [
    defineField({
      name: 'number',
      title: 'Number',
      type: 'string',
      description: 'e.g., "150+", "25", "$2B+"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'e.g., "Luxury Kitchens", "Countries"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'section',
      title: 'Section',
      type: 'string',
      options: {
        list: [
          { title: 'Homepage - Trust Markers', value: 'homepage-trust' },
          { title: 'Gallery - Stats', value: 'gallery-stats' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      validation: (Rule) => Rule.min(0),
    }),
  ],
  preview: {
    select: {
      number: 'number',
      label: 'label',
      section: 'section',
    },
    prepare({ number, label, section }) {
      return {
        title: `${number} ${label}`,
        subtitle: section,
      }
    },
  },
})
