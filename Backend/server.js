// // عملنا import  لل module  الي رح نستخدمها 
// // كلهم  تحيل مكتبات لانهم مش build in 
// require('dotenv').config();
// const express = require('express');
// const jwt = require('jsonwebtoken');// لعمل token  معتمده على athantaction 
// const cookieParser = require('cookie-parser')
// const bcrypt = require('bcrypt');  // حتى اعمل hashing password 
// const cors = require('cors');

// const PORT = 2700;
// const app = express();
// app.use(express.json());   //  عنا req+res   بنبعثو على شكل جيسون و البراوزير ما بفهم جيسون لهيك بنحول و بنعمل بارس 
// app.use(cookieParser()); // استخدام لالتقاط كوكيز من req
// // app.use(cors({ origin: '*' }));



// const corsOptions = {
//     origin: 'http://localhost:5175', // تأكد أن هذا هو الأصل الصحيح لتطبيق العميل
//     credentials: true, // للسماح بإرسال واستقبال الكوكيز
// };
// app.use(cors(corsOptions));

// const SECRET_KEY = "mysecretkey"; // يجب أن يكون ثابتًا ومخزنًا بشكل آمن


// const saltRounds=8;

// //هون بدنا نعمل كود (login , signup , register) +medelware  حتى نعمل athu    
// // لازم athu  نتاكد من (token user ) لما يعمل راوت لصفحة معينة  و يخزن في cookie















// let Users={};

// //   ابلش اعرف الروتير الي عندي لاعرف لما  ادخل البايانات صح او لاء اتاكد فقط  انو يطبع كل اليوزير الي دخلناهم

// app.get('/' , (req ,res)=>{
// res.json(Users);
// });




// //Register (hash m store)

// app.post('/register' , async(req ,res)=>{
//     //  هسا اجا طلب محمل بودي و الهيدير و كل اشي من لافرونت و بدي  اوخد منو الاسم و كلمة المرور من البودي الي 
//     const {username , password}=req.body;
//     if(Users[username]){
//         return res.status(400).json({message: 'User already exists'})
//     }
//     const hashedPassword = await bcrypt.hash(password ,  saltRounds);
//     Users[username ] ={username , password:hashedPassword};


//     // res.json({message:'User register successfully'})//  هاد جديد لازم اعمل جينيريت لل توكن 

//     //  هون لازم نعمل token  مهم
// const  token = jwt.sign({username}, SECRET_KEY , {expiresIn:'1h'});
//     // store  اعمل جينيريت للتوكين  من الي عبيتهم لاسم و سيكيور  
// res.cookie('authToken' , token, {httpOnly:true , secure:false , maxAge:360000});


// res.json({ message: 'User registered successfully', token });

// });














// //Login (generate JWT)  لازم تنعمل في SIGNUP 

// app.post('/login' ,async( req, res)=>{

//     const {username , password}=req.body;
//      const user=Users[username];

//      if(!user){
//         return res.status(400).json({message:'Not found '})
//      }

//      const isMatch = await bcrypt.compare (password , user.password);

//      if(!isMatch){
//         return res.status(400).json({message:'Incorrect password '})
//      }


//     //  //grnerate  هذه خطوات عمل  لل توكن و خزنها في cookies
//     // //  هون لازم نعمل token  مهم 
//     const  token = jwt.sign({username}, SECRET_KEY , {expiresIn:'1h'});
//     // store  اعمل جينيريت للتوكين  من الي عبيتهم لاسم و سيكيور  
//     res.cookie('authToken' , token, {httpOnly:true , secure:false , maxAge:360000});

//     res.json({message:'login succesful' , token})

// });




// //middelware jwt to protect routes veryfy token 
// //هون بتاكدلي انو من توكين لل يوزير 
// const authenticateToken = async(req , res , next)=>{
//     const token = req.cookies.authToken;

//     if(!token){
//         return res.status(401).json({message:'Access Denied .no token'});

//     }

//     jwt.verify(token ,SECRET_KEY , (error , user)=>{
//      if(error){
//         return res.status(403).json({message:'Expierd token'})
//      }

//      req.user=user;
//      next();
//     });
// };



// //    لما يرتسلني لهذا الراوتير تاكد من التوكين و بعدها دخلني عليه
//   // middelware  تقع بين  الريكويست و الريسبونز فهو قبل   ما يرسل الرد الريسبونز بكون ماررر على ميديل هي توكن  
// app.get('/protected', authenticateToken , (req , res)=>{   

//     res.json({message :`welcome ${req.user.username} you access protected data`})
// });




// //Logout
// app.post('/logout' , (req ,  res)=>{
//     res.clearCookie('authToken');
//     res.json({message:'Logout successfully'})
// })











// app.listen(PORT, () =>
//     console.log(` Server running on http://localhost:${PORT}`)
// );





require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken'); // لإنشاء التوكن
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt'); // لتشفير كلمة المرور
const cors = require('cors');

const PORT = 2700;
const app = express();

// إعدادات البارسين وتحويل الطلبات إلى JSON
app.use(express.json());
app.use(cookieParser());

// إعدادات CORS لتتوافق مع جانب العميل
const corsOptions = {
  origin: 'http://localhost:5175', // تأكد أن هذا هو أصل تطبيق العميل
  credentials: true, // للسماح بإرسال واستقبال الكوكيز
};
app.use(cors(corsOptions));

// المفتاح السري لتوقيع JWT (يجب تخزينه بشكل آمن)
const SECRET_KEY = "mysecretkey";
const saltRounds = 8;

// تخزين المستخدمين في الذاكرة (للأغراض التجريبية فقط)
let Users = {};

// مسار بسيط لعرض جميع المستخدمين (للتحقق)
app.get('/', (req, res) => {
  res.json(Users);
});

// تسجيل مستخدم جديد
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (Users[username]) {
    return res.status(400).json({ message: 'User already exists' });
  }
  
  // تشفير كلمة المرور قبل التخزين
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  Users[username] = { username, password: hashedPassword };

  // إنشاء توكن JWT مع صلاحية لمدة ساعة
  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
  // تخزين التوكن في الكوكيز
  res.cookie('authToken', token, { httpOnly: true, secure: false, maxAge: 3600000 });
  
  res.json({ message: 'User registered successfully', token });
});

// تسجيل الدخول وإنشاء توكن JWT
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = Users[username];

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Incorrect password' });
  }

  // إنشاء توكن JWT جديد عند تسجيل الدخول
  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
  res.cookie('authToken', token, { httpOnly: true, secure: false, maxAge: 3600000 });
  
  res.json({ message: 'Login successful', token });
});

// middleware للتحقق من صلاحية التوكن
const authenticateToken = (req, res, next) => {
  const token = req.cookies.authToken;
  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No token provided' });
  }
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// مسار الصفحة الشخصية (Profile) محمي بواسطة الـ middleware
app.get('/profile', authenticateToken, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}, this is your profile page.` });
});

// تسجيل الخروج: إزالة التوكن من الكوكيز
app.post('/logout', (req, res) => {
  res.clearCookie('authToken');
  res.json({ message: 'Logout successful' });
});

// بدء الخادم على المنفذ المحدد
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
