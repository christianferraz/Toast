import { useEffect } from 'react'
import {
  FaCheck,
  FaExclamationCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaRegWindowClose,
} from 'react-icons/fa'
import { IState, useToast } from '../../context/ToastContext'

interface IToastBody {
  toast: IState
  position: 'bottom-left' | 'top-right' | 'bottom-right' | 'top-left'
}

const ToastBody = ({ toast, position }: IToastBody) => {
  const { dispatch } = useToast()
  const { id, autoCloseInterval = 5000, type, title, message } = toast

  useEffect(() => {
    const handle = setTimeout(() => {
      dispatch({
        type: 'DELETE_NOTIFICATION',
        payload: id,
      })
    }, autoCloseInterval)

    return () => clearInterval(handle)
  }, [dispatch, toast])
  const generateIcon = (
    type: 'INFO' | 'WARNING' | 'DANGER' | 'SUCCESS' | undefined,
  ) => {
    switch (type) {
      case 'INFO':
        return <FaInfoCircle />
      case 'WARNING':
        return <FaExclamationTriangle />
      case 'DANGER':
        return <FaExclamationCircle />
      case 'SUCCESS':
        return <FaCheck />
      default:
    }
  }

  const generateBackgroundColor = (
    type: 'INFO' | 'WARNING' | 'DANGER' | 'SUCCESS' | undefined,
  ) => {
    switch (type) {
      case 'INFO':
        return '#5bc0de'
      case 'WARNING':
        return '#f0ad4e'
      case 'DANGER':
        return '#d9534f'
      case 'SUCCESS':
        return '#5cb85c'
      default:
    }
  }
  return (
    <div
      style={{
        backgroundColor: generateBackgroundColor(type),
      }}
      className={`notification toast ${position}`}
    >
      <FaRegWindowClose
        onClick={() =>
          dispatch({
            type: 'DELETE_NOTIFICATION',
            payload: id,
          })
        }
        className="close-button"
      />
      <div className="notification-image">{generateIcon(type)}</div>
      <div>
        <p className="notification-title">{title}</p>
        <p className="notification-message">{message}</p>
      </div>
    </div>
  )
}

export default ToastBody
