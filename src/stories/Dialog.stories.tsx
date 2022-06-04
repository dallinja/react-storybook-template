import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Button from '../components/Button'
import Dialog, { DialogProps } from '../components/Dialog'
import DialogTitle from '../components/DialogTitle'
import DialogContent from '../components/DialogContent'
import DialogContentText from '../components/DialogContentText'
import DialogActions from '../components/DialogActions'

type StoryControls = {
  dividers?: boolean
}

type DialogStoryControls = React.ForwardRefExoticComponent<
  DialogProps & StoryControls & React.RefAttributes<HTMLElement>
>

export default {
  title: 'Feedback/Dialog',
  component: Dialog,
  subcomponents: {
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
  },
} as ComponentMeta<DialogStoryControls>

const Template: ComponentStory<DialogStoryControls> = (args) => {
  const [open, setOpen] = useState(false)
  const { dividers, ...dialogArgs } = args
  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open dialog
      </Button>

      <Dialog {...dialogArgs} open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Hey, I am a dialog</DialogTitle>
        <DialogContent dividers={dividers}>
          <DialogContentText>
            I am some content. Look at me. Oh so pretty. I am some content.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close dialog</Button>
          <Button variant="contained" onClick={() => setOpen(false)}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export const Simple = Template.bind({})
export const Dividers = Template.bind({})
Dividers.args = {
  // story args
  dividers: true,
}
