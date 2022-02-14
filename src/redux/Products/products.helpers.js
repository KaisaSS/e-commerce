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

export const handleFetchProducts = ({ filterType, startAfterDoc, persistProducts = [] }) => {
  return new Promise((res, rej) => {
    const pageSize = 12;

    let ref = firestore.collection("products").orderBy("createdDate", "desc").limit(pageSize);

    if (filterType) ref = ref.where("productCategory", "==", filterType);
    if (startAfterDoc) ref = ref.startAfter(startAfterDoc);

    ref
      .get()
      .then((snapshot) => {
        const totalCount = snapshot.size;

        const data = [
          ...persistProducts,
          ...snapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              documentID: doc.id,
            };
          }),
        ];
        res({
          data,
          queryDoc: snapshot.docs[totalCount - 1],
          isLastPage: totalCount < 1,
        });
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
