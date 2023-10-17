import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import cn from 'classnames'

import { fetchRegistration, fetchArticles } from '../../service/platformAPI'
import { itemList } from '../Route/Route'

import classes from './UserForms.module.scss'

const SignUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    register,
    formState: { errors, isValid },
    setError,
    handleSubmit,
    watch,
  } = useForm({ mode: 'onBlur' })

  const error = useSelector((state) => state.user.error)
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)

  useEffect(() => {
    if (error) {
      Object.keys(error).map((item) => {
        if (item === 'username') {
          setError('username', { type: 'custom', message: 'Имя пользоватля уже существует' })
        }
        if (item === 'email') {
          setError('email', { type: 'custom', message: 'Электронная почта уже существует' })
        }
      })
    }
    if (!error && isLoggedIn) {
      dispatch(fetchArticles(0))
      navigate(`${itemList}`)
    }
  }, [error, isLoggedIn])

  const onSubmit = (data) => {
    const { username, email, password } = data
    const newUser = { user: { username, email, password } }
    dispatch(fetchRegistration(newUser))
  }
  const password = watch('password')

  return (
    <div className={classes.wrapper}>
      <h2 className={classes.title}>Create new account</h2>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={classes.label}>
          Username
          <input
            className={cn(classes.input, { [classes['input--error']]: errors.username })}
            {...register('username', {
              required: 'Требуется имя пользоватея',
              minLength: { value: 3, message: 'Ваше имя пользователя должно состоять как минимум из 3 символов.' },
              maxLength: {
                value: 20,
                message: 'Ваше имя пользователя не должно превышать 20 символов.',
              },
            })}
            placeholder="Username"
          />
        </label>
        <div className={classes.error}>{errors.username && <p>{errors?.username.message}</p>}</div>
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
        <div className={classes.error}>{errors.email && <p>{errors?.email.message}</p>}</div>
        <label className={classes.label}>
          Password
          <input
            className={cn(classes.input, { [classes['input--error']]: errors.password })}
            {...register('password', {
              required: 'Требуется пароль',
              minLength: { value: 6, message: 'Ваш пароль должен быть не менее 6 символов.' },
              maxLength: {
                value: 40,
                message: 'Ваш пароль не должен превышать 40 символов.',
              },
            })}
            type="password"
            placeholder="Password"
          />
        </label>
        <div className={classes.error}>{errors.password && <p>{errors?.password.message}</p>}</div>

        <label className={classes.label}>
          Repeat Password
          <input
            className={cn(classes.input, { [classes['input--error']]: errors.repeat })}
            {...register('repeat', {
              required: 'Это поле обязательно к заполнению',
              validate: (value) => value === password || 'Пароли должны совпадать',
            })}
            type="password"
            placeholder="Password"
          />
        </label>
        <div className={classes.error}>{errors.repeat && <p>{errors?.repeat.message}</p>}</div>

        <label className={classes.agreement}>
          <input {...register('agreement', { required: true })} className={classes.checkbox} type="checkbox" />I agree
          to the processing of my personal information
        </label>
        <button className={classes.btn} type="submit" disabled={!isValid}>
          Create
        </button>
      </form>
      <footer className={classes.footer}>
        <span>Already have an account? </span>
        <Link to="/sign-in"> Sign In.</Link>
      </footer>
    </div>
  )
}

export default SignUp
