import { useEffect } from "react";
import Script from "next/script";

<Script src={`https://www.paypal.com/sdk/js?client-id=AanFFp_lAreUIyHx8x5Xyc5FCv_hLe_wtHdzz0LWqYwQq2uLk78sIoXB_B0nT2gapJ2uaAA1jh-o0YTH`} />



export default function PayPalButton({ total, usuario_id, carrito }) {
  useEffect(() => {
    if (!window.paypal) return;

    window.paypal.Buttons({
      createOrder: async () => {
        const res = await fetch("/api/paypal/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ total }),
        });
        const data = await res.json();
        return data.id;
      },
      onApprove: async (data) => {
        const res = await fetch("/api/paypal/capture-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderID: data.orderID, usuario_id, carrito }),
        });
        const result = await res.json();
        alert("Pedido confirmado: " + result.pedido_id);
      },
    }).render("#paypal-button-container");
  }, []);

  return <div id="paypal-button-container"></div>;
}
