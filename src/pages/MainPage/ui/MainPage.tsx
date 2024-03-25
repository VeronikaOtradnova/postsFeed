import { postAPI } from "../../../shared/services/postService"
import { PostItem } from "./PostItem";
import styles from './MainPage.module.css'
import { Loader } from "../../../shared/ui/Loader/Loader";
import { useEffect, useState } from "react";
import { ErrorMessage } from "../../../shared/ui/ErrorMessage/ErrorMessage";

export function MainPage() {
  const [currentPostStart, setCurrentPostStart] = useState(0);
  const [isMyFetching,setIsFetchingDown]=useState(false)
  const [isMyFetchingUp,setIsMyFetchingUp]=useState(false)
  const {data:data, isLoading, error} = postAPI.useFetchAllPostsQuery({limit: 10, start:currentPostStart})
  const {posts, totalCount} = data ? data : {posts: [], totalCount: 0}

  const scrollHandler=(e:any):void=>{
    if (e.target.documentElement.scrollTop < 100) {
      setIsMyFetchingUp(true)
    }

    if (e.target.documentElement.scrollHeight - e.target.documentElement.scrollTop - window.innerHeight < 100) {
      setIsFetchingDown(true)
      window.scrollTo(0, (e.target.documentElement.scrollHeight + e.target.documentElement.scrollTop));
    }
  }

  useEffect(()=>{
    document.addEventListener('scroll',scrollHandler)
    return ()=>{
      document.removeEventListener('scroll',scrollHandler)
    }
  },[])

  useEffect(()=>{
    if (isMyFetching) {
      setCurrentPostStart(prev => {
        return prev < totalCount - 10 ? prev + 1 : prev
      })
      setIsFetchingDown(false)
    }
  },[isMyFetching])

  useEffect(()=>{
    if (isMyFetchingUp) {
      setCurrentPostStart(prev => {
        return prev > 0 ? prev - 1 : prev
      })
      setIsMyFetchingUp(false)
    }
  },[isMyFetchingUp])

  return (
    <div className={styles.postContainer}>
      {
        error && <ErrorMessage text="Ошибка при загрузке данных" />
      }
      {
        isLoading && <Loader />
      }

      {posts && posts.map(post => <PostItem key={post.id} post={post} />)}
    </div>
  )
}