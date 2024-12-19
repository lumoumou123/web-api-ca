import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true},
  password: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        // 使用正则表达式验证密码复杂度
        return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(value);
      },
      message: "Password must be at least 8 characters long, include a letter, a number, and a special character."
    }
  },
  favourites: { type: [Number], default: [] },// 用户收藏的电影列表 (存储 TMDB 的电影 ID)
  reviews: {
    type: [
      {
        movieId: { type: Number, required: true }, // TMDB 的电影 ID
        review: { type: String, required: true },  // 用户的评论内容
        rating: { type: Number, min: 0, max: 10, required: true }, // 用户评分
      },
    ],
    default: [], // 默认初始化为空数组
  }
});

UserSchema.methods.comparePassword = async function (passw) { 
  return await bcrypt.compare(passw, this.password); 
}

UserSchema.statics.findByUserName = function (username) {
  return this.findOne({ username: username });
};

UserSchema.pre('save', async function(next) {
  const saltRounds = 10; // You can adjust the number of salt rounds
  //const user = this;
  if (this.isModified('password') || this.isNew) {
    try {
      const hash = await bcrypt.hash(this.password, saltRounds);
      this.password = hash;
      next();
  } catch (error) {
     next(error);
  }

  } else {
      next();
  }
});

export default mongoose.model('User', UserSchema);