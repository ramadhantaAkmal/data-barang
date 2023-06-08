import React, { useState, useEffect } from "react";
import { getDatas, deleteData } from "../fetchs/data-fetch";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Pagination } from "react-bootstrap";
import "./style.css";

const Dashboard = () => {
  const [activePage, setActivePage] = useState(1);
  const [query, setQuery] = useState("");
  let [totalPages, setTotalPages] = useState(0);
  let [filteredDatas, setFilteredDatas] = useState([]);
  //filtered backup digunakan untuk data pagination setelah di search
  let [filteredBackup, setFilteredBackup] = useState([]);
  let [datas, setDatas] = useState([]);
  const navigate = useNavigate();

  const itemsPerPage = 5;

  useEffect(() => {
    getDatas((result) => {
      setDatas(result);
      setTotalPages(Math.ceil(result.length / itemsPerPage));

      setFilteredDatas(
        result.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage)
      );
    });
  }, []);

  useEffect(() => {
    //kode untuk mengubah pagination setelah di search
    if (query) {
      //data yang di filter menggunakan array filteredBackup untuk menghindari rekursi
      setFilteredDatas(
        filteredBackup.slice(
          (activePage - 1) * itemsPerPage,
          activePage * itemsPerPage
        )
      );
      return;
    }
    //kode untuk mengubah pagination sebelum search
    setTotalPages(Math.ceil(datas.length / itemsPerPage));

    setFilteredDatas(
      datas.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage)
    );
  }, [activePage]);

  const deleteHandler = (id) => {
    deleteData(id, navigate);
  };

  const searchData = () => {
    let dataSearch = datas.filter((data) => {
      const dataName = data.nama_barang.toLowerCase();
      const input = query.toLowerCase();
      return dataName.includes(input);
    });
    let totalPage = Math.ceil(dataSearch.length / itemsPerPage);

    let filteredData = dataSearch;
    setTotalPages(totalPage);
    setFilteredDatas(filteredData);
    setFilteredBackup(filteredData);
  };

  const handleQuery = (event) => {
    setQuery(event.target.value);
  };

  return (
    <>
      <div className="container p-3">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h3 className="box-title mt-3">Data Barang</h3>
            <div className="input-group">
              <input
                type="search"
                className="form-control  "
                placeholder="Cari Barang"
                onChange={(e) => handleQuery(e)}
              />
              <div classname="input-group-append ">
                <button
                  className="btn btn-outline-secondary m-1"
                  type="submit"
                  onClick={searchData}
                >
                  Search
                </button>
              </div>
            </div>
            <Link to={`adddata`} className="btn btn-primary my-2">
              {" "}
              +{" "}
            </Link>

            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Gambar Barang</th>
                  <th>Nama Barang</th>
                  <th>Harga Beli</th>
                  <th>Harga Jual</th>
                  <th>Stok</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* MENU */}
                {filteredDatas.map((item) => {
                  const {
                    id,
                    nama_barang,
                    gambar_barang,
                    harga_beli,
                    harga_jual,
                    stok,
                  } = item;
                  return (
                    <tr>
                      <td width="390">
                        <img
                          className="img-thumbnail img-fluid"
                          src={gambar_barang}
                          style={{ width: 200, height: 200 }}
                          alt="cover"
                        ></img>
                      </td>
                      <td>
                        <h6 className="pro-d-title">{nama_barang}</h6>
                      </td>
                      <td>
                        <h6 className="pro-d-title">Rp. {harga_beli}</h6>
                      </td>
                      <td>
                        <h6 className="pro-d-title">Rp. {harga_jual}</h6>
                      </td>
                      <td>
                        <h6 className="pro-d-title">{stok}</h6>
                      </td>
                      <td>
                        <div className="d-grid gap-2 col-12 mx-12">
                          <Link
                            to={`editdata/${id}`}
                            className="btn btn-warning"
                          >
                            Edit
                          </Link>
                          <br></br>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => deleteHandler(+id)}
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-3 container d-flex justify-content-center">
          <Pagination>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Pagination.Item
                key={page}
                active={page === activePage}
                onClick={() => setActivePage(page)}
              >
                {page}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
