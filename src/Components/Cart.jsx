import React from 'react'
import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { toast } from 'react-toastify'



const Cart = ( props ) => {
    const { cartItems, onAddToCart, onRemoveFromCart } = props
    const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
    const taxPrice = itemsPrice * 0.14;
    const shippingPrice = itemsPrice > 2000 ? 0 : 20;
    const totalPrice = itemsPrice + taxPrice + shippingPrice;

    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    const onCreateOrder = async (data) => {
      await addDoc(collection(db, 'orders'),{
          email: data.email,
          name: data.name,
          adress: data.adress,
          town: data.town,
          postcode: data.postcode,
          //totalprice: totalPrice,
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
  
              <div className="col-2 text-right">
                {item.qty} x kr{Number(item.acf.price_on_a_product)}
              </div>
            </div>
          ))}
  
          {cartItems.length !== 0 && (
            <>
              <hr></hr>
              <div className="row">
                <div className="col-2">Items Price</div>
                <div className="col-1 text-right">${Number(itemsPrice)}</div>
              </div>
              <div className="row">
                <div className="col-2">Tax Price</div>
                <div className="col-1 text-right">${Number(taxPrice)}</div>
              </div>
              <div className="row">
                <div className="col-2">Shipping Price</div>
                <div className="col-1 text-right">
                  ${shippingPrice}
                </div>
              </div>
  
              <div className="row">
                <div className="col-2">
                  <strong>Total Price</strong>
                </div>
                <div className="col-1 text-right">
                  <strong>${Number(totalPrice)}</strong>
                </div>
              </div>
              <hr />

                <div>
                  <p>
                    <stronger>
                      Sorry for the inconvince but the cart is broken, please fill in the form below...
                    </stronger>
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
                       <Button variant="primary" type="submit">
                  Submit Order
                </Button>
                </Form.Group>


                <div>The only way to pay right now is with invoice</div>

               
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