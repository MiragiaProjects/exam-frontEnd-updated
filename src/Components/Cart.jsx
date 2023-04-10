import React from 'react'
import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase'
//import { toast } from 'react-toastify'


const Cart = ( props ) => {
    const { cartItems, onAddToCart, onRemoveFromCart, emptyCart } = props
    const itemsPrice = parseInt(cartItems.reduce((a, c) => a + c.qty * c.acf.price_on_a_product, 0))
    const taxPrice = parseInt(itemsPrice * 0.14)
    const shippingPrice = parseInt(itemsPrice > 2000 ? 0 : 20)
    const totalPrice = parseInt(itemsPrice + taxPrice + shippingPrice)
    console.log("CartItemsList", cartItems )
    const { register, handleSubmit, formState: { errors }, reset } = useForm()


    const onCreateOrder = async (data) => {
      await addDoc(collection(db, 'orders'),{
          email: data.email,
          name: data.name,
          adress: data.adress,
          town: data.town,
          postcode: data.postcode,
          //totalprice: totalPrice,
          //items: cartItems,
          //qty: item.qty,
          order: data.order,
      })
    //   toast.info('Thanks for your order!', {
    //     position: "top-center",
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     });
     reset()
      
  }

    return (
      <aside >
        <h2>Cart Items</h2>
        <div>
          {cartItems.length === 0 && <div>Cart is empty</div>}
          {cartItems.map((item) => (
            
            <div key={item.id} className="row">
              <div className="col-2">{item.title.rendered}</div>
              <div className="col-2">
                <button onClick={() => onRemoveFromCart(item)} className="remove">
                  -
                </button>{' '}
                <button onClick={() => onAddToCart(item)} className="add">
                  +
                </button>
              </div>
  
              <div>
                {item.qty} x {Number(item.acf.price_on_a_product)} kr
              </div>
            </div>
          ))}
  
          {cartItems.length !== 0 && (
            <>
              <hr></hr>
              <div className="cart-wrapper-div">
                <div className="cart-title">Items Price</div>
                <div className="cart-input">${Number(itemsPrice)}</div>
              </div>
              <div className="cart-wrapper-div">
                <div className="cart-title">Tax Price</div>
                <div className="cart-input">${Number(taxPrice)}</div>
              </div>
              <div className="cart-wrapper-div">
                <div className="cart-title">Shipping Price</div>
                <div className="cart-input">
                  ${shippingPrice}
                </div>
              </div>
  
              <div className="cart-wrapper-div">
                <div className="cart-title">
                  <strong>Total Price</strong>
                </div>
                <div className="cart-input">
                  <strong>${Number(totalPrice)}</strong>
                </div>
              </div>
              <hr />

                <div>
                  <p>
                    <strong>
                      The only way to pay right now is with invoice
                    </strong>
                  </p>
                </div>
                <hr />

              <Form onSubmit={handleSubmit(onCreateOrder)} noValidate>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control 
                      {...register("email",{
                          required: "An email is required",
                          minLength: {
                            value: 2,
                            message:"Must atlest be 2 characters"
                        }
                          
                      })} 
                      type="email" 
                      placeholder="Enter email" 
                      />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>First and Last Name</Form.Label>
                  <Form.Control {...register("name",{
                          required: "A Name is required",
                          
                      })}  
                      type="string" 
                      placeholder="First and Last Name" 
                      />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formAdress">
                  <Form.Label>Adress</Form.Label>
                  <Form.Control {...register("adress",{
                          required: "An adress is required",
                          
                      })}  
                        type="string" 
                        placeholder="Adress" 
                        />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formTown">
                  <Form.Label>Town</Form.Label>
                  <Form.Control {...register("town",{
                          required: "A Town is required",
                      })} 
                        type="string" 
                        placeholder="Town" 
                      />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPostcode">
                  <Form.Label>Postcode/Zipcode</Form.Label>
                  <Form.Control {...register("postcode",{
                          required: "A PostCode/ZipCode is required",
                          
                      })}  
                      type="string" 
                      placeholder="Postcode/Zipcode" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formOrder">
                  <Form.Label>Order</Form.Label>
                  <Form.Control {...register("order",{
                          required: "A Order is required",
                          
                      })}  
                      
                      placeholder="Order"
                      as="textarea" 
                      />
                       <Button variant="primary" onClick={emptyCart}> Empty Cart</Button>
                       <Button variant="primary" onClick={emptyCart} type="submit">
                  Submit Order
                </Button>
                </Form.Group>

              </Form>
            </>
          )}

        </div>
        <div>
    
        </div>
      </aside>
  )
}

export default Cart