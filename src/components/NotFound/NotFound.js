import { useNavigate } from 'react-router'
import { Button, Result } from 'antd'

const NotFound = ({ message, code }) => {
  const navigate = useNavigate()

  return (
    <Result
      status="404"
      title={code}
      subTitle={message}
      extra={
        <Button onClick={() => navigate('/articles')} type="primary">
          Back Home
        </Button>
      }
    />
  )
}

export default NotFound
