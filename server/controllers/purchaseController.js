const e = require("express");
//const { now }  = require("sequelize/types/utils");
const purchaseDal = require("../dal/purchase-DB-acssessor");
class PurchasesController {
    getAllPurchases = async (req, res) => {

        const purchases = await purchaseDal.getAllPurchases();
        if (!purchases?.length) {
            return res.status(400).json({ message: 'No purchases found' })

        }
        res.json(purchases + purchases.purchaseId)
    }
    getAllPurchasesByUserId = async (req, res) => {
        const purchases = await purchaseDal.getPurchasesByUserId(req.params.id);
        if (!purchases?.length) {
            return res.status(400).json({ message: 'No purchase found' })
        }
        res.json(purchases)
    }

    createNewPurchase = async (req, res) => {
        console.log("asfgafdjjklfuydl");
        // console.log(userId, numEnters, type, startDate);
        const { userId, numEnters, type } = req.body
        console.log(userId, numEnters, type);
        if (!userId || !numEnters || !type)
            return res.status(400).json({ message: 'All fields are required' })
        const date = new Date();
        //const startDate = date.getFullYear();
        //let data={year:2022,week:"40",day:"01"}
        
        console.log("fdsafdag "+date);
        const purchase = await purchaseDal.createNewPurchase(userId, type, numEnters, date)

        if (purchase)
            return res.status(400).json({ message: 'Invalid purchase data received' })
        return res.status(201).json({ message: 'New purchase created' })
    }

    updateNumEnterById = async (req, res) => {
        const { userId, numEnters } = req.body
        // Confirm data
        if (!userId || !numEnters)
            return res.status(400).json({ message: 'All fields are required' })

        const purchases = await purchaseDal.getPurchasesByUserId(userId);
        if (!purchases?.length) {
            return res.status(400).json({ message: 'No purchase found' })
        }
        else {
            purchases.forEach(e => {
                const validTermAndNum = 0;
                //?????? ???????????? ????????????
                //now1 = Date.now();
                if (e.type == 1) {
                    // if() chat gpt
                    if (e.numEnters > 1) {
                        validTermAndNum = 1;
                    }
                }
                else if (e.type == 2) {
                }
                if (validTermAndNum) {
                    const p = purchaseDal.updateNumEnterById(numEnters, e.purchaseId)
                    if (p) {
                        return res.status(201).json({ message: 'enter success' })
                    }
                }
            });
            return res.status(400).json({ message: 'unsuccess enter' })
        }
    }
}

const purchasesController = new PurchasesController();
module.exports = purchasesController;

