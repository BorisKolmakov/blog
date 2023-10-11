import { useDispatch } from 'react-redux'
import { useForm, useFieldArray } from 'react-hook-form'
import { Navigate, useNavigate, useParams } from 'react-router'
import { message } from 'antd'
import cn from 'classnames'

import { createArticle, updateArticle } from '../../service/platformAPI'

import classes from './UserForms.module.scss'

const CreateArticle = ({ edit = false, defaultValues = { title: '', description: '', body: '' } }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { slug } = useParams()

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    control,
  } = useForm({
    mode: 'onBlur',
    defaultValues,
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  })
  const onSubmit = (data) => {
    const { tags, ...articleData } = data
    const tagList = tags.map((item) => item.tag)
    const newData = { article: { tagList, ...articleData }, slug }

    if (slug) {
      dispatch(updateArticle(newData)).then(() => {
        message.success('Статья обновлена')
        navigate('/articles')
      })
    }
    if (!slug) {
      dispatch(createArticle(newData)).then(() => {
        message.success('Статья создана')
        navigate('/articles')
      })
    }
  }

  if (!localStorage.getItem('token')) {
    return <Navigate to="/sign-in" />
  }

  return (
    <div className={`${classes.wrapper} ${classes['wrapper--article']}`}>
      <h2 className={classes.title}>{edit ? 'Edit article' : 'Create new article'}</h2>

      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={classes.label} htmlFor="title">
          Title
        </label>
        <input
          className={cn(classes.input, { [classes['input--error']]: errors.title })}
          {...register('title', {
            required: 'Требуется заголовок',
            validate: (value) => value.trim().length || 'Введите заголовок',
            maxLength: {
              value: 5000,
              message: 'Заголовод должен быть длиной не более 5 тыс. символов.',
            },
          })}
          id="title"
          placeholder="Title"
        />
        <div className={classes.error}>{errors?.title && <p>{errors?.title.message}</p>}</div>
        <label className={classes.label} htmlFor="description">
          Short description
        </label>
        <input
          className={cn(classes.input, { [classes['input--error']]: errors.description })}
          {...register('description', {
            required: 'Требуется описание',
            validate: (value) => value.trim().length || 'Введите описание',
          })}
          id="description"
          placeholder="Description"
        />
        <div className={classes.error}>{errors?.description && <p>{errors?.description.message}</p>}</div>
        <label className={classes.label} htmlFor="text">
          Text
        </label>
        <textarea
          className={cn(classes.input, { [classes['input--error']]: errors.body })}
          {...register('body', {
            required: 'Введите текст',
            validate: (value) => value.trim().length || 'Поле не может быть пустым',
          })}
          id="text"
          placeholder="Text"
        />
        <div className={classes.error}>{errors?.body && <p>{errors?.body.message}</p>}</div>

        <label className={classes.label}>Tags</label>
        <div className={classes.tags}>
          <ul>
            {fields.map((field, index) => {
              return (
                <li key={field.id}>
                  <div className={classes.tags__wrapper}>
                    <input
                      className={cn(classes.input, { [classes['input--error']]: errors.tags })}
                      {...register(`tags.${index}.tag`, {
                        required: 'Тег отсутствует',
                        validate: (value) => value.trim().length || 'Поле не может быть пустым',
                      })}
                      placeholder="Tag"
                    />
                    <div className={classes.error}>{errors?.tags && <p>{errors?.tags[index]?.tag?.message}</p>}</div>
                  </div>
                  <button
                    className={`${classes['btn']} ${classes['btn--delete']}`}
                    type="button"
                    onClick={() => remove(index)}
                  >
                    Delete
                  </button>
                </li>
              )
            })}
          </ul>
          <button
            className={`${classes['btn']} ${classes['btn--add']}`}
            onClick={() => append({ tag: '' })}
            type="button"
          >
            Add Tag
          </button>
        </div>

        <button className={`${classes.btn} ${classes['btn--send']}`} type="submit" disabled={!isValid}>
          Send
        </button>
      </form>
    </div>
  )
}

export default CreateArticle
