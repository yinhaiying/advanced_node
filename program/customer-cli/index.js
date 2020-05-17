const mongoose  = require('mongoose');
// 引入model
const Customer = require('./models/customer');

// 连接数据库
const db = mongoose.connect('mongodb+srv://test:test123456@cluster0-3acyg.mongodb.net/test?retryWrites=true&w=majority',{
  useNewUrlParser: true,
  useUnifiedTopology: true
});



// 添加用户
const addCustomer = (customer) => {
  Customer.create(customer).then((data) => {
    console.info('新用户已添加...');
    mongoose.connection.close();
  })
}


// 查找用户
const findCustomer = (name) => {
  //不区分大小写
  const search = new RegExp(name,'i');
  Customer.find({
    $or:[{firstname:search},{lastname:search}]
  }).then((customer) => {
    console.info(customer);
    console.info(`${customer.length}个匹配`);
    mongoose.connection.close();
  })
}


// 更新用户信息
const updateCustomer = (_id,customer) => {
  Customer.update({_id},customer).then((customer) => {
    console.info('用户信息已经更新');
    mongoose.connection.close();
  })
}

// 删除用户
const removeCustomer = (_id) => {
  Customer.remove({_id}).then((customer) => {
    console.info('用户信息已经删除');
    mongoose.connection.close();
  })
}


// 获取用户列表

const listCustomer = () => {
  //不区分大小写
  Customer.find().then((customer) => {
    console.info(customer);
    console.info(`${customer.length}个用户`);
    mongoose.connection.close();
  })
}


module.exports = {
  addCustomer,
  findCustomer,
  updateCustomer,
  removeCustomer,
  listCustomer
}
