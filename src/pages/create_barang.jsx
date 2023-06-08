import React, { useState, useEffect } from "react";
import "./style.css";
import { addData, getDatas } from "../fetchs/data-fetch";
import { useNavigate } from "react-router-dom";

const AddData = () => {
  const [datas, setDatas] = useState([]);
  const [data, setData] = useState({
    nama_barang: "",
    gambar_barang: "",
    harga_beli: 0,
    harga_jual: 0,
    stok: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    getDatas((result) => setDatas(result));
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();
    let barangAda = false;
    datas.forEach((n) => {
      if (n.nama_barang === data.nama_barang) {
        barangAda = true;
      } 
    });
    if (barangAda) {
      alert("Barang Sudah Ada.");
    } else {
      addData(data, navigate);
    }
  };

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file.size > 100000) {
      event.preventDefault();
      alert("Ukuran File Terlalu Besar.");
    } else {
      setData({
        ...data,
        gambar_barang: file,
      });
    }
  };

  return (
    <div className="container my-3">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Data Barang</h4>
          <form>
            <div className="row mb-3">
              <div className="col-sm-6">
                <div className="form-group">
                  <label htmlFor="nama_barang">Nama Barang</label>
                  <input
                    id="nama_barang"
                    name="nama_barang"
                    type="text"
                    className="form-control"
                    onChange={(e) =>
                      setData({ ...data, nama_barang: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="harga_beli">Harga Beli</label>
                  <input
                    id="harga_beli"
                    name="harga_beli"
                    type="number"
                    className="form-control"
                    onChange={(e) =>
                      setData({ ...data, harga_beli: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="harga_jual">Harga Jual</label>
                  <input
                    id="harga_jual"
                    name="harga_jual"
                    type="number"
                    className="form-control"
                    onChange={(e) =>
                      setData({ ...data, harga_jual: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="stok">Stok</label>
                  <input
                    id="stok"
                    name="stok"
                    type="number"
                    className="form-control"
                    onChange={(e) => setData({ ...data, stok: e.target.value })}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label>Gambar Barang</label> <br />
                  <img
                    src={data.gambar_barang}
                    alt="Data image"
                    className="img-fluid rounded"
                    style={{ maxwidth: "200px" }}
                  />
                  <br />
                  <div>
                    <input
                      type="file"
                      className="btn  mt-2 "
                      accept=".jpg,.png"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <label>
                    Gambar yang diterima hanya berformat .jpg dan .png
                  </label>{" "}
                  <br />
                  <label>Ukuran maksimal 100kb</label>
                  <br />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-success mr-1 "
              onClick={submitHandler}
            >
              Tambah Barang
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddData;
