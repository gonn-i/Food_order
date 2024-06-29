import { useContext, useState } from 'react';
import { FoodContext } from '../../store/FoodContext';
import ModalContext from '../../store/ModalContext';
import { forwardRef } from 'react';

import Modal from './Modal';
import Input from './Input';
import { useApi } from '../../hooks/useApi';
import LoadingSpinner from './Loading';
import Error from './Error';

const CheckoutModal = forwardRef(function CheckoutModal({}, ref) {
  const { totalPrice, totalQuantity, cartFood } = useContext(FoodContext);
  const ModalContextCtx = useContext(ModalContext);
  const { loading, error, submitOrder } = useApi();
  const [submitSuccess, setSubmitSuccess] = useState(false);

  function handleHideCheckout() {
    ModalContextCtx.hideCheckout();
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());

    await submitOrder(cartFood, data);
    setSubmitSuccess(true);
  }
  if (loading) {
    return (
      <Modal
        className="checkout"
        open={ModalContextCtx.progress === 'checkout'}
        onClose={ModalContextCtx.progress === 'checkout' ? handleHideCheckout : null}
      >
        <LoadingSpinner context="Posting User Info" />;
      </Modal>
    );
  }
  if (!loading && error) {
    return (
      <Modal
        className="checkout"
        open={ModalContextCtx.progress === 'checkout'}
        onClose={ModalContextCtx.progress === 'checkout' ? handleHideCheckout : null}
      >
        <Error context={error} />
      </Modal>
    );
  }

  return (
    <Modal
      className="checkout"
      open={ModalContextCtx.progress === 'checkout'}
      onClose={ModalContextCtx.progress === 'checkout' ? handleHideCheckout : null}
    >
      {submitSuccess ? (
        <div className="success-message">
          <h2>Order Success! 🥳👩🏻‍🍳</h2>
          <p>
            Your order has been successfully placed. We'll deliver delicious food to you soon! 🍙 🥞 🥨 🧆 🍱 🥐 🍿 🍲
            🍞 🍣
          </p>
        </div>
      ) : (
        <>
          <h2>Checkout</h2>
          <p>
            Total Amount {totalQuantity} - Total Price $ {totalPrice}
          </p>
          <form onSubmit={handleSubmit}>
            <Input label="Full Name" type="text" id="name" />
            <Input label="Email Address" id="email" type="email" />
            <Input label="Street" id="street" type="text" />
            <div className="control-row">
              <Input label="Postal Code" id="postal-code" type="text" />
              <Input label="City" id="city" type="text" />
            </div>
            <p className="modal-actions">
              <button className="text-button" type="button" onClick={handleHideCheckout}>
                Close
              </button>
              <button className="button" type="submit" disabled={loading}>
                Submit Order
              </button>
            </p>
          </form>
        </>
      )}
    </Modal>
  );
});

export default CheckoutModal;
