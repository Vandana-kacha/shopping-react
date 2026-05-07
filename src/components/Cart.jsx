export default function Cart({
  cart,
  increaseQty,
  decreaseQty,
  total,
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Cart</h2>

      {cart.length === 0 && (
        <p className="text-gray-500">Your cart is empty</p>
      )}

      <div className="space-y-3">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
          >
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-500">
                ${item.price} × {item.qty}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => decreaseQty(item.id)}
                className="px-2 bg-gray-200 rounded"
              >
                -
              </button>

              <button
                onClick={() => increaseQty(item.id)}
                className="px-2 bg-gray-200 rounded"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-xl font-bold">
        Total: ${total}
      </div>
    </div>
  );
}