import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Button from '../components/Button'
import Modal from '../components/Modal'
import Fade from '../components/Fade'

export default {
  title: 'Utils/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>

const Template: ComponentStory<typeof Modal> = (args) => {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ position: 'relative' }}>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open modal
      </Button>
      <Modal {...args} open={open} onClose={() => setOpen(false)}>
        <Fade in={open}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <Button variant="contained" onClick={() => setOpen(false)}>
              Close modal
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}

export const Simple = Template.bind({})
