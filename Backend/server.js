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




// // عملنا import  لل module  الي رح نستخدمها 
// // كلهم  تحيل مكتبات لانهم مش build in 
require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken'); // لتوليد التوكن JWT
const cookieParser = require('cookie-parser'); // لمعالجة الكوكيز
const bcrypt = require('bcrypt'); // لتشفير كلمات المرور
const cors = require('cors');

const app = express();
const PORT = 2795;
const SECRET_KEY = "mysecretkey"; // يجب تخزينه بشكل آمن
const saltRounds = 8;

// إعدادات CORS للسماح بتبادل البيانات مع الفرونتند
const corsOptions = {
    origin: 'http://localhost:5175',
    credentials: true, // للسماح بإرسال واستقبال الكوكيز
};
app.use(cors(corsOptions));

// استخدام ميدل وير لتحليل JSON والكوكيز
app.use(express.json());
app.use(cookieParser());











// //هون بدنا نعمل كود (login , signup , register) +medelware  حتى نعمل athu    
// // لازم athu  نتاكد من (token user ) لما يعمل راوت لصفحة معينة  و يخزن في cookie
// قاعدة بيانات وهمية للمستخدمين
let Users = {};

// عرض جميع المستخدمين (لأغراض الاختبار فقط)
// //   ابلش اعرف الروتير الي عندي لاعرف لما  ادخل البايانات صح او لاء اتاكد فقط  انو يطبع كل اليوزير الي دخلناهم

app.get('/', (req, res) => {
    res.json(Users);
});


// تسجيل مستخدم جديد مع تخزين كلمة المرور المشفرة
app.post('/register', async (req, res) => {
 //  هسا اجا طلب محمل بودي و الهيدير و كل اشي من لافرونت و بدي  اوخد منو الاسم و كلمة المرور من البودي الي 

    const { username, password } = req.body;


    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    
    if (Users[username]) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    Users[username] = { username, password: hashedPassword };

    // إنشاء توكن JWT وتخزينه في الكوكيز
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.cookie('authToken', token, { httpOnly: true, secure: false, maxAge: 3600000 });

    res.json({ message: 'User registered successfully', token });
});


// تسجيل الدخول والتحقق من كلمة المرور
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

    // إنشاء توكن JWT وتخزينه في الكوكيز
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
       // store  اعمل جينيريت للتوكين  من الي عبيتهم لاسم و سيكيور  

    res.cookie('authToken', token, { httpOnly: true, secure: false, maxAge: 3600000 });

    res.json({ message: 'Login successful', token });
});


// ميدل وير للتحقق من صحة التوكن
// //middelware jwt to protect routes veryfy token 
// //هون بتاكدلي انو من توكين لل يوزير 
const authenticateToken = (req, res, next) => {
    const token = req.cookies.authToken;

    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided' });
    }

    jwt.verify(token, SECRET_KEY, (error, user) => {
        if (error) {
            return res.status(403).json({ message: 'Expired or invalid token' });
        }
        req.user = user;
        next();
    });
};


// راوت محمي يحتاج إلى توكن للوصول إليه
// //    لما يرتسلني لهذا الراوتير تاكد من التوكين و بعدها دخلني عليه
 // middelware  تقع بين  الريكويست و الريسبونز فهو قبل   ما يرسل الرد الريسبونز بكون ماررر على ميديل هي توكن  
app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: `Welcome ${req.user.username}, you have access to protected data` });
});

// تسجيل الخروج بحذف الكوكيز
app.post('/logout', (req, res) => {
    res.clearCookie('authToken');
    res.json({ message: 'Logout successful' });
});

// تشغيل السيرفر
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
