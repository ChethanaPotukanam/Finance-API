import { Request, Response } from "express";
import { excelUtils } from "../utils/excelUtils";
import feeServices from "../services/fee-service";
const feeController = {
  async uploadStudentFee(req: Request, res: Response) {
    try {
      let items: any[] = [];
      if (req.file) {
        const filePath = req.file.path;
        const response = await excelUtils.parseStudentFee(filePath);
        console.log(response)
        for (const item of response) {
          try {
            let ID=""
            if(item.ID)
              ID=item.ID
            const response = await feeServices.uploadStudentTutionFee(ID,item);
            items.push(response);
          } catch (error) {
            throw error;
          }
        }
        res.status(200).send(items);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  async uploadStudentHostelFee(req: Request, res: Response) {
    try {
      let items: any[] = [];
      if (req.file) {
        const filePath = req.file.path;
        const response = await excelUtils.parseStudentHostelFee(filePath);
        
        for (const item of response) {
          try {
            let ID=""
            if(item.ID)
              ID=item.ID
            const response = await feeServices.uploadStudentHostelFee(ID,item);
            items.push(response);
          } catch (error) {
            throw error;
          }
        }
        res.status(200).send(items);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  async uploadStudentSch(req: Request, res: Response) {
    try {
      let items: any[] = [];
      if (req.file) {
        const filePath = req.file.path;
        const response = await excelUtils.parseStudentSch(filePath);
        for (const item of response) {
          try {
              let ID=""
              if(item.ID)
                ID=item.ID
            const response = await feeServices.uploadStudentSch(ID,item);
            items.push(response);
          } catch (error) {
            throw error;
          }
        }
        // res.status(200).send(response);
        res.status(200).send({ message: "Succesfully uploaded data" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  
  async uploadStudentLoanData(req: Request, res: Response) {
    try {
      let items: any[] = [];
      if (req.file) {
        const filePath = req.file.path;
        const response = await excelUtils.parseStudentLoan(filePath);
        // console.log(response);
        const array = excelUtils.findDuplicateIds(response);

        if(array.length==0)
        {
          for (const item of response) {
            try {
              let ID=""
              if(item.ID)
                ID=item.ID
              // console.log("in controller: ", item);
              const response = await feeServices.uploadStudentLoan(ID,item);
              items.push(response);
            } catch (error) {
              throw error;
            }
          }
          // res.status(200).send(response);
          res.status(200).send({ message: "Succesfully uploaded data" });
        }
        else
        {
          res
          .status(500)
          .send({
            message:
              "Contains Duplicates Remove those in excel. They are " + array,
          });
        }
        
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};

export default feeController;
