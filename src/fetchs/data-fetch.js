import axios from "axios";
import Swal from "sweetalert2";

const URL = "https://648016a9f061e6ec4d48914b.mockapi.io/data-barang";

const getDatas = async (cb) => {
  try {
    let datas = await axios({
      method: "GET",
      url: URL,
    });
    cb(datas.data);
  } catch (e) {
    console.log(e);
  }
};

const getDataDetails = async (cb, id) => {
  try {
    let datas = await axios({
      method: "GET",
      url: URL + `/${id}`,
    });
    cb(datas.data);
  } catch (e) {
    console.log(e);
  }
};

const addData = async (form, navigate) => {
  try {
    let datas = await axios({
      method: "POST",
      url: URL,
      data: form,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    Swal.fire("Created!", "Data barang berhasil ditambah!", "success");
    navigate("/");
  } catch (e) {
    Swal.fire("Failed!", "Error!", "error");
    console.log(e);
  }
};
const updateData = async (id, form, navigate) => {
  Swal.fire({
    title: "Apakah anda yakin?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Jangan",
    confirmButtonText: "Ya, simpan perubahan!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        let datas = await axios({
          method: "PUT",
          url: URL + `/${id}`,
          data: form,
          headers: { "Content-Type": "multipart/form-data" },
        });
        Swal.fire("Updated!", "Data berhasil diubah!", "success");
        navigate("/");
      } catch (e) {
        Swal.fire("Failed!", "Update Error!", "error");
        console.log(e);
      }
    }
  });
};
const deleteData = async (id, navigate) => {
  Swal.fire({
    title: "Apakah anda yakin ingin menghapus ini?",
    text: id,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Jangan",
    confirmButtonText: "Ya, hapus saja!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        let datas = await axios({
          method: "DELETE",
          url: URL + `/${id}`,
        });
        Swal.fire("Deleted!", "Data berhasil dihapus!", "success");
        navigate(window.location.pathname);
      } catch (e) {
        Swal.fire("Failed!", "Error!", "error");
        console.log(e);
      }
    }
  });
};

export { getDatas, addData, updateData, deleteData, getDataDetails };
