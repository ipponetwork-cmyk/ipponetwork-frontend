import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  IconButton,
} from '@mui/material'
import { MdContentCopy } from 'react-icons/md'
import { MdClose } from 'react-icons/md'
import { useState } from 'react'
// import useTheme from '../context/useTheme'
import { StyledDialog, StyledDialogTitle, StyledDialogContent, StyledDialogActions, StyledTextField, LinkBox, CopyButton } from '../css/index'
function SharePostDialog({ open, onClose, postId = '123' }) {
  const [copied, setCopied] = useState(false)
  const getDomainName = () => {
    const host = window.location.hostname;
    console.log(host, "host1234");
    const parts = host.split('.');
    const index = parts.findIndex(part => part.startsWith('ippo'));

    if (index !== -1) {
      return `${parts[index]}.${parts[index + 1]}`;
    }

    return `${parts[0]}.${parts[1]}`; // fallback
  };
  const domainName = getDomainName();

  const shareLink = `https://${domainName}/post/${postId}`;


  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareLink)
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
        onClose?.()
      }, 1500)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  // const dialogBgColor = 'var(--surface)'
  // const textColor = 'var(--text)'
  // const inputBgColor = 'var(--accent-bg)'
  // const inputTextColor = 'var(--text)'
  // const closeIconColor = 'var(--text-muted)'
  // const closeIconHoverColor = 'var(--text)'

  return (
    <StyledDialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <StyledDialogTitle>
        Share Post
        <IconButton onClick={onClose} size="small" sx={{ color: 'var(--text-muted)', '&:hover': { color: 'var(--text-h)' } }}>
          <MdClose size={24} />
        </IconButton>
      </StyledDialogTitle>

      <StyledDialogContent>
        <LinkBox>
          <StyledTextField
            fullWidth
            value={shareLink}
            size="small"
            variant="standard"
            InputProps={{ disableUnderline: true, readOnly: true }}
          />
        </LinkBox>
      </StyledDialogContent>

      <StyledDialogActions>
        <CopyButton onClick={handleCopyLink} variant="contained">
          <MdContentCopy size={20} />
          {copied ? 'Copied!' : 'Copy Link'}
        </CopyButton>
      </StyledDialogActions>
    </StyledDialog>
  )
}

export default SharePostDialog
