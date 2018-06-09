var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
 
  res.render('account/indexx.pug');
});

router.post('/login', function(req, res, next) {
    var db=req.db;
    var accountTable=db.get('user');
   
    accountTable.findOne({$or:[{quyen:'nguoidung'}],username:req.body.username,password:req.body.password},{},
      function(errors,user){
      if(user != null )
        {
              req.session.username = req.body.username;
              res.render('account/welcom.pug');
        }
        
      });
      accountTable.findOne({$or:[{quyen:'admin'}],username:req.body.username,password:req.body.password},{},
      function(errors,admin){
      if(admin != null )
        {
              req.session.username = req.body.username;
              res.render('account/admin.pug');
        }

        else{
          var data= { msg :'Invalid Account' }
          res.render('account/indexx.pug',data);

        }
      
      });
    
    
});

router.get('/signup', function(req, res, next) {
 
  res.render('account/signup.pug');
});
router.post('/signup', function(req, res, next) {
 
     var db=req.db;
    var accountTable=db.get('user');
    var account={
      username:req.body.username,
      password:req.body.password,
      hoten:req.body.hoten,
      diachi:req.body.diachi,
      quyen:"nguoidung"

    };
    
    accountTable.insert(account,function(errors,result){
     
      var data= { msg :'Success' }
      res.render('account/signup.pug',data);

    });
   
   

  
});
router.get('/admin', function(req, res, next) {
 
  res.render('account/admin.pug');
});
router.post('/admin', function(req, res, next) {
 
      var db=req.db;
      var accountTable=db.get('test');
      var sanpham={
      tensp:req.body.tensp,
      dacta:req.body.dacta,
      hinhanh:req.body.file

    };
    
    accountTable.insert(sanpham,function(errors,result){
     
      var data= { msg :'Success' }
      res.render('account/admin.pug',data);

    });
   
   

  
});


module.exports = router;
