module.exports = ({ user, orderDetails, address,total}) => {
   const today = new Date();
   var cartTotal = 0;
   return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
          <style>
             .invoice-box {
             max-width: 800px;
             margin: auto;
             padding: 30px;
             border: 1px solid #eee;
             box-shadow: 0 0 10px rgba(0, 0, 0, .15);
             font-size: 16px;
             line-height: 24px;
             font-family: 'Helvetica Neue', 'Helvetica',
             color: #555;
             }
             .margin-top {
             margin-top: 50px;
             }
             .justify-center {
             text-align: center;
             }
             .red{
                 color:red;
             }
             .grey{
                color:grey;
            }
             .invoice-box table {
             width: 100%;
             line-height: inherit;
             text-align: left;
             }
             .invoice-box table td {
             padding: 5px;
             vertical-align: top;
             }
             .invoice-box table tr td:nth-child(2) {
             text-align: right;
             }
             .invoice-box table tr.top table td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.top table td.title {
             font-size: 45px;
             line-height: 45px;
             color: #333;
             }
             .invoice-box table tr.information table td {
             padding-bottom: 40px;
             }
             .invoice-box table tr.heading td {
             background: #eee;
             border-bottom: 1px solid #ddd;
             font-weight: bold;
             }
             .invoice-box table tr.details td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.item td {
             border-bottom: 1px solid #eee;
             }
             .invoice-box table tr.item.last td {
             border-bottom: none;
             }
             .invoice-box table tr.total td:nth-child(2) {
             border-top: 2px solid #eee;
             font-weight: bold;
             }
             @media only screen and (max-width: 600px) {
             .invoice-box table tr.top table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             .invoice-box table tr.information table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             }
          </style>
       </head>
       <body>
          <div class="invoice-box">
             <table cellpadding="0" cellspacing="0">
                <tr class="top">
                   <td colspan="2">
                      <table>
                         <tr>
                            <td colspan="6" class="title"><img  src="http://localhost:8089/images/logo.jpg"
                               style="width:100%; max-width:156px;"></td>
                            <td>
                         
                         </tr>
                      </table>
                   </td>
                </tr>
                <tr class="information">
                   <td colspan="2">
               
                      <table>
                      
                         <tr>
                         
                            <td>
                                <h3> From: NeoSTORE</h3><br/>
                                To<br/>
                              <h3> Customer name: ${user}</h3>
                            </td>
                        
                            <td>
                            <h1>Invoice</h1><br/>
                               Invoice number: <h3 class="grey">6859</h3>
                            </td>
                         </tr>
                         <tr>
                         
                            <td>Address: <p> ${address.home_address} </p>
                                          <p> ${address.state}- ${address.pincode}</p>
                                          <p> ${address.country}</p></td>
                            <td>
                            <h2 class="red">Unpaid<h2>
                         </td>
                         </tr>
                      </table>
                   </td>
                </tr>
                <table>
                <tr class="heading">
                   <td>Items</td>
                   <td>Qty</td>
                   <td>Price</td>
                   <td>Total</td>
                 
                </tr>
                ${orderDetails.map((prod) => {
                  cartTotal += prod.product_cost* prod.quantity
                   
      return (
         ` <tr class="item">
                       <td>${prod.product_name}</td>
                       <td>${prod.quantity}</td>
                       <td>${prod.product_cost}</td>
                       <td>${prod.product_cost*prod.quantity}</td>
                      
                       

                     </tr>`
      )
   })}
            
               
               
                </table>
             </table>
             <br />
             <table>
             <tr>
             <td colspan="3">Sub Total: ₹ ${ cartTotal}</td>
             </tr>
           
             <tr>
             <td colspan="3">GST(5%): ₹ ${cartTotal*0.05}</td>
             </tr>
             <tr>
             <td colspan="3">Total Amount: ₹ 
             ${total}
</td>
             </tr>
            </table>
          </div>
       </body>
    </html>
    `;
};