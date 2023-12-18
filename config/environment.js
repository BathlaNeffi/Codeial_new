const development ={
    name:'development',
    assets_path: './assets',
    session_cookie_key:'blahsomething',
    db:'codeial_development',
    smtp: {
        service:'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: "neffybathla@gmail.com",
          pass: "ckpq pfrq bojk oatx",
            },
        },
    google_client_id:'888790478400-t7913f9ktrgors042g231g4flobjb2fv.apps.googleusercontent.com',
    google_client_secret: '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',
    google_callback_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret:'codeial',

};

const production= {
    name:'production',
    assets_path: process.env.CODEIAL_ASSETS_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db:process.env.CODEIAL_DB,
    smtp: {
        service:'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.CODEIAL_GMAIL_USER,
          pass: process.env.CODEIAL_GMAIL_PASSWORD,
            },
        },
    google_client_id:process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_callback_url: process.env.CODEIAL_GOOGLE_CALLBACK_URL,
    jwt_secret:process.env.CODEIAL_JWT_SECRET,

};

module.exports= eval(process.env.NODE_ENV) == undefined ? development :eval(process.env.CODEIAL_ENVIRONMENT);