import { create }
from "zustand";

export interface CartProduct {

  id: string;

  name: string;

  slug: string;

  description: string;

  price: number;

  images: string[];

  stock: number;

  quantity: number;

}

interface CartStore {

  items: CartProduct[];

  addItem: (
    product: Omit<CartProduct, "quantity">
  ) => void;

  removeItem: (
    productId: string
  ) => void;

  clearCart: () => void;

  increaseQuantity: (
    productId: string
  ) => void;

  decreaseQuantity: (
    productId: string
  ) => void;

}

export const useCartStore =
  create<CartStore>((set) => ({

    items: [],

    // ADD ITEM

    addItem: (product) =>

      set((state) => {

        const existing =
          state.items.find(
            (item) =>
              item.id === product.id
          );

        // IF EXISTS

        if (existing) {

          return {

            items:
              state.items.map(
                (item) =>

                  item.id === product.id

                  ?

                  {
                    ...item,
                    quantity:
                      item.quantity + 1
                  }

                  :

                  item

              )

          };

        }

        // NEW ITEM

        return {

          items: [

            ...state.items,

            {
              ...product,
              quantity: 1
            }

          ]

        };

      }),

    // REMOVE ITEM

    removeItem: (productId) =>

      set((state) => ({

        items:
          state.items.filter(
            (item) =>
              item.id !== productId
          )

      })),

    // CLEAR CART

    clearCart: () =>

      set({

        items: []

      }),

    // INCREASE

    increaseQuantity: (productId) =>

      set((state) => ({

        items:
          state.items.map(
            (item) =>

              item.id === productId

              ?

              {
                ...item,
                quantity:
                  item.quantity + 1
              }

              :

              item

          )

      })),

    // DECREASE

    decreaseQuantity: (productId) =>

      set((state) => ({

        items:
          state.items
            .map(
              (item) =>

                item.id === productId

                ?

                {
                  ...item,
                  quantity:
                    item.quantity - 1
                }

                :

                item

            )
            .filter(
              (item) =>
                item.quantity > 0
            )

      }))

  }));