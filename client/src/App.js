import "./App.scss";
import { MdClose } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:2003/";

function App() {
  const [addSection, setAddSection] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [dataList, setDataList] = useState([]);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post("/create", formData);
    console.log(data);
    if (data.data.success) {
      setDataList(data.data);
      alert(data.data.message);
    }
  };

  const getFetchData = async () => {
    const data = await axios.get("/");
    console.log(data);
    if (data.data.success) {
      setDataList(data.data.data);
    }
  };
  useEffect(() => {
    getFetchData();
  }, []);

  console.log(dataList);
  return (
    <>
      <div className="container">
        <button className="btn btn-add" onClick={() => setAddSection(true)}>
          ADD
        </button>
        {addSection && (
          <div className="addcontainer">
            <form onSubmit={handleSubmit}>
              <div className="close-btn" onClick={() => setAddSection(false)}>
                <MdClose />
              </div>
              <label htmlFor="name">Name : </label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleOnChange}
              />
              <label htmlFor="email">Email : </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleOnChange}
              />
              <label htmlFor="mobile">Mobile : </label>
              <input
                type="number "
                id="mobile"
                name="mobile"
                onChange={handleOnChange}
              />

              <button className="btn">Submit</button>
            </form>
          </div>
        )}
        <div className="tablecontainer">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email_ID</th>
                <th>Mobile Number</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {dataList.map((el) => {
                return (
                  <tr>
                    <td>{el.name}</td>
                    <td>{el.email}</td>
                    <td>{el.mobile}</td>
                    <td></td>
                  </tr>
                );
              })}
              <td></td>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
