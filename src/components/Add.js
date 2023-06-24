import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { redirect } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import SideNav from "./SideNav";


const Add = ({ match, history }) => {
  let navigate = useNavigate();
  const params = useParams();  
  
  const [state, setState] = useState({
    id: "",
    name: "",
    price: "",
    image: "",
    color: "",
    name_category: "",
    material: "",
    expiry_date: "",
    origin: "",
    description: "",
    tinhtranghang: true,
  });

  const imageRef = useRef(null);

  useEffect(() => {   // lấy thông tin sản phẩm từ API dựa trên id có sẵn trong params
    if (params) {                //params biến được khai báo từ//chứa các tham số được truyền vào từ URL
      const id = params.id;
      axios({
        method: "GET",
        url: `http://localhost:3000/products/${id}`,
        data: null,
      })
        .then((res) => {
          const data = res.data;
          setState({
            ...state,   // ..state giữ nguyên các giá trị hiện tại 
            id: data.id,
            name: data.name,
            price: data.price,
            image: data.image,
            color: data.color,
            name_category: data.name_category,
            material: data.material,
            expiry_date: data.expiry_date,
            origin: data.origin,
            description: data.description,
            tinhtranghang: data.tinhtranghang,
          });
        })
        .catch((err) => {});
    }
  }, [match]); //dependency 

  const onChange = (event) => {
    const { name, type, value } = event.target;
    if (name === "tinhtranghang") {
      setState({
        ...state,
        [name]: value === "true" ? true : false,
      });
    } else {
      setState({
        ...state,
        [name]:
          type === "file"
            ? imageRef.current.value.replace(/C:\\fakepath\\/i, "/img/")
            : value,
      });
    }
  };

  
  const onSave = (e) => {
    e.preventDefault();
    const {
      id,
      name,
      price,
      image,
      name_category,
      color,
      material,
      expiry_date,
      origin,
      description,
      tinhtranghang,
    } = state;  // Điều này cho phép truy cập các giá trị của sản phẩm từ trạng thái hiện tại.

    if (id) {
      axios({
        method: "PUT",
        url: `http://localhost:3000/products/${id}`,
        data: {
          name,
          price,
          image,
          color,
          name_category,
          material,
          expiry_date,
          origin,
          description,
          tinhtranghang,
        },
      })
        .then((res) => {
          toast.success("Cập nhật sản phẩm thành công");
          setTimeout(function() {
            navigate("/");
          }, 2000);
         
        })
        .catch((err) => {});
    } else {
      if (!name || !price || !image || !material || !expiry_date) {
        toast.warn("Vui lòng nhập đủ nội dung");
      } else {
        axios({
          method: "POST",
          url: "http://localhost:3000/products",
          data: {
            name,
            price,
            image,
            color,
            name_category,
            material,
            expiry_date,
            origin,
            description,
            tinhtranghang,
          },
        })
          .then((res) => {
            toast.success("Thêm sản phẩm thành công");
            setTimeout(function() {
              navigate("/");
            }, 2000);
          })
          .catch((err) => {});
      }
    }
  };

  const onClear = () => {
    setState({
      id: "",
      name: "",
      price: "",
      image: "",
      color: "",
      name_category: "",
      material: "",
      expiry_date: "",
      origin: "",
      description: "",
      tinhtranghang: true,
    });
  };

  return (
    <React.Fragment>
   
      <div>
        <div id="wrapper">
        <SideNav></SideNav>
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
            <Header></Header>
              <div className="panel panel-warning col-md-8 ml">
                <div className="container">
                  <div className="panel-body mt-4">
                    <form onSubmit={onSave}>
                      <div className="form-group">
                        <label>Tên Sản phẩm:</label>
                        <input
                          type="text"
                          name="name"
                          value={state.name}
                          onChange={onChange}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label>Giá Sản phẩm ($):</label>
                        <input
                          type="number"
                          name="price"
                          value={state.price}
                          onChange={onChange}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label>Chọn Ảnh:</label>
                        <input
                          type="file"
                          name="image"
                          ref={imageRef}
                          onChange={onChange}
                          className="form-control"
                        />
                      </div>
                      <label>Loại sản phẩm:</label>
                      <select
                        className="form-control"
                        name="name_category"
                        value={state.name_category}
                        onChange={onChange}
                        required="required"
                      >
                        <option value="sản phẩm mới">mới</option>
                        <option value="sản phẩm hot">hot</option>
                        <option value="sản phẩm khuyến mãi">khuyến mãi</option>
                      </select>
                      <div className="form-group">
                        <label>Màu bánh:</label>
                        <input
                          type="text"
                          name="color"
                          value={state.color}
                          onChange={onChange}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label>Nguyên liệu:</label>
                        <input
                          type="text"
                          name="material"
                          value={state.material}
                          onChange={onChange}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label>Hạn sữ dụng:</label>
                        <input
                          type="date"
                          name="expiry_date"
                          value={state.expiry_date}
                          onChange={onChange}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label>Xuất xứ:</label>
                        <input
                          type="text"
                          name="origin"
                          value={state.origin}
                          onChange={onChange}
                          className="form-control"
                        />
                      </div>
                      <label>Tình trạng hàng:</label>
                      <select
                        className="form-control"
                        name="tinhtranghang"
                        value={state.tinhtranghang}
                        onChange={onChange}
                        required="required"
                      >
                        <option value={true}>Còn hàng</option>
                        <option value={false}>Hết hàng</option>
                      </select>
                      <div className="form-group">
                        <label>Mô tả:</label>
                        <input
                          type="text"
                          name="description"
                          value={state.description}
                          onChange={onChange}
                          className="form-control"
                        />
                      </div>
                      <br />
                      <div className="text-center">
                        <button type="submit" className="btn btn-primary">
                          Lưu
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          onClick={onClear}
                          className="btn btn-primary"
                        >
                          Clear
                        </button>
                        <a
                          href="/product-list"
                          className="btn btn-primary ml-1"
                        >
                          Trở về
                        </a>
                      </div>
                    </form>
                    <ToastContainer />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Add;
