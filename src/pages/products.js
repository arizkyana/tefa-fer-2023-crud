import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function ProductItem(props) {
  return (
    <div className="bg-slate-700 rounded-lg p-3 min-h-[20rem] relative">
      <figure className="block h-[10rem] bg-slate-100 rounded-lg ">
        <img
          className="w-full h-full object-contain aspect-auto"
          src={props.thumbnail}
        />
      </figure>
      <div className="py-2">
        <h3 className="text-lg">{props.title}</h3>
        <h4 className="text-sm">Rp. {props.price}</h4>
      </div>
      <div className="absolute bottom-0 left-0 p-3 w-full">
        <button
          type="button"
          className="border border-emerald-600 bg-white text-emerald-600 block w-full px-5 py-2 hover:bg-emerald-600 hover:text-white rounded-lg text-sm"
        >
          add to cart
        </button>
      </div>
    </div>
  );
}

export default function Products() {
  const router = useRouter();
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://dummyjson.com/auth/products?limit=10",
        {
          headers: {
            Authorization: localStorage.getItem("token")
              ? `Bearer ${localStorage.getItem("token")}`
              : null,
          },
        },
      );

      if (response.status === 200) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.log("error > ", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.replace("/login");
  };

  return (
    <Layout>
      <nav className="bg-slate-700 text-white fixed top-0 left-0 w-full z-50">
        <div className="mx-auto max-w-6xl py-6 flex justify-between items-center">
          <h1 className="font-bold text-2xl text-emerald-500">TokoLaku</h1>
          <div className="flex justify-start items-center space-x-5">
            <button
              role="link"
              type="button"
              className="block bg-red-500 px-4 py-2 hover:bg-red-600 text-sm rounded-lg"
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <div className="min-h-screen mx-auto max-w-6xl pt-24">
        <h1 className="font-bold text-4xl mb-6">Products</h1>
        <div className="grid grid-cols-4 gap-6">
          {products &&
            products.length > 0 &&
            products.map((item) => <ProductItem {...item} key={item.id} />)}
        </div>
      </div>
    </Layout>
  );
}
