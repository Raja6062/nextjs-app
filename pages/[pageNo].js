import styles from '../styles/index.module.css'
import blogdata from './alldata'

export const getStaticPaths = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();

  const paths = blogdata.map((curElem) => {
    return {
      params: {
        pageNo: curElem.id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.pageNo;

  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
};

const myData = ({ data }) => {
  const { id, title, body } = data;
  return (
    <>
      <span className={styles.heading_primary_main}>
            Welcome to the my blog
          </span>
          <div key={id} className="ssr-styles ssr-styles-inside">
            <h3>{id}</h3>
              <h2> Title : - {title}</h2>
              <h5>Description : - {body}</h5>
          </div>
    </>
  );
};

export default myData;


