import { initializeApp } from 'firebase/app';
import { getDatabase, ref as databaseRef, get } from 'firebase/database';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';

const fetchProducts = async () => {

  const firebaseConfig = {
    apiKey: "AIzaSyA2Nq_8Rdo_QLaLhV_9gGC6jSJ0f159bjc",
    authDomain: "biotrition-a1610.firebaseapp.com",
    databaseURL: "https://biotrition-a1610-default-rtdb.firebaseio.com",
    projectId: "biotrition-a1610",
    storageBucket: "biotrition-a1610.appspot.com",
    messagingSenderId: "704429073305",
    appId: "1:704429073305:web:3bad9ad6477065f3f36908"
  };

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const storage = getStorage(app);

  try {
    const productsRef = databaseRef(database, 'Products/');
    const snapshot = await get(productsRef);
    const productsData = snapshot.val();

    if (productsData) {
      const productList = [];

      for (const brand in productsData) {
        for (const name in productsData[brand]) {
          const product = productsData[brand][name];
          const { Price, Amount, Feature, 'Short Description': shortDescription } = product;

          const prices = Object.values(Price);
          const minPrice = Math.min(...prices);
          const minPriceIndex = prices.indexOf(minPrice);
          const amounts = Object.values(Amount);
          const correspondingAmount = amounts[minPriceIndex];

          try {
            const imageRef = storageRef(storage, `ProductImages/${brand}/${name}/1.jpg`);
            const downloadURL = await getDownloadURL(imageRef);

            productList.push({
              brand,
              name,
              prices,
              amounts,
              features: Feature,
              shortDescription,
              price: minPrice,
              amount: correspondingAmount,
              imageURL: downloadURL,
            });
          } catch (error) {
            console.error('Error retrieving image URL:', error);
          }
        }
      }
      return productList;
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

export default fetchProducts;