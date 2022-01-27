import React from 'react'
import {Card, Button} from 'react-bootstrap'
import { useToast } from "@chakra-ui/toast"
import { saveAs } from "file-saver";
import axios from 'axios'

function Footer() {
  const toast = useToast();


  const subscribe=()=>{
    toast({
        title: "Thank you for subscribing",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
  }

  const createAndDownloadPdf = () => {

    axios
      .post("/api/create-Termpdf")
      .then(() => axios.get("/api/fetch-Termpdf", { responseType: "blob" }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });

        saveAs(pdfBlob, "terms&conditions.pdf");
      });
  };
    return (
        <Card className="footerStyle mt-3" id="footer" >
            <div className="headingFooter">
                <h4 className="text-center">About Company</h4>
                <h4 className="text-center">Information</h4>
                <h4 className="text-start">Newsletter</h4>
            </div>
            <div className="contentFooter">
                <p>NeoStore is here for fast and efficient shopping services</p>
                <p><button onClick={createAndDownloadPdf}>Terms and conditions of the compnay and its quality products</button><br/>
                <a href="/locateUs"> Locate Us</a></p>
                <p>Signup to get exclusive offer on upcoming products<br/>
                <input type="text" placeholder="enter email" className="p-1 mb-2 text-dark"/>
                <button className="btn btn-sm btn-warning m-1" onClick={subscribe}>Subscribe</button>
                </p>
            </div>
        </Card>
        // <MapComp/>

    )
}

export default Footer
