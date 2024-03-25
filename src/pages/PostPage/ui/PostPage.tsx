import { useNavigate, useParams } from "react-router-dom";
import { postAPI } from "../../../shared/services/postService";
import styles from './PostPage.module.css'
import { Loader } from "../../../shared/ui/Loader/Loader";
import { Btn } from "../../../shared/ui/Btn/Btn";
import { Link } from "react-router-dom";
import { ErrorMessage } from "../../../shared/ui/ErrorMessage/ErrorMessage";

export function PostPage() {
  const { postId } = useParams();
  const id = postId ? +postId : 1;
  const { data: post, isLoading, error } = postAPI.useFetchPostByIdQuery(id);
  const navigate = useNavigate();

  return (
    <>
      {
        isLoading && <div className={styles.mainLoaderWrapper}><Loader /></div>
      }

      {
        error && <ErrorMessage text="Ошибка при загрузке данных" />
      }

      {
        post &&
        <div className={styles.container}>
          <h1 className={styles.title}>{post.id} - {post.title}</h1>
          <p className={styles.text}>{post.body}</p>
          <Btn style={{alignSelf: 'flex-start', marginTop: '20px'}} onClick={() => navigate('/')}>Назад</Btn>
        </div>
      }
    </>
  )
}