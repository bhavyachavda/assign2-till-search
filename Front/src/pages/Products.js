import React, { useState, useEffect } from 'react'
import axios from 'axios';
// import { useNavigate, link } from 'react-router-dom';


const TableRowPrint = ({data, index, addDataToCart, removeFromCart }) => {
    const [addbutton, setAddbutton] = useState(true);
    const addCart = () => {
        setAddbutton(false);
        addDataToCart(data);
    }
    const removeCart = () => {
        setAddbutton(true);
        removeFromCart(data.productcode);
    }
    return (
        <tr>
            <td>{data.productcode} </td>
            <td> {data.productname} </td>
            <td>{data.brand} </td>
            <td>{data.productprice}</td>
            <td>{data.productstatus}</td>
            {addbutton ?(
             <td>
                <input type='button' 
                onClick={() => addCart(index)} value="Add" style={{ "width": "90px" }} 
                />
            </td>
             ) :(
                 <td>
                    <input type='button' 
                    onClick={() => removeCart()} value="Remove" style={{ "width": "90px" }} 
                    />
                 </td>
                 )}
        </tr>
        );
}

const TableRowPrintCart = ({pdata, grandtotal}) =>  { //({ pdata, index, addDataToCart, removeFromCart })

    const[value , setValue] = useState(1);
    const[itemamount,setItemamount] = useState(pdata.productprice);
     // const [addbutton, setAddbutton] = useState(true);   
      // const addCart = () => {    
        //     setAddbutton(false);   
        //     addDataToCart(pdata);  
        //
        //  };
      // const removeCart = () => {  
      //     setAddbutton(true);  
     //     removeFromCart(pdata.productcode);    
     // };
     return(
        <>
             <tr> 
                <td>{pdata.productcode} </td>
                <td> {pdata.productname} </td>
                <td>{pdata.brand} </td>
                <td>{pdata.productprice}</td>
                <td>{pdata.productstatus}</td>
                 {/* <input type='button' value="Cart" onClick={() => carthandle()} /> */}
                 <td>
                     <button onClick={() => {
                         setValue(value - 1)
                         setItemamount(itemamount - (pdata.productprice))
                         grandtotal(-1 * pdata.productprice)
                         if (value <= 1) {
                             setValue(1);
                             setItemamount(pdata.productprice)
                             grandtotal(pdata.productprice - pdata.productprice)
                         }
                     }}>-</button> 
                     {value} 

                     <button onClick={() => {
                         setValue(value + 1)
                         setItemamount(itemamount + (pdata.productprice))
                         grandtotal(pdata.productprice)
                     }} > + </button>
                 </td>

                 <td>{itemamount}</td>
             </tr>
        </>
     );
};

const Cart = ({cart,handleCart})=> {
    const addDataToCart = () => { };
    const removeFromCart = () => { };
    const[total,setTotal] = useState(0);

    useEffect (() =>{
        let sum = 0;
        cart.map((data)=>{
            sum = sum + data.productprice;
        })
        setTotal(sum);
    },[])

    const grandtotal = (Amount) => {
        setTotal(total + Amount);
    }
     return (
            <>
            <div>
            <button onClick={handleCart} style={{"margin" : "20px" }}>Back</button>
            <table border="1" style={{ width: "70vw", marginTop: "5rem", marginLeft: "10rem" }}>
                <tr>
                    <th>Product Code</th>
                    <th>Product Name</th>
                    <th>Brand</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Quantity</th>
                    <th>Amount</th>
                </tr>

        {cart.map((pdata, index)=>(
            <TableRowPrintCart pdata={pdata} 
            key = {index}
            index = {index}
            addDataToCart={addDataToCart}
            removeFromCart={removeFromCart}
            grandtotal={grandtotal}
            />
        ))}
        <tr>
            <td colSpan="7">
                {total}
            </td>
        </tr>
        </table>
        </div>
        </>
     );
}

const Products = () => {
    const [pdata, setPdata] = useState([]);
    const [cart, setCart] = useState([]);
    const [cartopen, setCartOpen] = useState(false);
    const [searchvalue, setSearchvalue] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setPdata([]);
        }
    }, [])

    useEffect(() => { 

    }, [pdata])

    useEffect(() => { 
        products();
     }, [])

    

    const products = async () => {
        const token= localStorage.getItem("token");
        console.log(token)
        const res = await axios.get("http://localhost:9000/products",{params:{token}})

            .then((res) => {
                setPdata(res.data);
            })
            .catch((err) => {
                setPdata([]);
                console.log(err);
            })
    }
    // const cartItem=[]
    const addDataToCart = (tempData) => {
        const cart1 = cart;
        cart1.push(tempData);
        setCart(cart1);
        // cartItem.push(tempData);
        // console.log("cart : ", cartItem);
        console.log("cart:",cart);
    }
    const removeFromCart = (tempData) => {
        // cartItem.splice(cartItem.findIndex((t)=>t.data == productcode),1)
        const ans = cart.filter((tData) => {
            return tempData != tData.productcode;
        });
        setCart(ans);
        console.log("cart : ", ans)
    }

    const handleCart = () =>{
        if(cartopen)
        {
            setCart([]);
            setCartOpen(false);
        }
        else{
            setCartOpen(true);
        }
    }

    const handlesearch = () =>{
        console.log("search called");
    }

    return (
        <>
        {cartopen ? (
            <div>
                 <Cart cart={cart} handleCart={handleCart} />
            </div>
        ):(
            <div>
                <input type="search" placeholder="search" value = {searchvalue} onChange={(e) => setSearchvalue(e.target.value)}/> 
                <button onClick={handlesearch} style={{"margin" : "10px" }}>Search</button>
                <button onClick={handleCart} style={{"margin" : "20px" }}>Cart</button>
                <table border='1' style={{ "width": "70vw", "marginTop": "5rem", "marginLeft": "10rem" }}>
                <tr>
                    <th>Product Code</th>
                    <th>Product Name</th>
                    <th>Brand</th>
                    <th>Price</th>
                    <th>Status</th>
                </tr> 
                {pdata.map((pdata, index) => (
                    <TableRowPrint 
                    data={pdata} 
                    key={index} 
                    index={index}
                    addDataToCart={addDataToCart} 
                    removeFromCart={removeFromCart} 
                    />
                ))}
            </table>
            </div>
        )}
        </>
    );
};
export default Products


