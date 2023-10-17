import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import cn from 'classnames'

import { fetchLogin, fetchArticles } from '../../service/platformAPI'
import { itemList } from '../Route/Route'

import classes from './UserForms.module.scss'

const SignIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    register,
    formState: { errors, isValid },
    setError,
    handleSubmit,
  } = useForm({ mode: 'onBlur' })

  const error = useSelector((state) => state.user.error)
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)

  useEffect(() => {
    if (error) {
      setError('password', { type: 'custom', message: 'Неверный пароль или адрес электронной почты' })
    }
    if (!error && isLoggedIn) {
      dispatch(fetchArticles(0))
      navigate(`${itemList}`)
    }
  }, [error, isLoggedIn])

  const onSubmit = (data) => {
    const user = { user: { ...data } }
    dispatch(fetchLogin(user))
  }

  return (
    <div className={classes.wrapper}>
      <h2 className={classes.title}>Sign In</h2>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={classes.label}>
          Email address
          <input
            className={cn(classes.input, { [classes['input--error']]: errors.email })}
            {...register('email', {
              required: 'Требуется электронная почта',
              pattern: {
                value:
                  /^[a-z0-9-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/g,
                message: 'Электронная почта не подходит',
              },
            })}
            type="email"
            placeholder="Email address"
          />
        </label>
        <div className={classes.error}>{errors?.email && <p>{errors?.email.message}</p>}</div>

        <label className={classes.label}>
          Password
          <input
            className={cn(classes.input, { [classes['input--error']]: errors.password })}
            {...register('password', {
              required: 'Требуется пароль',
              minLength: { value: 6, message: 'Ваш пароль должен состоять как минимум из 6 символов.' },
              maxLength: {
                value: 40,
                message: 'Ваш пароль не дложен превышать 40 символов.',
              },
            })}
            type="password"
            placeholder="Password"
          />
        </label>
        <div className={classes.error}>{errors.password && <p>{errors?.password.message}</p>}</div>

        <button className={classes.btn} type="submit" disabled={!isValid}>
          Login
        </button>
      </form>
      <footer className={classes.footer}>
        <span>Don’t have an account?</span>
        <Link to="/sign-up"> Sign Up.</Link>
      </footer>
    </div>
  )
}

export default SignIn
