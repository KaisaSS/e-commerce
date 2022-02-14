import { firestore } from "../../firebase/utils";

export const handleAddProduct = (product) => {
  return new Promise((res, rej) => {
    firestore
      .collection("products")
      .doc()
      .set(product)
      .then(() => {
        res();
      })
      .catch((err) => {
        rej(err);
      });
  });
};

export const handleFetchProducts = ({ filterType }) => {
  return new Promise((res, rej) => {
    let ref = firestore.collection("products").orderBy("createdDate", "desc");

    if (filterType) ref = ref.where("productCategory", "==", filterType);

    ref
      .get()
      .then((snapshot) => {
        const productsArray = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            documentID: doc.id,
          };
        });
        res(productsArray);
      })
      .catch((err) => {
        rej(err);
      });
  });
};

export const handleDeleteProduct = (documentID) => {
  return new Promise((res, rej) => {
    firestore
      .collection("products")
      .doc(documentID)
      .delete()
      .then(() => {
        res();
      })
      .catch((err) => {
        rej(err);
      });
  });
};
