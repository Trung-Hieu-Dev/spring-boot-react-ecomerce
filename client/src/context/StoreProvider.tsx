import React, { useState } from "react";
import { Basket } from "../model/Basket";
import { StoreContext } from "./StoreContext";

const StoreProvider = (props: any) => {
    const [basket, setBasket] = useState<Basket | null>(null);

    const removeItem = (productId: number, quantity: number) => {
        if (!basket) {
            return;
        }

        const basketItems = [...basket.basketItems];

        const itemIndex = basketItems.findIndex(item => item.productId === productId);

        if (itemIndex > -1) {
            basketItems[itemIndex].quantity -= quantity;
            if (basketItems[itemIndex].quantity === 0) {
                basketItems.splice(itemIndex, 1);
            }
            setBasket(prevState => {
                return {
                    ...prevState!,
                    basketItems
                }
            })
        }

    }

    return (
        <StoreContext.Provider value={{
            basket: basket,
            setBasket: setBasket,
            removeItem: removeItem
        }}>
            {props.children} 
        </StoreContext.Provider>
    );
};

export default StoreProvider;
