import { companyInfo } from '../data/company';

/**
 * Encodes and creates a direct WhatsApp click-to-chat URL
 * @param {string} text - Message text to prefill
 * @param {string} number - WhatsApp phone number in international format without '+'
 * @returns {string} wa.me URL
 */
export function createWhatsAppUrl(text, number = companyInfo.whatsappNumber) {
  const cleanNumber = number.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
}

/**
 * Generates an instant single product order WhatsApp link with selected variants
 */
export function getProductOrderWhatsAppUrl(product, options = {}) {
  const {
    selectedSize = '',
    selectedColor = '',
    quantity = 1,
    unitPrice = product.price || 0,
    customNotes = ''
  } = options;

  const totalPrice = (unitPrice * quantity).toFixed(2);

  const message = 
`🛍️ *NEW ORDER INQUIRY - TARAH ADVERTISING*
-----------------------------------------
📦 *Product:* ${product.name} (${product.sku})
${selectedSize ? `📐 *Selected Size:* ${selectedSize}\n` : ''}${selectedColor ? `🎨 *Color/Finish:* ${selectedColor}\n` : ''}🔢 *Quantity:* ${quantity}
💰 *Unit Price:* AED ${Number(unitPrice).toFixed(2)}
🏷️ *Estimated Total:* AED ${totalPrice}
⚡ *Delivery:* Express UAE Delivery
${customNotes ? `📝 *Notes:* ${customNotes}\n` : ''}-----------------------------------------
Please confirm order availability and share payment/delivery schedule. Thank you!`;

  return createWhatsAppUrl(message, companyInfo.whatsappNumber);
}

/**
 * Generates an inquiry WhatsApp link for a specific single product (legacy fallback)
 */
export function getProductWhatsAppUrl(product) {
  return getProductOrderWhatsAppUrl(product, {
    quantity: 1,
    unitPrice: product.price || 0
  });
}

/**
 * Generates a comprehensive Shopping Cart Order WhatsApp link with itemized totals
 */
export function getCartOrderWhatsAppUrl(cartItems, customerDetails = {}) {
  const { name = '', company = '', city = 'Dubai', notes = '' } = customerDetails;

  let subtotal = 0;
  let itemsList = '';

  cartItems.forEach((item, index) => {
    const qty = Number(item.quantity) || 1;
    const price = Number(item.unitPrice || item.price || 0);
    const lineTotal = qty * price;
    subtotal += lineTotal;

    itemsList += `${index + 1}. *${item.name}* (x${qty})
   • Code: ${item.sku || 'TRH'}
${item.selectedSize ? `   • Size: ${item.selectedSize}\n` : ''}${item.selectedColor ? `   • Color: ${item.selectedColor}\n` : ''}   • Price: AED ${price.toFixed(2)} each → *AED ${lineTotal.toFixed(2)}*
`;
  });

  const vat = 0; // VAT included in UAE retail
  const delivery = 0; // Free delivery
  const grandTotal = subtotal.toFixed(2);

  const clientInfo = [
    name ? `👤 *Customer:* ${name}` : '',
    company ? `🏢 *Company:* ${company}` : '',
    city ? `📍 *Delivery Emirate:* ${city}` : '📍 *Delivery Emirate:* Dubai, UAE',
    notes ? `📝 *Special Instructions:* ${notes}` : ''
  ].filter(Boolean).join('\n');

  const message = 
`🛍️ *NEW SHOPPING CART ORDER - TARAH ADVERTISING*
-----------------------------------------
📦 *Order Summary (${cartItems.length} items):*

${itemsList}-----------------------------------------
💰 *Subtotal:* AED ${subtotal.toFixed(2)}
🧾 *UAE VAT (5%):* Included
🚚 *Shipping:* FREE Express Delivery across UAE
🏷️ *Grand Total:* AED ${grandTotal}
-----------------------------------------
${clientInfo ? `${clientInfo}\n-----------------------------------------\n` : ''}Please confirm this order and advise on delivery schedule & invoice. Thank you!`;

  return createWhatsAppUrl(message, companyInfo.whatsappNumber);
}

/**
 * Legacy Cart Quote helper alias for backward compatibility
 */
export function getCartQuoteWhatsAppUrl(cartItems, customerDetails = {}) {
  return getCartOrderWhatsAppUrl(cartItems, customerDetails);
}

/**
 * Generates quick general WhatsApp inquiry URL
 */
export function getGeneralInquiryWhatsAppUrl(topic = 'General Advertising Inquiry') {
  const message = 
`Hello Tarah Advertising Dubai,

I am reaching out regarding: ${topic}.
I would like to discuss our advertising, signage, printing, or corporate promotional merchandise requirements.

Looking forward to your prompt response.`;

  return createWhatsAppUrl(message, companyInfo.whatsappNumber);
}
