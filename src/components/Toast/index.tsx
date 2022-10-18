import { useToast } from '../../context/ToastContext'

import './toast.css'
import ToastBody from './ToastBody'

interface IToast {
  position: 'bottom-left' | 'top-right' | 'bottom-right' | 'top-left'
}

const Toast = ({ position }: IToast) => {
  const { state } = useToast()

  return (
    <div className={`notification-container ${position}`}>
      {state.map(notification => (
        <ToastBody
          position={position}
          toast={notification}
          key={notification.id}
        />
      ))}
    </div>
  )
}

export default Toast
