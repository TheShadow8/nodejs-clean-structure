const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      min: [4, 'Too short, min is 4 characters'],
      max: [32, 'Too long, max is 32 characters'],
      lowercase: true
    },

    password: {
      type: String,
      min: [6, 'Password is too short, min is 6 characters']
    }
  },
  {
    timestamps: true
  }
);

UserSchema.methods.hasSamePassword = function(requestedPassword) {
  return bcrypt.compareSync(requestedPassword, this.password);
};

UserSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      next();
    } catch (err) {
      console.log(err);
      next();
    }
  }
});

module.exports = mongoose.model('User', UserSchema);
