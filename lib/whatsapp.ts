type WhatsAppOrderItem = {
  name: string;
  quantity: number;
  price: number;
};

type WhatsAppOrder = {
  orderNumber: string;
  items?: WhatsAppOrderItem[];
  total: number | string; // ✅ flexible
};

export function buildWhatsAppOrderMessage(order: WhatsAppOrder) {
  const itemsText =
    order.items && order.items.length > 0
      ? order.items
          .map((item) => `• ${item.name} × ${item.quantity} — ₹${item.price}`)
          .join("\n")
      : "_Items details available on request_";

  return `
🧾 *Order ${order.orderNumber}*

${itemsText}

------------------
*Total: ₹${order.total}*

🙏 Thank you for ordering!
  `.trim();
}
