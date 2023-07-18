// import Head from "next/head";
// import 'react-toastify/dist/ReactToastify.css';
// import Blog from './blog'

// const index = () => {
//   return (
//     <>
//       <Head>
//         <title>Home Page </title>
//         <meta name="description" content="Free Web youtube tutorials" />
//         <meta name="keywords" content="HTML, CSS, JavaScript, next.js" />
//         <meta name="author" content="thapa technical" />
//         <meta
//           name="viewport"
//           content="width=device-width, initial-scale=1.0"></meta>
//           <link
//   rel="stylesheet"
//   href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
//   integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
//   crossorigin="anonymous"
// />
//       </Head>
//       {/* <Header /> */}
//       <Blog />
      
//     </>
//   );
// };

// export default index;



import { useState } from "react";
import Link from "next/link";
import styles from "../styles/index.module.css";
import blogdata from "./alldata";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactPaginate from "react-paginate";
function Items({ currentItems }) {
  return (
    <>
      {currentItems?.map((curElem) => {
        return (
          <div key={curElem.id} className="ssr-styles">
            <h3>{curElem.id}</h3>
            <Link href={`/${curElem.id}`}>
              <h2> Title : - {curElem.title}</h2>
              <h5>Description : - {curElem.body}</h5>
              <p>Date:- {curElem.publicationDate}</p>
            </Link>
          </div>
        );
      })}
    </>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();

  return {
    props: {
      blogdata,
    },
  };
};

const index = ({ blogdata }) => {
  const [show, setShow] = useState(false);
  const [formdata, setFormdata] = useState({
    title: "",
    body: "",
  });
  const [texterror, settexterror] = useState("");
  const [newArrayData,setNewArrayData]=useState([])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleInputChange = (event) => {
    setFormdata({
      ...formdata,
      [event.target.name]: event.target.value,
    });
  };
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + 5;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = (newArrayData.length!=0 ? newArrayData: blogdata)?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil((newArrayData.length!=0 ? newArrayData: blogdata)?.length / 5);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * 5) % (newArrayData.length!=0 ? newArrayData: blogdata).length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  const addblogs = () => {
    if (formdata.title && formdata.body) {
      settexterror("");
      const newdata = {
        id: blogdata.length + 1,
        title: formdata.title,
        body: formdata.body,
        userId: 1,
        publicationDate: `${new Date().getDate()}-${
          new Date().getMonth() + 1
        }-${new Date().getFullYear()}`,
      };
      blogdata.push(newdata);

      handleClose();
    } else {
      settexterror(" Please Fill All Data");
    }

    //   fetch('https://jsonplaceholder.typicode.com/posts', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     title: formdata.title,
    //     body: formdata.body,
    //     userId: 1,
    //     date:new Date()
    //   }),
    //   headers: {
    //     'Content-type': 'application/json; charset=UTF-8',
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((json) => console.log("json",json));
  };
  const handleSearch=(e)=>{
    let {value}=e.target
  const newdata=  blogdata.filter(d=> d.userId===value || d.title.includes(value)|| d.body.includes(value) )
    setNewArrayData(newdata)
    console.log("newdata",newdata)
  }
  return (
    <>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Blog</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  onChange={(e) => handleInputChange(e)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="body"
                  onChange={(e) => handleInputChange(e)}
                />
              </Form.Group>
            </Form>
            {texterror && (
              <p style={{ textAlign: "center", color: "red" }}>{texterror}</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={addblogs}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <span className={styles.heading_primary_main}>
        Welcome to the my blog
      </span>
      <div className="add_search_container">
      <Form.Control
        type="text"
        name="serach"
        placeholder="Search here..."
        onChange={(e) => handleSearch(e)}
      />
      <Button variant="primary" onClick={handleShow} style={{width:"150px",marginLeft:"5px"}}>
        Add New
      </Button>
      
      </div>
      
      <Items currentItems={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        className="pagination"
      />
    </>
  );
};

export default index;

