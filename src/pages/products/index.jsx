import Layout from '@/components/Layout';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useModal } from '@/components/Modal';

function ProductItem(props) {
  const { setModal } = useModal();
  const handleRemove = (product) =>
    setModal({
      show: true,
      title: 'Delete this product',
      message: `Are you sure want to delete ${props.title}?`,
      onOk() {
        console.log('tes');
      },
      onCancel() {
        setModal({
          show: false,
        });
      },
    });
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
        <div className="flex space-x-3 justify-between align-items-center">
          <button
            type="button"
            className="border border-red-600 bg-white text-red-600 block w-full px-5 py-2 hover:bg-red-600 hover:text-white rounded-lg text-sm"
            onClick={() => handleRemove(props)}
          >
            Remove
          </button>
          <Link
            href={`/products/${props.id}`}
            type="button"
            className="border text-center border-emerald-600 bg-white text-emerald-600 block w-full px-5 py-2 hover:bg-emerald-600 hover:text-white rounded-lg text-sm"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Products() {
  const [products, setProducts] = useState([]);
  const { setModal } = useModal();

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        'https://dummyjson.com/products?limit=10',
        {
          headers: {
            Authorization: localStorage.getItem('token')
              ? `Bearer ${localStorage.getItem('token')}`
              : null,
          },
        }
      );

      if (response.status === 200) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.log('error > ', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Layout>
      <div className="flex justify-between items-center mb-3 px-3 lg:px-0">
        <h1 className="font-bold text-4xl mb-6">Products</h1>
        <Link href="/products/add">
          <span
            role="button"
            className="inline-block bg-blue-500 text-white rounded-lg px-5 py-2 hover:bg-blue-600"
          >
            Add new product
          </span>
        </Link>
      </div>
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-6 px-3 lg:px-0">
        {products &&
          products.length > 0 &&
          products.map((item) => <ProductItem {...item} key={item.id} />)}
      </div>
    </Layout>
  );
}
