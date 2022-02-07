import React, { useState, useEffect } from "react";
// import { firestore } from "./../../firebase/utils";
import Button from "./../../components/forms/Button";
import FormInput from "./../../components/forms/FormInput";
import FormSelect from "./../../components/forms/FormSelect";
import Modal from "./../../components/Modal";
import "./styles.scss";

const Admin = (props) => {
  const [products, setProducts] = useState([]);
  const [hideModal, setHideModal] = useState(true);
  const [productCategory, setProductCategory] = useState("mens");
  const [productName, setProductName] = useState("");
  const [productThumbnail, setProductThumbnail] = useState("");
  const [productImageURL, setProductImageURL] = useState("");
  const [productPrice, setProductPrice] = useState(0);

  const toggleModal = () => setHideModal(!hideModal);

  const configModal = {
    hideModal,
    toggleModal,
  };

  // useEffect(() => {
  //   firestore
  //     .collection("products")
  //     .get()
  //     .then((snapshot) => {
  //       const snapshotData = snapshot.docs.map((doc) => doc.data());
  //       setProducts(snapshotData);
  //     });
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="admin">
      <div className="callToActions">
        <ul>
          <li>
            <Button onClick={() => toggleModal()}>Add new product</Button>
          </li>
        </ul>
      </div>
      <Modal {...configModal}>
        <div className="addNewProductForm">
          <form onSubmit={handleSubmit}>
            <h2>Add New Product</h2>
            <FormSelect
              label="Category"
              options={[
                {
                  value: "mens",
                  name: "Mens",
                },
                {
                  value: "womens",
                  name: "Womens",
                },
              ]}
              handleSubmit={(e) => setProductCategory(e.target.value)}
            />
            <FormInput
              label="Name"
              type="text"
              value={productName}
              handleChange={(e) => setProductName(e.target.value)}
            />
            <FormInput
              label="Main image URL"
              type="url"
              value={productThumbnail}
              handleChange={(e) => setProductThumbnail(e.target.value)}
            />
            <FormInput
              label="Price"
              type="number"
              min="0.00"
              max="10000.00"
              step="0.01"
              value={productPrice}
              handleChange={(e) => setProductPrice(e.target.value)}
            />
            <Button type="submit">Add product</Button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Admin;
