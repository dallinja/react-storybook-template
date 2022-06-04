import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import FadeComponent, { FadeProps } from '../components/Fade'
import Paper from '../components/Paper'

type StoryProps = {
  component: React.ElementType
}
type TransitionStory = React.ForwardRefExoticComponent<
  FadeProps & StoryProps & React.RefAttributes<HTMLElement>
>

export default {
  title: 'Utils/Transitions',
  component: FadeComponent,
  argTypes: {
    children: {
      control: false,
    },
    component: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: { source: { type: 'code' } },
  },
} as ComponentMeta<TransitionStory>

const icon = (
  <Paper style={{ margin: 12 }} elevation={4} square>
    <svg style={{ width: 100, height: 100 }}>
      <polygon
        style={{ fill: 'black', stroke: 'rgba(0,0,0,0.12', strokeWidth: 1 }}
        points="0,100 50,00, 100,100"
      />
    </svg>
  </Paper>
)

const Template: ComponentStory<TransitionStory> = (args) => {
  const { component: Component } = args
  const [open, setOpen] = React.useState(false)
  return (
    <div>
      <label>
        <input type="checkbox" checked={open} onChange={(e) => setOpen(e.target.checked)} />
        Show
      </label>
      <Component in={open} {...args}>
        {icon}
      </Component>
    </div>
  )
}

export const Fade = Template.bind({})
Fade.args = {
  component: FadeComponent,
}

export const Collapse = Template.bind({})
Collapse.args = {
  component: FadeComponent,
}

export const Grow = Template.bind({})
Grow.args = {
  component: FadeComponent,
}
