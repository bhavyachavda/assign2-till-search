import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";


function Qtyvalue({ item, changeTotal }) {
    const [val, setVal] = useState(0);
    const [amount, setAmount] = useState(item.productprice);

    useEffect(() => { }, [])
    function minusval() {
        if (val != 0) {
            setVal(val - 1);
            setAmount((val - 1) * item.productprice)
            changeTotal(-1 * item.productprice);
        }
    }
    function plusval() {
        setVal(val + 1);
        setAmount((val + 1) * item.productprice)
        changeTotal(item.productprice);
    }
    return (
        <tr key={item.id}>
            <td>{item.productcode}</td>
            <td>{item.productname}</td>
            <td>{item.brand}</td>
            <td>{item.productprice}</td>
            <td>{item.productstatus}</td>
            <td><button onClick={minusval}>-</button>&nbsp;{val}&nbsp;
                <button onClick={plusval}>+</button></td>
            <td>{amount}</td>
        </tr>
    )
}

function Cart({ cart }) {
    const navigate = useNavigate();
    const [total, setTotal] = useState(0);
    const changeTotal = (amount) => {

        setTotal(total + amount);
    }
    useEffect(() => {
        console.log(cart);
    }, []);

    return (
        <div>
            <br></br>
            <center>
                <table border={{}}>
                    <tbody>
                        <tr>
                            <th>Product Code</th>
                            <th>Name</th>
                            <th>Company</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Amount</th>
                        </tr>
                        {cart.length > 0 ? (cart.map((item) => (
                            <Qtyvalue item={item} changeTotal={changeTotal} />
                        ))
                        )
                            :
                            <></>
                        }
                        <tr>
                            <td colspan="6" align='end' padding-right="40px">Grand Total :{total}</td>
                        </tr>
                    </tbody>
                </table> <br></br>
                <button>Order Placed</button> 
                {/* <h3>Grand Total :{total} </h3> */}
            </center>
        </div>
    )
}
export default Cart;

