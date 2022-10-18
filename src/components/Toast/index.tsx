import { useContext } from 'react'
import { IState, ToastContext } from '../../context/ToastContext'
import {
  FaCheck,
  FaExclamationCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaRegWindowClose,
} from 'react-icons/fa'
import './toast.css'

interface IToast {
  position: string
  autoDeleteInterval: number
}

const Toast = (props: IToast) => {
  const { state, dispatch } = useContext(ToastContext)

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
    <div className={`notification-container ${props.position}`}>
      {state.map((notification: IState, i: number) => {
        if (props.autoDeleteInterval) {
          setInterval(() => {
            dispatch({
              type: 'DELETE_NOTIFICATION',
              payload: notification.id,
            })
          }, props.autoDeleteInterval)
        }
        return (
          <div
            style={{
              backgroundColor: generateBackgroundColor(notification.type),
            }}
            key={notification.id}
            className={`notification toast ${props.position}`}
          >
            <FaRegWindowClose
              onClick={() =>
                dispatch({
                  type: 'DELETE_NOTIFICATION',
                  payload: notification.id,
                })
              }
              className="close-button"
            />
            <div className="notification-image">
              {generateIcon(notification.type)}
            </div>
            <div>
              <p className="notification-title">{notification.title}</p>
              <p className="notification-message">{notification.message}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Toast
