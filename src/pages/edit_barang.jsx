import React, { useState, useEffect } from "react";
import "./style.css";
import { updateData, getDataDetails } from "../fetchs/data-fetch";
import { useParams, useNavigate } from "react-router-dom";

const EditData = () => {
  const [data, setData] = useState({
  });

  let { dataId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getDataDetails((result) => setData(result), dataId);
  }, [dataId]);

  const editHandler = (event) => {
    event.preventDefault();
    updateData(dataId, data, navigate);
  };

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file.size > 100000) {
      event.preventDefault();
      alert("File is too large.");
    } else {
      setData({
        ...data,
        gambar_barang: file,
      })
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
                    value={data.nama_barang}
                    onChange={(e) => setData({ ...data, nama_barang: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="harga_beli">Harga Beli</label>
                  <input
                    id="harga_beli"
                    name="harga_beli"
                    type="number"
                    className="form-control"
                    value={data.harga_beli}
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
                    value={data.harga_jual}
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
                    value={data.stok}
                    onChange={(e) =>
                      setData({ ...data, stok: e.target.value })
                    }
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
                      onChange={(e) =>
                        handleChange(e)
                      }
                    />
                  </div>
                  <label>Gambar yang diterima hanya berformat .jpg dan .png</label> <br />
                  <label>Ukuran maksimal 100kb</label><br />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-success mr-1 "
              onClick={editHandler}
            >
              Simpan Perubahan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditData;
