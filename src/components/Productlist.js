import React, { Component } from 'react';
import axios from 'axios';
// import Wrapper from './layout_admin/wrapper.js';
// import Banner from './layout_admin/banner.js';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';


class Productlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      keyword: '',
    };
  }

  componentDidMount() {  // yêu câu get lấy danh sách từ server
    axios({
      method: 'GET',
      url: 'http://localhost:3000/products',
      data: null,
    })
      .then((res) => {
        console.log(res);
        this.setState({
          products: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onDelete = (id) => {
    var { products } = this.state;
    axios({
      method: 'DELETE',
      url: `http://localhost:3000/products/${id}`,
      data: null,
    })
      .then((res) => {
        if (res.status === 200) {
          var index = this.findIndex(products, id);  //findIndex tìm vị trí của sản phẩm cần xóa
          if (index !== -1) {
            products.splice(index, 1);
            this.setState({                   // cập nhật lại trạng thái của sản phẩm
              products: products,
            });
            toast.success('Xóa sản phẩm thành công');
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  findIndex = (products, id) => {
    var result = -1; 
    products.forEach((product, index) => {
      if (product.id === id) {
        result = index;
      }
    });
    return result;
  };

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };

  render() {
    var { products, keyword } = this.state;
    let search = products.filter((product) =>     // để lọc các sản phẩm dựa trên từ khóa (keyword)
      product.name.toLowerCase().includes(keyword.toLowerCase())
    );

    return (
      <React.Fragment>
        <div>
          <div id="wrapper">
            {/* <Wrapper /> */}
            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">
                {/* <Banner /> */}
                <div className="btn-group mt-2 float-left a">
                  <NavLink className="navbar-brand mb-5 ml-4" to="/Add">
                    <button type="button" className="btn btn-primary">
                      Thêm Sản Phẩm
                    </button>
                  </NavLink>
                </div>
                <div className="mt-3 float-left">
                  <input
                    className="form-control search mb-3 ml-5"
                    name="keyword"
                    value={keyword}
                    onChange={this.onChange}
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                </div>
                <table className="table table-bordered table-hover mt-6 ml-5">
                  <thead>
                    <img></img>
                    <tr>
                      <th className="text-center">STT</th>
                      <th className="text-center">Tên Sản Phẩm</th>
                      <th className="text-center">Loại Sản Phẩm</th>
                      <th className="text-center">Hình ảnh</th>
                      <th className="text-center">Xuất xứ</th>
                      <th className="text-center">Tình Trạng</th>
                      <th className="text-center">Hành Động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {search.map((product, index) => (
                      <tr key={index}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.material}</td>
                        <td><img src={product.image} alt="Hình ảnh không tồn tại" style={{ width: '100px', height: 'auto' }}/></td>
                        <td>{product.origin}</td>
                        <td>{product.tinhtranghang ? 'còn hàng' : 'hết hàng'}</td>
                        <td>
                        <NavLink className="navbar-brand mb-5 ml-4" to={`/Add/${product.id}`}>
                          <button type="button" className="btn btn-primary">
                            sửa
                          </button>
                        </NavLink>
                        <button type="submit" className="btn btn-primary" onClick={() => this.onDelete(product.id)}> 
                          Xoá
                        </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </React.Fragment>
    );
  }
}

export default Productlist;
