import { Link, useNavigate } from 'react-router-dom';
import { IPost } from '../../../shared/model/IPost'
import styles from './MainPage.module.css'
import { Btn, btnSizes } from '../../../shared/ui/Btn/Btn';

interface IProps {
  post: IPost;
}

export function PostItem({post}: IProps) {
  const navigate = useNavigate();
  const content = `${post.id}. ${post.title}. ${post.body}`

  return (
    <div className={styles.postItem}>
      <p className={styles.postText}>
        {
          content.length < 130 ?
          content :
          `${content.slice(0, 130).trim()}...`
        }
      </p>

      <Btn 
        onClick={() => navigate(`/post/${post.id}`)} 
        size={btnSizes.small}
        style={{marginTop: '7px'}}
      >
        Просмотр
      </Btn>
    </div>
  )
}