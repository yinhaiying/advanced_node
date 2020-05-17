#!/usr/bin/env node

// 命令行
const program = require('commander');
const {
  addCustomer,
  findCustomer,
  updateCustomer,
  removeCustomer,
  listCustomer
} = require('./index');

const inquirer = require('inquirer');
const addQuery = [
  {
    type:'input',
    name:'firstname',
    message:'请输入firstname'
  },
  {
    type:'input',
    name:'lastname',
    message:'请输入lastname'
  },
  {
    type:'input',
    name:'phone',
    message:'请输入phone'
  },
  {
    type:'input',
    name:'email',
    message:'请输入email'
  },
]


// 配置版本和描述信息
program
  .version('1.0.0')
  .description('自定义命令行工具')

// 配置添加用户的命令
// program
//   .command('add <firstname> <lastname> <phone> <email>')
//   .alias('a')
//   .description('添加新用户')
//   .action((firstname,lastname,phone,email) => {
//     addCustomer({firstname,lastname,phone,email})
//   })

// 使用inquirer实现命令行交互
program
  .command('add')
  .alias('a')
  .description('添加新用户')
  .action(() => {
    inquirer.prompt(addQuery).then((answers) => {
      addCustomer(answers)
    })
  })





// 查找用户命令
program
  .command('find <name>')
  .alias('f')
  .description('查找用户')
  .action((name) => {
    findCustomer(name)
  })
// 删除用户命令
program
  .command('remove <_id>')
  .alias('r')
  .description('删除用户')
  .action((_id) => {
    removeCustomer(_id);
  })

// 更新用户命令
program
  .command('update <_id>')
  .alias('u')
  .description('更新用户')
  .action((_id) => {
    inquirer.prompt(addQuery).then((answers) => {
      console.log(_id);
      updateCustomer(_id,answers)
    })
  })

// 获取所有用户命令
program
.command('list')
.alias('l')
.description('获取所有用户')
.action(() => {
  listCustomer();
})














// 测试命令
program.parse(process.argv);
