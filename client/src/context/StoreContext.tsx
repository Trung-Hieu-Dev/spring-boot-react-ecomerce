import { Basket } from "../model/Basket";
import { createContext } from "react";

interface StoreContextValue {
    basket: Basket | null;
    setBasket: (basket: Basket) => void;
    removeItem: (productId: number, quantity: number) => void;
}

export const StoreContext = createContext<StoreContextValue>({
    basket: null,
    setBasket: (basket: Basket) => {},
    removeItem: (productId: number, quantity: number) => {}
});
