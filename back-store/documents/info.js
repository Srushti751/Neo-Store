


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
              .heading{
                  text-align:center;
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
          

           <h1 class="heading">  Term and Conditions.</h1>
           <p class="heading">A Digital Experience Company, One-Stop shop for all your Digital needs</p>
           <p>
            NeoSOFT is a SEI-CMMI Level-5 and ISO 9001:2008 certified global IT consulting & software solutions provider with 4000+ software consultants working full time across 8 Delivery Centers. Established in 1996, NeoSOFT is headquartered in Mumbai, India with offices in USA, UK, Dubai, Italy, Germany, Japan & Australia. Our commitment to quality and 25+ years of excellence has made us serve over 1500+ clients across 50+ countries with 85% client retention.

           </p>
           <p>
           Hosting Services will commence on the Effective Date indicated in the Order and continue for the duration of the Initial Term. Thereafter, the Order will automatically renew for successive periods (i) of twelve months (with respect to Non-Prepaid Plans) or (ii) as specified in the Service Description (with respect to Prepaid Plans) unless the Order is earlier terminated in accordance with its terms, or either party gives written notice to the other party of non-renewal at least 30 days prior to expiration of the then-current term.

           Either party may terminate this Agreement immediately upon the occurrence of any one or more of the following events: (i) the other party fails to pay when due any amounts required to be paid under this Agreement; (ii) the other party breaches any material term or provision of this Agreement (other than a breach described in subsection (i) above), and if capable of cure, such breach remains uncured 30 days after the non-breaching party gives written notice thereof to the breaching party; or (iii) the other party becomes insolvent, makes an assignment for the benefit of its creditors, institutes or becomes subject to any proceeding under any bankruptcy or similar laws for the relief of debtors, or seeks the appointment of, or becomes subject to the appoint of, any trustee or receiver for all or any portion of such party's assets.
           
           Neosoft Technologies may terminate this Agreement (i) if the Services are prohibited by applicable law, or become impractical or unfeasible for any technical, legal or regulatory reason, by giving Customer as much prior notice as reasonably practicable or (ii) immediately if Neosoft Technologies determines in good faith that Customer's use of the Customer Web site or the Customer Content violates the Acceptable Use Policy.
           
           Upon termination of this Agreement for any cause or reason whatsoever, neither party shall have any further rights or obligations under this Agreement, except as expressly set forth herein. The provisions of Sections 3(d), 3(e), 4, 8, 10, 11, 13 and 14 of this Agreement shall survive the expiration or termination of this Agreement for any cause or reason whatsoever, and, notwithstanding the expiration or termination of this Agreement, the parties shall each remain liable to the other for any indebtedness or other liability theretofore arising under this Agreement. Termination of this Agreement and retention of pre-paid fees and charges shall be in addition to, and not be in lieu of, any other legal or equitable rights or remedies to which Neosoft Technologies may be entitled.
           
           With respect to Non-Prepaid Plans, within 30 days after the termination of this Agreement, Customer will pay the Termination Charge to Neosoft Technologies unless (i) Neosoft Technologies terminated the Order under Section 3(c) or (ii) Customer terminated the Order under Section 3(b). With respect to Prepaid Plans, Customer will pay the Termination Charge as provided in the Service Description. The parties agree that the Termination Charge constitutes consideration for Neosoft Technologies's time, effort and expense in preparing and reserving the capacity to perform its obligations hereunder, as actual damages are difficult to ascertain. If Customer terminates the Order in accordance with Section 3(b), or if Neosoft Technologies terminates the Order under Sections 3(c)(i) or 12(c), Neosoft Technologies shall return to Customer, and Customer shall accept, as Customer's sole and exclusive remedy for Neosoft Technologies's breach of the Order, any Service Fees paid in advance by Customer hereunder attributable to Services not yet rendered as of the date of termination.
           
           Customer's Representations and Warranties. Customer hereby represents and warrants to Neosoft Technologies, and agrees that during the Term Customer will ensure that: Customer is the owner or valid licensee of the Customer Content and each element thereof, and Customer has secured all necessary licenses, consents, permissions, waivers and releases for the use of the Customer Content and each element thereof, including without limitation, all trademarks, logos, names and likenesses contained therein, without any obligation by Neosoft Technologies to pay any fees, residuals, guild payments or other compensation of any kind to any Person; Customer's use, publication and display of the Customer Content will not infringe any copyright, patent, trademark, trade secret or other proprietary or intellectual property right of any Person, or constitute a defamation, invasion of privacy or violation of any right of publicity or any other right of any Person, including, without limitation, any contractual, statutory or common law right or any "moral right" or similar right however denominated; Customer will comply with all applicable laws, rules and regulations regarding the Customer Content and the Customer Web site and will use the Customer Web site only for lawful purposes; and Customer has used its best efforts to ensure that the Customer Content is and will at all times remain free of all computer viruses, worms, trojan horses and other malicious code.
           
           License to Neosoft Technologies. Customer hereby grants to Neosoft Technologies a non-exclusive, royalty-free, worldwide right and license during the Term to do the following to the extent necessary in the performance of Services under the Order: digitize, convert, install, upload, select, order, arrange, compile, combine, synchronize, use, reproduce, store, process, retrieve, transmit, distribute, publish, publicly display, publicly perform and hyperlink the Customer Content; and make archival or back-up copies of the Customer Content and the Customer Web site). Except for the rights expressly granted above, Neosoft Technologies is not acquiring any right, title or interest in or to the Customer Content, all of which shall remain solely with Customer.
           
           Neosoft Technologies's Acceptable Use Policy. Customer will abide by, and utilize the Services and the Customer Web site only in accordance with, the Acceptable Use Policy (the "Acceptable Use Policy") that Neosoft Technologies posts on its Web site, as such Acceptable Use Policy may be changed by Neosoft Technologies from time to time. The Acceptable Use Policy is hereby incorporated herein and made a part hereof by this reference. Customer shall impose the Acceptable Use Policy on its customers and End Users to the extent necessary to ensure their compliance. Customer shall familiarize itself with the Acceptable Use Policy and periodically access Neosoft Technologies's Web site to determine if Neosoft Technologies has made any changes thereto.
           </p>
           </div>
        </body>
     </html>
     `;
 };