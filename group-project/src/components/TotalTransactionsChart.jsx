import { useNavigate,Link,Outlet } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import {Chart as ChartJS} from 'chart.js/auto'
import {Doughnut} from 'react-chartjs-2'

export default function TotalTransactionsChart(){

    const [transactions, setTransactions] = useState([{name: "", description: "", amount: 0, currency: ""}]);
    const [totalTransactions, setTotalTransactions] = useState([]);
    const [rmb, setRMB] = useState();
    const [gbp, setGBP] = useState();
    const [mxn, setMXN] = useState();
    const [cad, setCAD] = useState();
    const [eur, setEUR] = useState();
    const [jpy, setJPY] = useState();
    const [usd, setUSD] = useState();

    useEffect(()=>{
        const fetchTransactions = async ()=>{
            try{
                await fetch("http://localhost:8080/transactions/getAll", {
                   headers:{"Content-Type":"application/json",
                   Authorization: 'Bearer ' + localStorage.getItem('token')},
                   }).then(res=>res.json()).then((result)=>{setTransactions(result);})
            }
            catch(errors){
                console.log(errors);
            }
        }
            fetchTransactions();
            //console.log(transactions);

           let tempArr = [];
           let finalArr = []

           //Sum of all AUD
           const reduceAUD = transactions.reduce((acc,nextAUD)=>
           {
               if(nextAUD.currency==="AUD"){return acc + nextAUD.amount}
               return acc;
           },0)

           tempArr.push({currency: 'AUD', amount: reduceAUD});

           //Sum of all BGN
           const reduceBGN = transactions.reduce((acc,nextBGN)=>
           {
               if(nextBGN.currency==="BGN"){return acc + nextBGN.amount}
               return acc;
           },0)

           tempArr.push({currency: 'BGN', amount: reduceBGN});

           //Sum of all BRL
           const reduceBRL = transactions.reduce((acc,nextBRL)=>
           {
               if(nextBRL.currency==="BRL"){return acc + nextBRL.amount}
               return acc;
           },0)

           tempArr.push({currency: 'BRL', amount: reduceBRL});

           //Sum of all CAD
           const reduceCAD = transactions.reduce((acc,nextCAD)=>
           {
               if(nextCAD.currency==="CAD"){return acc + nextCAD.amount}
               return acc;
           },0)
          // console.log(reduceCAD);
           tempArr.push({currency: 'CAD', amount: reduceCAD});

           //Sum of all CHF
           const reduceCHF = transactions.reduce((acc,nextCHF)=>
           {
               if(nextCHF.currency==="CHF"){return acc + nextCHF.amount}
               return acc;
           },0)

           tempArr.push({currency: 'CHF', amount: reduceCHF});

           //Sum of all CNY
           const reduceCNY = transactions.reduce((acc,nextCNY)=>
           {
               if(nextCNY.currency==="CNY"){return acc + nextCNY.amount}
               return acc;
           },0)

           tempArr.push({currency: 'CNY', amount: reduceCNY});

           //Sum of all CZK
           const reduceCZK = transactions.reduce((acc,nextCZK)=>
           {
               if(nextCZK.currency==="CZK"){return acc + nextCZK.amount}
               return acc;
           },0)

           tempArr.push({currency: 'CZK', amount: reduceCZK});

           //Sum of all DKK
           const reduceDKK = transactions.reduce((acc,nextDKK)=>
           {
               if(nextDKK.currency==="DKK"){return acc + nextDKK.amount}
               return acc;
           },0)

           tempArr.push({currency: 'DKK', amount: reduceDKK});

           //Sum of all EUR
           const reduceEUR = transactions.reduce((acc,nextEUR)=>
           {
               if(nextEUR.currency==="EUR"){return acc + nextEUR.amount}
               return acc;
           },0)
          // console.log(reduceEUR);
           tempArr.push({currency: 'EUR', amount: reduceEUR});

           //Sum of all GBP
           const reduceGBP = transactions.reduce((acc,nextGBP)=>
           {
               if(nextGBP.currency==="GBP"){return acc + nextGBP.amount}
               return acc;
           },0)
          // console.log(reduceGBP);
           tempArr.push({currency: 'GBP', amount: reduceGBP});

           //Sum of all HKD
           const reduceHKD = transactions.reduce((acc,nextHKD)=>
           {
               if(nextHKD.currency==="HKD"){return acc + nextHKD.amount}
               return acc;
           },0)

           tempArr.push({currency: 'HKD', amount: reduceHKD});

           //Sum of all HUF
           const reduceHUF = transactions.reduce((acc,nextHUF)=>
           {
               if(nextHUF.currency==="HUF"){return acc + nextHUF.amount}
               return acc;
           },0)

           tempArr.push({currency: 'HUF', amount: reduceHUF});

           //Sum of all IDR
           const reduceIDR = transactions.reduce((acc,nextIDR)=>
           {
               if(nextIDR.currency==="IDR"){return acc + nextIDR.amount}
               return acc;
           },0)

           tempArr.push({currency: 'IDR', amount: reduceIDR});

           //Sum of all ILS
           const reduceILS = transactions.reduce((acc,nextILS)=>
           {
               if(nextILS.currency==="ILS"){return acc + nextILS.amount}
               return acc;
           },0)

           tempArr.push({currency: 'ILS', amount: reduceILS});

           //Sum of all INR
           const reduceINR = transactions.reduce((acc,nextINR)=>
           {
               if(nextINR.currency==="INR"){return acc + nextINR.amount}
               return acc;
           },0)

           tempArr.push({currency: 'INR', amount: reduceINR});

           //Sum of all ISK
           const reduceISK = transactions.reduce((acc,nextISK)=>
           {
               if(nextISK.currency==="ISK"){return acc + nextISK.amount}
               return acc;
           },0)

           tempArr.push({currency: 'ISK', amount: reduceISK});

           //Sum of all JPY
           const reduceJPY = transactions.reduce((acc,nextJPY)=>
           {
               if(nextJPY.currency==="JPY"){return acc + nextJPY.amount}
               return acc;
           },0)

           tempArr.push({currency: 'JPY', amount: reduceJPY});

           //Sum of all KRW
           const reduceKRW = transactions.reduce((acc,nextKRW)=>
           {
               if(nextKRW.currency==="KRW"){return acc + nextKRW.amount}
               return acc;
           },0)

           tempArr.push({currency: 'KRW', amount: reduceKRW});

          //Sum of all MXN
          const reduceMXN = transactions.reduce((acc,nextMXN)=>
          {
              if(nextMXN.currency==="MXN"){return acc + nextMXN.amount}
              return acc;
          },0)
         // console.log(reduceMXN);
          tempArr.push({currency: 'MXN', amount: reduceMXN});

//           //Sum of all MYR
          const reduceMYR = transactions.reduce((acc,nextMYR)=>
          {
              if(nextMYR.currency==="MYR"){return acc + nextMYR.amount}
              return acc;
          },0)

          tempArr.push({currency: 'MYR', amount: reduceMYR});

//          //Sum of all NOK
         const reduceNOK = transactions.reduce((acc,nextNOK)=>
         {
             if(nextNOK.currency==="NOK"){return acc + nextNOK.amount}
             return acc;
         },0)

         tempArr.push({currency: 'NOK', amount: reduceNOK});

//         //Sum of all NZD
        const reduceNZD = transactions.reduce((acc,nextNZD)=>
        {
            if(nextNZD.currency==="NZD"){return acc + nextNZD.amount}
            return acc;
        },0)

        tempArr.push({currency: 'NZD', amount: reduceNZD});

//        //Sum of all PHP
       const reducePHP = transactions.reduce((acc,nextPHP)=>
       {
           if(nextPHP.currency==="PHP"){return acc + nextPHP.amount}
           return acc;
       },0)

       tempArr.push({currency: 'PHP', amount: reducePHP});

      //Sum of all PLN
      const reducePLN = transactions.reduce((acc,nextPLN)=>
      {
          if(nextPLN.currency==="PLN"){return acc + nextPLN.amount}
          return acc;
      },0)

      tempArr.push({currency: 'PLN', amount: reducePLN});

     //Sum of all RON
     const reduceRON = transactions.reduce((acc,nextRON)=>
     {
         if(nextRON.currency==="RON"){return acc + nextRON.amount}
         return acc;
     },0)

     tempArr.push({currency: 'RON', amount: reduceRON});

    //Sum of all SEK
    const reduceSEK = transactions.reduce((acc,nextSEK)=>
    {
        if(nextSEK.currency==="SEK"){return acc + nextSEK.amount}
        return acc;
    },0)

    tempArr.push({currency: 'SEK', amount: reduceSEK});

   //Sum of all SGD
   const reduceSGD = transactions.reduce((acc,nextSGD)=>
   {
       if(nextSGD.currency==="SGD"){return acc + nextSGD.amount}
       return acc;
   },0)

   tempArr.push({currency: 'SGD', amount: reduceSGD});

  //Sum of all THB
  const reduceTHB = transactions.reduce((acc,nextTHB)=>
  {
      if(nextTHB.currency==="THB"){return acc + nextTHB.amount}
      return acc;
  },0)

  tempArr.push({currency: 'THB', amount: reduceTHB});

 //Sum of all TRY
 const reduceTRY = transactions.reduce((acc,nextTRY)=>
 {
     if(nextTRY.currency==="TRY"){return acc + nextTRY.amount}
     return acc;
 },0)

 tempArr.push({currency: 'TRY', amount: reduceTRY});

           //Sum of all USD
           const reduceUSD = transactions.reduce((acc,nextUSD)=>
           {
               if(nextUSD.currency==="USD"){return acc + nextUSD.amount}
               return acc;
           },0)

           tempArr.push({currency: 'USD', amount: reduceUSD});
           //console.log(usd);

           //Sum of all ZAR
           const reduceZAR = transactions.reduce((acc,nextZAR)=>
           {
               if(nextZAR.currency==="ZAR"){return acc + nextZAR.amount}
               return acc;
           },0)

           tempArr.push({currency: 'ZAR', amount: reduceZAR});


           tempArr.map((data)=>{
               if(data.amount === 0){return}
               else{finalArr.push(data)}
           })
           console.log(finalArr)
           setTotalTransactions(finalArr);

    },[transactions])



//         console.log(rmb);
//         console.log(gbp);
//         console.log(mxn);
//         console.log(cad);
//         console.log(eur);
//         console.log(jpy);
//         console.log(usd);
        console.log(totalTransactions);
//         const reduceRMB = transactions.reduce((acc,nextRMB)=>
//         {
//             if(nextRMB.currency==="RMB"){return acc + nextRMB.amount}
//             return acc;
//         },0)
//         console.log(reduceRMB);
//         setRMB("RMB", {reduceRMB});

    return(
    <>
    <h2>hello</h2>
        <Doughnut
            data={{
              labels: totalTransactions.map((data)=> data.currency),
              datasets:[
                {
                    label: "Amount",
                    data: totalTransactions.map((data)=> data.amount),
                    backgroundColor:[
                        "rgba(43, 63, 229, 0.8)",
                        "rgba(250, 192, 19, 0.8)",
                        "rgba(253, 135, 135, 0.8)",
                    ]

                }
              ]
            }}
        />
        </>
    )
}
