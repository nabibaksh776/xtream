const { hash } = require("bcrypt");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// all Modals
const {
  Users,
  Bot_creator,
  Integration,
  UserVerification,
  UserBusiness,
  UserVoice,
  UserFiles,
} = require("../associations/UsersRelations");
const { smtpConfig } = require("../config/email");
const nodemailer = require("nodemailer");
const ReactDOMServer = require("react-dom/server");
const EmailTemplate = require("../config/template");
const path = require("path");
const fs = require("fs");

const uuidv4 = require("uuid").v4;
// midlewear here
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

const generateVerificationCode = () => {
  // return Math.floor(10000 + Math.random() * 90000) // Generates a number between 10000 and 99999
  return Math.floor(100000 + Math.random() * 900000); // every time generate out put with 6 random numbers
};

const createUser = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password) {
      return res.status(403).json({ message: "Please enter all fields" });
    } else {
      const hashedPassword = await hash(password, 10);

      const user = await Users.findOne({ where: { email } });
      if (user) {
        return res.status(403).json({ message: "email already exist" });
      }

      // Generate a random 5-digit verification code
      const newUser = await Users.create({
        name: username,
        email: email,
        password: hashedPassword,
      });

      await newUser.save();
      return res.status(200).json({ message: "user registered successfully" });
    }
  } catch (error) {
    console.log("err: ", error);
    res.status(403).json({ error });
  }
};

const userVerificationCode = async (req, res) => {
  const { email, code } = req.body;

  try {
    const user = await Users.findOne({
      where: { email },
      include: [UserVerification],
    });
    console.log(
      "🚀 ~ userVerificationCode ~ user:",
      user.UserVerification.verificationCode
    );

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check if the code matches
    if (user?.UserVerification.verificationCode != code) {
      return res.status(400).json({ message: "Invalid verification code" });
    }

    // Check if the code is expired (older than 2 minutes)
    const currentTime = new Date();
    const codeCreationTime = user.UserVerification.verificationCodeCreatedAt;
    const twoMinutesInMillis = 2 * 60 * 1000; // 2 minutes

    console.log(
      "🚀 ~ userVerificationCode ~ currentTime:",
      currentTime - codeCreationTime
    );
    console.log(
      "🚀 ~ userVerificationCode ~ codeCreationTime > twoMinutesInMillis:",
      twoMinutesInMillis
    );
    if (currentTime - codeCreationTime > twoMinutesInMillis) {
      return res.status(400).json({ message: "Verification code expired" });
    }

    await user.UserVerification.update({
      isVerified: true,
      verificationCode: null,
      verificationCodeCreatedAt: null,
    });

    return res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error verifying code", error });
  }
};

