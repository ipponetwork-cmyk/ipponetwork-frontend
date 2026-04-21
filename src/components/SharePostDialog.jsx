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

function SharePostDialog({ open, onClose, postId = '123' }) {
  const [copied, setCopied] = useState(false)
  const getDomainName = () => {
    const host = window.location.hostname;
    console.log(host, "host1234");

    if (host === 'localhost') {
      return 'ippomani.com';
    }

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

  const dialogBgColor = 'var(--surface)'
  const textColor = 'var(--text)'
  const inputBgColor = 'var(--accent-bg)'
  const inputTextColor = 'var(--text)'
  const closeIconColor = 'var(--text-muted)'
  const closeIconHoverColor = 'var(--text)'

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: '15px',
          backgroundColor: dialogBgColor,
        }
      }}
    >
      <DialogTitle
        sx={{
          fontFamily: 'Maven Pro, sans-serif',
          fontWeight: 800,
          fontSize: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: textColor,
          backgroundColor: dialogBgColor,
        }}
      >
        Share Post
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            color: closeIconColor,
            '&:hover': { color: closeIconHoverColor },
          }}
        >
          <MdClose size={24} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ py: 2, backgroundColor: dialogBgColor }}>
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            alignItems: 'center',
            backgroundColor: inputBgColor,
            p: 1.5,
            borderRadius: '8px',
            marginTop: '12px',
          }}
        >
          <TextField
            fullWidth
            value={shareLink}
            readOnly
            size="small"
            variant="standard"
            InputProps={{
              disableUnderline: true,
              readOnly: true,
              sx: {
                fontSize: '14px',
                fontFamily: 'monospace',
                color: inputTextColor,
              },
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2, backgroundColor: dialogBgColor }}>
        <Button onClick={handleCopyLink} variant="contained" fullWidth style={{ borderRadius: '13px', backgroundColor: 'black', padding: "15px 10px", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#fff' }}>
          <MdContentCopy size={20} />
          {copied ? 'Copied!' : 'Copy Link'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SharePostDialog
