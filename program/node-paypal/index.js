const express = require('express');
const ejs = require('ejs');
const paypal = require('paypal-rest-sdk');

// 配置paypal
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AebAA_s8OkLguoUV1do6GpZMUZPVB1Uw1BZtFEJJuSgG69OEvZVk98Dd40Vl9qW_MIqzOIASF5sgNCIE',
    'client_secret': 'EJdRkn1lueT6xp5GjyDIp1V_ugniEbK8efns1yax5Bu_TjUV0cHRN6gYh5gvNgTH2MNWXHS1f3wdkVQw'
});

const app = express();

app.set('view engine','ejs');
app.use(express.static('./public'));


app.get('/',(req,res) => {
    res.render('index');
})


app.post('/pay',(req,res) => {
    // 创建商品信息
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        //确定和取消交易后的跳转链接
        "redirect_urls": {
            "return_url": "http://localhost:8082/success",
            "cancel_url": "http://localhost:8082/cancel"
        },
        // 商品信息
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "衣服",
                    "sku": "001",
                    "price": "58",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "58"
            },
            "description": "买一件衣服"
        }]
    };

    // 创建支付
    paypal.payment.create(create_payment_json,(error,payment) => {
      if(error){
          throw error;
      }else{
          // 获取approval_url
          for(let i = 0;i < payment.links.length;i++){
              if(payment.links[i].rel === 'approval_url'){
                  //跳转到允许付款的链接
                  res.redirect(payment.links[i].href);

              }
          }
      }
    })
})


// 支付成功之后，进行扣费
app.get('/success',(req,res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  // 创建付款对象
  const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": "58.00"
            }
        }]
   };
   //实现付费
   paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log("交易成功");
            console.log(JSON.stringify(payment));
        }
    });
})


// 取消交易
app.get('/cancel',(req,res) => {
    res.send('交易取消');
})

app.listen(8082,() => {
    console.log('服务器运行在8082端口');
})