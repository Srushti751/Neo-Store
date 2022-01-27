import React from 'react'
import {Card, Button} from 'react-bootstrap'
import { useToast } from "@chakra-ui/toast"
import { saveAs } from "file-saver";
import axios from 'axios'

function FooterOther() {
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
        <Card className="footerStyle " id="footerother" >
          
            <div className="contentFooter">
                <p>Copyrights &copy; Neostore 2022.All rights reserved</p>
               
            </div>
        </Card>
        // <MapComp/>

    )
}

export default FooterOther
