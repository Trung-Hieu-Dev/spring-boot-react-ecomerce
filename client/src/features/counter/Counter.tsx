import React, { useState } from "react";
import styles from "./Counter.module.css";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../store";
import { decrement, increment, incrementByAmount } from "./CounterSlice";

const Counter = () => {
    const dispatch = useDispatch<typeof store.dispatch>();
    const count = useSelector((state:any) => state.counter.value);
    const [amount, setAmount] = useState(0);
    return (
        <>
            <div className={styles.row}>
                <button
                    className={styles.button}
                    onClick={() => dispatch(decrement())}
                >-
                </button>

                <span className={styles.value}>{count}</span>

                <button
                    className={styles.button}
                    onClick={() => dispatch(increment())}
                >+
                </button>
            </div>
            <div className={styles.row}>
                <input className={styles.textbox}
                       value={amount}
                       onChange={(event) => setAmount(+event.target.value)}
                />
                <button
                    className={styles.button}
                    onClick={() => dispatch(incrementByAmount(amount))}
                >Add amount
                </button>
            </div>
        </>

    );
};
export default Counter;
