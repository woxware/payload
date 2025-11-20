import type { CollectionConfig } from 'payload'

export const VerificationServices: CollectionConfig = {
  slug: 'verification-services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'price', 'requirementsCount'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Service name (e.g., "Aadhaar Verification", "PAN Verification")',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'active',
      options: [
        {
          label: 'Active',
          value: 'active',
        },
        {
          label: 'Inactive',
          value: 'inactive',
        },
      ],
      admin: {
        description: 'Service availability status',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Brief description of what the service entails',
      },
    },
    {
      name: 'timing',
      type: 'select',
      required: true,
      defaultValue: 'immediately',
      options: [
        {
          label: 'Immediately',
          value: 'immediately',
        },
        {
          label: '24 Hours',
          value: '24-hours',
        },
        {
          label: '48 Hours',
          value: '48-hours',
        },
        {
          label: 'Custom',
          value: 'custom',
        },
      ],
      admin: {
        description: 'Time taken to process the verification',
      },
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      admin: {
        description: 'Price in Indian Rupees (₹)',
        step: 1,
      },
    },
    {
      name: 'paymentType',
      type: 'select',
      required: true,
      defaultValue: 'one-time',
      options: [
        {
          label: 'One-time payment',
          value: 'one-time',
        },
        {
          label: 'Subscription',
          value: 'subscription',
        },
        {
          label: 'Per verification',
          value: 'per-verification',
        },
      ],
      admin: {
        description: 'Type of payment model',
      },
    },
    {
      name: 'requirements',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'requirement',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: 'List of required documents or items for this verification',
      },
    },
    {
      name: 'requirementsCount',
      type: 'number',
      admin: {
        description: 'Number of requirements (auto-calculated from requirements array)',
        readOnly: true,
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }: { data: any }) => {
        // Auto-calculate requirementsCount if not set
        if (data?.requirements && Array.isArray(data.requirements)) {
          data.requirementsCount = data.requirements.length
        }
        return data
      },
    ],
  },
}

