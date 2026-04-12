import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { clearToast } from '../redux/actions'

function ToastManager() {
  const { message, type, toastId } = useSelector((state) => state.toast)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!message) return
    toast[type](message)
    dispatch(clearToast())
  }, [toastId, message, type, dispatch]) 

  return null
}

export default ToastManager
