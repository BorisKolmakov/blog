import { Route, Routes } from 'react-router'

import Header from '../Header/Header'
import ItemList from '../ItemList/itemList'
import Article from '../Article/Article'
import SignIn from '../UserForms/SignIn'
import SignUp from '../UserForms/SignUp'
import Profile from '../UserForms/Profile'
import CreateArticle from '../UserForms/CreateArticle'
import EditArticle from '../UserForms/EditArticle'
import NotFound from '../NotFound/NotFound'
import { itemList, article, signIn, signUp, profile, newArticle, editArticle, notFound } from '../Route/Route'

import classes from './App.module.scss'

const App = () => {
  return (
    <div className={classes.app}>
      <Header />
      <main className={classes.content}>
        <Routes>
          <Route index element={<ItemList />} />
          <Route path={itemList} element={<ItemList />} />
          <Route path={article} element={<Article />} />
          <Route path={signIn} element={<SignIn />} />
          <Route path={signUp} element={<SignUp />} />
          <Route path={profile} element={<Profile />} />
          <Route path={newArticle} element={<CreateArticle />} />
          <Route path={editArticle} element={<EditArticle />} />
          <Route path={notFound} element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
