import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import CustomToast from './CustomToast'

const toastConfig = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  style: {
    background: 'black',
    borderRadius: '14px',
    marginTop: '20%',
    marginRight: '25px',
    width: '380px'
  },
}

function ToastManager() {
  const { message, type, toastId } = useSelector((state) => state.toast)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!message) return

    toast(
      <CustomToast title={message} type={type} />,
      toastConfig
    )

  }, [toastId, message, type, dispatch])

  return null
}

export default ToastManager