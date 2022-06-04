import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Portal from '../components/Portal'
import Button from '../components/Button'

export default {
  title: 'Utils/Portal',
  component: Portal,
  argTypes: {
    children: {
      control: false,
    },
    container: {
      control: false,
    },
  },
  parameters: {
    docs: { source: { type: 'code' } },
  },
} as ComponentMeta<typeof Portal>

const Template: ComponentStory<typeof Portal> = (args) => {
  const [show, setShow] = React.useState(false)
  const container = React.useRef(undefined)

  const handleClick = () => {
    setShow(!show)
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Button variant="contained" onClick={handleClick}>
        {show ? 'Unmount children' : 'Mount children'}
      </Button>
      <div style={{ padding: 8, border: '1px solid' }}>
        It looks like I will render here.
        <br />
        {show ? (
          <Portal {...args} container={container.current}>
            <span>You see?!</span>
          </Portal>
        ) : null}
      </div>
      <div style={{ padding: 8, border: '1px solid' }} ref={container}>
        <span>But I will actually render here:</span>
        <br />
        {/* Will render here */}
      </div>
      <div>(Look at the code)</div>
    </div>
  )
}

export const Simple = Template.bind({})
