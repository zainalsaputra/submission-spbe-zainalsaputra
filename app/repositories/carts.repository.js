const prisma = require("../config/prisma.client.js");

const findCart = async () => {
  const getCarts = await prisma.cart.findFirst({
    select: {
      id: true,
      customer_id: true,
      created_at: true,
      cart_items: {
        select: {
          id: true,
          books_product_id: true,
          quantity: true,
          created_at: true,
          books_product: {
            select: {
              book: {
                select: {
                  title: true,
                },
              },
              format: true,
              price: true,
            },
          },
        },
      },
    },
  });
  return getCarts;
};

const createdCart = async (body) => {
  const createCart = await prisma.cart.create({
    data: {
      customer_id: body.customer_id,
      cart_items: {
        create: {
          books_product_id: body.books_product_id,
          quantity: body.quantity,
        },
      },
    },
    include: {
      cart_items: true,
    },
  });
  return createCart.cart_items[0];
};

module.exports = {
  findCart,
  createdCart,
};
