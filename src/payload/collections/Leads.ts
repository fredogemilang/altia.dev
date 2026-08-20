import type { CollectionConfig } from 'payload';

export const Leads: CollectionConfig = {
  slug: 'leads',
  admin: {
    useAsTitle: 'leadTitle',
    defaultColumns: ['leadTitle', 'email', 'phone', 'temperature', 'status', 'createdAt'],
    group: 'Leads & CRM',
  },
  fields: [
    {
      name: 'leadTitle',
      type: 'text',
      admin: {
        readOnly: true,
      },
      hooks: {
        beforeValidate: [
          ({ data }) => {
            if (data?.contact?.name && data?.contact?.company) {
              return `${data.contact.name} (${data.contact.company})`;
            }
            return data?.contact?.name || 'New Estimator Lead';
          },
        ],
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New Lead', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Proposal Sent', value: 'proposal_sent' },
        { label: 'Closed / Won', value: 'closed_won' },
        { label: 'Closed / Lost', value: 'closed_lost' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'email', type: 'email', required: true },
        { name: 'phone', type: 'text', required: true },
        { name: 'company', type: 'text' },
      ],
    },
    {
      name: 'projectSummary',
      type: 'group',
      fields: [
        { name: 'service', type: 'text' },
        { name: 'projectType', type: 'text' },
        { name: 'investmentMin', type: 'number' },
        { name: 'investmentMax', type: 'number' },
        { name: 'timelineMinWeeks', type: 'number' },
        { name: 'timelineMaxWeeks', type: 'number' },
        { name: 'complexity', type: 'text' },
      ],
    },
    {
      name: 'qualification',
      type: 'group',
      fields: [
        { name: 'score', type: 'number' },
        { name: 'temperature', type: 'select', options: ['hot', 'warm', 'cold'] },
        {
          name: 'factors',
          type: 'array',
          fields: [{ name: 'factor', type: 'text' }],
        },
      ],
    },
    {
      name: 'rawPayload',
      type: 'json',
      admin: {
        description: 'Complete requirements & estimate JSON from wizard',
      },
    },
    {
      name: 'adminNotes',
      type: 'textarea',
    },
  ],
};
