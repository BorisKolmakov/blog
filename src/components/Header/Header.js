import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { setsIsLoggedOut } from '../../store/userSlice'
import { fetchUser } from '../../service/platformAPI'
import defaultAvatar from '../../assets/img/userAvatar.svg'
import { itemList, signIn, signUp, profile, newArticle } from '../Route/Route'
import NotFound from '../NotFound/NotFound'

import classes from './header.module.scss'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
  const username = useSelector((state) => state.user.user.username)
  const avatar = useSelector((state) => state.user.user.image)
  const error = useSelector((state) => state.user.error)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(fetchUser())
    }
  }, [])

  const onLogOut = () => {
    dispatch(setsIsLoggedOut())
    navigate(`${signIn}`)
    localStorage.removeItem('token')
  }
  const loggedIn = (
    <>
      <Link to={newArticle}>
        <button className={`${classes.btn} ${classes['btn--green']}`} type="button">
          Create article
        </button>
      </Link>
      <Link to={profile}>
        <span className={classes.username}>{username}</span>
        <img className={classes.avatar} src={avatar ? avatar : defaultAvatar} alt="avatar" />
      </Link>
      <button className={classes.btn} onClick={onLogOut} type="button">
        Log Out
      </button>
    </>
  )

  const loggedOut = (
    <>
      <Link to={signIn}>
        <button className={`${classes.btn} ${classes['btn--sign-in']}`} type="button">
          Sign In
        </button>
      </Link>
      <Link to={signUp}>
        <button className={`${classes.btn} ${classes['btn--green']}`} type="button">
          Sign Up
        </button>
      </Link>
    </>
  )

  if (error) {
    if (!error.username) {
      return <NotFound message={error.message} code={error.code} />
    }
  }

  return (
    <header className={classes.header}>
      <Link to={itemList}>
        <button className={classes.btn} type="button">
          Realworld Blog
        </button>
      </Link>
      <div className={classes.header__user}>{isLoggedIn ? loggedIn : loggedOut}</div>
    </header>
  )
}

export default Header
