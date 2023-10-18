import { atom } from 'recoil';

export const todoList = atom({
  key: 'todoList',
  default: [
    {
      id: 1,
      title: 'Bring Milk',
      status: 'Pending',
      price: 20,
      qty: 2,
      unit: 'Litre',
    },
    {
      id: 2,
      title: 'Bring Mangoes',
      status: 'Pending',
      price: 20,
      qty: 5,
      unit: 'Kg',
    },
  ],
});

export const productCart = atom({
  key: 'productCart',
  default: [
    {
      id: 4,
      description: 'OPPO F19 is officially announced on April 2021.',
      category: 'Mobiles',
      price: 500,
      qty: 1,
      thumbnail: 'https://i.dummyjson.com/data/products/4/thumbnail.jpg',
      title: 'OPPOF19',
      discountPercentage: 20
    },
  ],
});