const userVerificationCodeResend = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await Users.findOne({
      where: { email },
      include: [UserVerification],
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check if the code has expired
    const currentTime = new Date();
    const codeCreationTime = user.UserVerification.verificationCodeCreatedAt;
    const twoMinutesInMillis = 2 * 60 * 1000; // 2 minutes

    // If the code has expired or doesn't exist, generate a new one
    if (
      !codeCreationTime ||
      currentTime - codeCreationTime > twoMinutesInMillis
    ) {
      // Generate a new 5-digit verification code
      const newVerificationCode = generateVerificationCode();
      const newCodeCreationTime = new Date();

      // Update the user's verification code and timestamp
      await user.UserVerification.update({
        verificationCode: newVerificationCode,
        verificationCodeCreatedAt: newCodeCreationTime,
      });

      // Send the new verification code via email
      // Set up Nodemailer transporter
      const transporter = nodemailer.createTransport(smtpConfig);
      // Render email template to HTML
      const emailHtml = ReactDOMServer.renderToStaticMarkup(
        <EmailTemplate
          userEmail={email}
          verificationCode={user.UserVerification.verificationCode}
        />
      );

      // Define email options
      const mailOptions = {
        // from: `"Teem.ai" <${smtpConfig.auth.user}>`,
        from: `"Teem.ai" <${smtpConfig.auth.user}>`,
        to: email,
        subject: "Teem.ai Email Verification Code",
        html: emailHtml,
      };

      // Send the email
      const info = await transporter.sendMail(mailOptions);

      return res.status(200).json({
        message: "A new verification code has been sent to your email.",
      });
    } else {
      return res.status(400).json({
        message:
          "Your verification code is still valid. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

// function to save providers in database
async function saveProvidersToDB(providers, user_id) {
  try {
    for (var x = 0; x < providers.length; x++) {
      if (providers[x].token != null) {
        const newProvider = await Integration.create({
          user_id: user_id,
          provider: providers[x].provider,
          token: providers[x].token,
        });
        await newProvider.save();
      }
    }
  } catch (err) {
    console.log("err in saveProvidersToDB---", err);
  }
}

// function to LoginUser
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("email is ", email);
    console.log("password is ", password);
    // Check if the user exists and their status
    const user = await Users.findOne({
      where: { email },
    });

    if (!user) {
      return res
        .status(400)
        .json({ status: false, message: "Email or password incorrect!" });
    }
    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ status: false, message: "Email or password incorrect!" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, "jwt_secret_key", {
      expiresIn: "1h",
    });

    // Send token in a cookie
    // res.cookie("access_token", token, {
    //   expires: new Date(Date.now() + 3600000), // 1 hour
    //   httpOnly: true,
    //   sameSite: "none",
    //   secure: true,
    // });

    // Return user info (excluding password)
    const { password: _, ...userInfo } = user.toJSON();
    delete userInfo.password;
    res.status(200).json({
      status: true,
      message: "User login successfully",
      token,
      user: { ...userInfo },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.query;

    console.log("🚀 ~ getUserById ~ id:", id);
    const user = await Users.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User fetched successfully", user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.body;

    console.log("🚀 ~ getUserByEmail ~ id:", email);
    const user = await Users.findOne({
      where: { email: email },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let currentUser = user.toJSON();
    delete currentUser.password
    res.status(200).json({ message: "User fetched successfully", user : currentUser});
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const userVerify = async (req, res) => {
  try {
    const { email } = req.body;

    console.log("🚀 ~ userVerify ~ id:", email);
    const user = await Users.findOne({
      where: { email: email },
      include: [UserVerification],
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user?.UserVerification?.isVerified == false) {
      return res.status(404).json({ error: "User email is not verified" });
    }

    res.status(200).json({ message: "User is verified", user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: error });
  }
};

const userOnBoarding = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    // console.log('Uploaded Files:', req.files)
    const {
      user_email,
      businessEmail,
      businessNiche,
      businessPhone,
      description,
      email,
      gender,
      language_value,
      password,
      phoneNumber1,
      phoneNumber2,
      targetAudience,
      tone,
      url,
      voice,
      token,
      avatar_img,
    } = req.body;

    const companyFiles = req.files["company_data_files[]"];
    console.log("🚀 ~ userOnBoarding ~ company_data_files:", companyFiles);
    // console.log('🚀 ~ userOnBoarding ~ req.files:', req.files)

    console.log("🚀 ~ userOnBoarding ~ user_email:", user_email);

    const user = await Users.findOne({ where: { email: user_email } });
    console.log("🚀 ~ userOnBoarding ~ user:", user);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    } else {
      const avatarimg = require("../../assets/images/avatars/avatar11.png");
      const imagePath = avatar_img; // This holds the full path to the image
      console.log("🚀 ~ userOnBoarding ~ imagePath:", imagePath);

      user.domain = url;
      user.profile_img = imagePath;
      await user.save();

      const user_business = await UserBusiness.create({
        user_id: user.id,
        niche: businessNiche,
        target_audience: targetAudience,
        email: businessEmail,
        phone: businessPhone,
        description: description,
      });

      if (token) {
        const tokenData = JSON.parse(token);
        console.log("🚀 ~ userOnBoarding ~ token:", tokenData);
        tokenData.map(async (item) => {
          if (item.isActive == true) {
            const user_integration = await Integration.create({
              user_id: user.id,
              provider: item.name,
              token: item.token,
            });
          }
        });
      }

      var user_email_split = user.email.split("@");

      const user_Bot_creator = await Bot_creator.create({
        user_id: user.id,
        voice_id: voice,
        name: user_email_split[0],
        avatar_img: imagePath,
      });

      const user_voice = await UserVoice.create({
        user_id: user.id,
        gender: gender,
        tone: tone,
        voice_id: voice,
        language: language_value,
      });

      // Handle file uploads if there are files
      // Create user-specific upload directory
      const userDir = path.join(process.cwd(), "uploads", String(user.id));
      console.log("🚀 ~ userOnBoarding ~ userDir:", userDir);
      if (!fs.existsSync(userDir)) {
        fs.mkdirSync(userDir, { recursive: true });
      }

      // Process each file one by one
      for (const file of companyFiles) {
        const newFilePath = path.join(userDir, file.originalFilename);
        console.log("🚀 ~ filePromises ~ newFilePath:", newFilePath);

        // Move the file to the new path
        await fs.promises.rename(file.filepath, newFilePath);

        // Create a database entry for the file
        await UserFiles.create({
          user_id: user.id,
          filename: file.originalFilename,
          filetype: file.mimetype,
          filepath: newFilePath, // Store the new file path
        });
      }

      res.status(200).json({ message: "User onboarding successful!" });
    }
  } catch (error) {
    console.error("ONboarding error:", error);
    res.status(500).json({ error: error });
  }
};

// check integration of user by id
const checkIntegrationById = async (req, res) => {
  try {
    let { user_id, provider, access_token } = req.body;
    console.log("req.body--", req.body);
    // condition if there is only user_id available so find data according to user_id
    // if no id found in request body
    if (user_id && provider == null && access_token == null) {
      // way to check datain database
      let isScoialFound = await Integration.findAll({
        where: { user_id: user_id },
      });
      // if isScoialFound foudn
      if (isScoialFound) {
        return res.status(200).json({ status: "success", data: isScoialFound });
      } else {
        return res
          .status(404)
          .json({ status: "failed", message: "no social integration found" });
      }
    }

    // condition if user_id not null and proivder not and access_token not null
    if (user_id != null && provider != null && access_token != null) {
      let isScoialFound = await Integration.findAll({
        where: { user_id: user_id, provider: provider },
      });
      if (isScoialFound) {
        const newIntegration = await Integration.create({
          user_id: user_id,
          provider: provider,
          token: access_token,
        });
        await newIntegration.save();
        return res
          .status(200)
          .json({ status: "success", data: `new ${provider} added` });
      } else {
        return res
          .status(404)
          .json({ status: "failed", message: "no social integration found" });
      }
    }

    return res.status(404).json({
      status: "failed",
      message: "required user_id, proivder, access_token",
    });
  } catch (err) {
    console.log("err is--", err);
    return res.status(500).json({ status: "failed", error: err });
  }
};

module.exports = {
  checkIntegrationById,
  createUser,
  loginUser,
  getUserById,
  getUserByEmail,
  userVerificationCode,
  userVerificationCodeResend,
  userVerify,
  userOnBoarding,
};
