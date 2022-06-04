import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import ButtonBaseComponent from '../components/ButtonBase'
import Button from '../components/Button'

export default {
  title: 'FormInputs/Button',
  component: Button,
  subcomponents: { ButtonBase: ButtonBaseComponent },
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: 300 }}>
      <Button {...args}>I am a button</Button>
    </div>
  )
}

export const Simple = Template.bind({})

export const ButtonBase: ComponentStory<typeof ButtonBaseComponent> = (args) => {
  return (
    <div
      style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Arial', fontSize: 16 }}
    >
      <ButtonBaseComponent>I am a button</ButtonBaseComponent>-
      <ButtonBaseComponent href="/home">I am a link</ButtonBaseComponent>- And this star is a button
      ➡<ButtonBaseComponent>⭐️</ButtonBaseComponent>
    </div>
  )
}
ButtonBase.parameters = {
  docs: {
    storyDescription:
      '`Button` is build on top of `ButtonBase` which simply removes any browser styling. It can also be used to turn anything into an accessible button, without applying additional styling. A good example is if you wanted to make an icon clickable but do not want the styling and features of `IconButton`',
  },
}
