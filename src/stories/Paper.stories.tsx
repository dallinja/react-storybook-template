import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Paper from '../components/Paper'

export default {
  title: 'Surfaces/Paper',
  component: Paper,
  parameters: {
    backgrounds: {
      default: 'lightGray',
      values: [{ name: 'lightGray', value: '#eee' }],
    },
  },
  argTypes: {
    children: {
      control: false,
    },
    component: {
      control: 'select',
      options: ['div', 'section', 'aside'],
    },
  },
} as ComponentMeta<typeof Paper>

const Template: ComponentStory<typeof Paper> = (args) => {
  return (
    <Paper {...args}>
      <div style={{ width: 200, height: 200 }} />
    </Paper>
  )
}

export const Simple = Template.bind({})
export const Variants = () => (
  <div style={{ display: 'flex', gap: 20 }}>
    <Paper style={{ width: 200, height: 200 }} />
    <Paper style={{ width: 200, height: 200 }} variant="outlined" />
    <Paper style={{ width: 200, height: 200 }} variant="outlined" square />
  </div>
)
export const Elevation: ComponentStory<typeof Paper> = () => (
  <div style={{ display: 'flex', gap: 20 }}>
    <Paper style={{ width: 200, height: 200 }} elevation={0} />
    <Paper style={{ width: 200, height: 200 }} elevation={8} />
    <Paper style={{ width: 200, height: 200 }} elevation={16} />
    <Paper style={{ width: 200, height: 200 }} elevation={24} />
  </div>
)
Elevation.parameters = {
  backgrounds: {
    default: 'lightGray',
    values: [{ name: 'lightGray', value: '#eee' }],
  },
}
