/* eslint-disable react/prop-types */
const Checkout = ({ info }) => {
  const { isStale, refetch, isFetching } = info;

  if (isFetching) {
    console.log(isFetching);
    return (
      <div>
        <h5>Checkout</h5>
        <div>
          <p>Wait..While we get the latest info</p>
        </div>
      </div>
    );
  }

  if (isStale) {
    return (
      <div>
        <h5>Checkout</h5>
        <div>
          <p>
            Please check the latest checkout info..{" "}
            <span style={{ color: "orange" }} onClick={() => refetch()}>
              refetch
            </span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h5>Checkout</h5>
      <div>
        <p>Please Proceed to Checkout</p>
      </div>
    </div>
  );
};

export default Checkout;
