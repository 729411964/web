const inquirer = require("inquirer");
const chalk = require('chalk');
const fn = {};
const path = require("path");
const _package = require('../package');
const Metalsmith = require('metalsmith');
const async = require('async');
const render = require('consolidate').handlebars.render;
let pageData = {};
fn.init = function () {
    var questions = [
        {
            type: 'input',
            name: 'projectName',
            message: "please input the projectName",
            default: function() {
                return path.basename(process.cwd());
            }
        },
        {
            type: 'input',
            name: 'author',
            message: "please input the author",
            validate: function(value) {
                if(!value){
                    return 'Please enter the author';
                }
               return true;

            }
        },
        {
            type: 'input',
            name: 'description',
            message: "please input the description"
        },
        {
            type: 'list',
            name: 'template',
            message: 'choose the template',
            choices: [
                'template1'
            ],
            filter: function(val) {
                return val.toLowerCase();
            }
        },
        {
            type: 'list',
            name: 'gulu',
            message: '喜欢咕噜吗？',
            choices: [
                chalk.hex('#de98ed')('yes'),
                chalk.hex('#df87ed')('very yes'),
                chalk.hex('#e45ded')('very very yes'),
                chalk.hex('#e028ed')('very very very yes'),
                chalk.hex('#313535')('no')
            ],
            filter: function(val) {
                return val.toLowerCase();
            }
        }
    ];
    inquirer.prompt(questions).then(answers => {
        pageData = answers;
        fn.createDirectory(answers);
    });
};
fn.createDirectory = function (answers) {
    Metalsmith(__dirname)
        .source(`../template/${answers.template || "template1"}`)
        .destination(process.cwd())
        .use(fn.render)
        .build(function(err) {
            if (err) throw err;
            console.log("写入文件了");
        });
};
fn.render = function (files, metalsmith, done) {
    var fileName = Object.keys(files);

    async.each(fileName, run, done);

    function run(fileName, done){
        var extName = path.extname(fileName);
        if(extName.match(/\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/)) {
            //图片格式的文件  不需要进行模板渲染
            done();
        }else{
            var str = files[fileName].contents.toString();
            render(str, pageData, function(err, res){
                if (err) return done(err);
                files[fileName].contents = new Buffer(res);
                done();
            });
        }

    }
}
module.exports = obj =>{
    fn.init();
}