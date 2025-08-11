import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://inlighn-tech-shopora-backend.vercel.app/api";
// const baseUrl = "http://localhost:5000/api";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    //authRoutes
    registerUser: builder.mutation({
      query: (userData: { name: string; email: string; password: string }) => ({
        url: "/auth/signup",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),
    loginUser: builder.mutation({
      query: (credentials: { email: string; password: string }) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),

    // productRoutes
    getProducts: builder.query<Product[], void>({
      query: () => "/products",
    }),
    getProductById: builder.query<Product, string | undefined>({
      query: (id) => `/products/${id}`,
    }),

    // orderRoutes
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/orders",
        method: "POST",
        body: orderData,
      }),
    }),
    getAllOrders: builder.query<Order[], string | undefined>({
      query: (userId) => `/orders/${userId}`,
    }),
    getOrder: builder.query<Order, string>({
      query: (orderId) => `/orders/single/${orderId}`,
    }),
  }),
  tagTypes: ["User", "Product", "Order"],
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetOrderQuery,
} = api;

export interface Product {
  _id: string;
  name: string;
  image: string;
  description: string;
  category?: string;
  brand?: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
  isFeatured: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Order {
  _id: string;
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  user: string;
  date: string;
  createdAt?: string;
  updatedAt?: string;
}
